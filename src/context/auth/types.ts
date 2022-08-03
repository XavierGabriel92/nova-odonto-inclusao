import { ReactNode } from "react";
import { Prisma } from "@prisma/client";

export type AuthProviderProps = {
  children: ReactNode;
};

export type AuthContextProps = {
  company?: Prisma.CompanyScalarFieldEnum;
  isAuthenticated: boolean;
  loading: boolean;
  singnIn: (data: AuthBodyRequest) => void;
};

export type AuthBodyRequest = {
  cnpj: string;
  password: string;
};
