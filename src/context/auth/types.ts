import { ReactNode } from "react";
import { Company } from "@prisma/client";

export type AuthProviderProps = {
  children: ReactNode;
};

export type AuthContextProps = {
  company?: Company;
  isAuthenticated: boolean;
  loading: boolean;
  singnIn: (data: AuthBodyRequest) => void;
  singOut: () => void;
};

export type AuthBodyRequest = {
  cpnj: string;
  password: string;
};
