import { createContext, useContext, useState } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { Prisma } from "@prisma/client";
import { AuthProviderProps, AuthContextProps, AuthBodyRequest } from "./types";
import { useRouter } from "next/router";

export const AuthContext = createContext<AuthContextProps | null>(null);

export function AuthProvider({ children }: AuthProviderProps) {
  const toast = useToast();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [company, setCompany] = useState<Prisma.CompanyScalarFieldEnum>();

  // adicionar token no retorno da request
  // useeffect para consumir rota passando o token e retornando dados do usuario
  async function singnIn(data: AuthBodyRequest) {
    setLoading(true);
    axios
      .post("/api/company/login", data)
      .then((res) => {
        setCompany(res.data);
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

  const value = {
    company,
    isAuthenticated: !!company,
    loading,
    singnIn,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context == null) throw new Error("AuthContext need a provider");

  return context;
};
