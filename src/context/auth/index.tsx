import { createContext, useContext, useEffect, useState } from "react";
import { setCookie, parseCookies, destroyCookie } from "nookies";
import { useRouter } from "next/router";
import { useToast } from "@chakra-ui/react";
import { Company } from "@prisma/client";

import { AuthProviderProps, AuthContextProps, AuthBodyRequest } from "./types";
import { api } from "../../utils/axios";

export const AuthContext = createContext<AuthContextProps | null>(null);

export function AuthProvider({ children }: AuthProviderProps) {
  const toast = useToast();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [company, setCompany] = useState<Company>();

  // useeffect para consumir rota passando o token e retornando dados do usuario
  async function singnIn(data: AuthBodyRequest) {
    setLoading(true);
    api
      .post("/api/company/login", data)
      .then(({ data }: any) => {
        const { company, token } = data;
        setCompany(company);
        setCookie(undefined, "nextauth.token", token, {
          maxAge: 60 * 60 * 24 * 30, // 30 days
        });
        router.push("/users");
      })
      .catch(() =>
        toast({
          title: "Falha ao realizar login",
          description: "CNPJ/Senha incorreto",
          status: "error",
          duration: 3000,
          isClosable: true,
        })
      )
      .finally(() => setLoading(false));
  }

  const singOut = () => {
    destroyCookie({}, "nextauth.token");
    router.push("/");
  };

  useEffect(() => {
    const { "nextauth.token": token } = parseCookies();

    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      api.get("/api/company/get").then(({ data }: any) => {
        const { company } = data;
        setCompany(company);
      });
    }
  }, []);

  const value = {
    company,
    isAuthenticated: !!company,
    loading,
    singnIn,
    singOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context == null) throw new Error("AuthContext need a provider");

  return context;
};
