import { Prisma } from "@prisma/client";
import { request } from "http";
import { NextApiRequest, NextApiResponse } from "next";
import { decodeToken } from "../../../utils/decodeToken";
import { prisma } from "../../../utils/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { authorization } = req.headers;
  if (!authorization) throw Error("Cant find token");
  var company = decodeToken({ authorization });

  const requestUser = req.body as Omit<
    Prisma.UserCreateInput,
    "company" | "status"
  >;

  const user = await prisma.userDraft.create({
    data: {
      ...requestUser,
      companyId: company.id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: "I",
    },
  });

  return res.status(200).json({
    msg: "User created",
    user,
  });
}
