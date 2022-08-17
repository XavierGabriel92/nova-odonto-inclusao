import { Prisma } from "@prisma/client";
import { request } from "http";
import { NextApiRequest, NextApiResponse } from "next";
import { decodeToken } from "../../../utils/decodeToken";
import { prisma } from "../../../utils/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { authorization } = req.headers;
    if (!authorization) throw Error("Cant find token");
    var company = decodeToken({ authorization });

    const requestUser = req.body;

    const checkUser = await prisma.userDraft.findFirst({
      where: {
        cpf: requestUser.cpf,
        companyId: company.id,
      },
    });

    if (checkUser)
      throw new Error("Usuario ja existe", {
        cause: 400,
      });

    const user = await prisma.userDraft.update({
      where: {
        id: requestUser.id,
      },
      data: {
        ...requestUser,
        updatedAt: new Date().toISOString(),
        status: "I",
      },
    });

    return res.status(200).json({
      msg: "User updated",
      user,
    });
  } catch (e: any) {
    return res.status(400).json({
      message: e.message || "Falha ao atualizar usuario",
    });
  }
}
