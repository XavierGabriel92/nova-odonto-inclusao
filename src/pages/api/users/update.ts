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

    const checkUser = await prisma.user.findFirst({
      where: {
        cpf: requestUser.cpf,
        companyId: company.id,
      },
    });

    if (checkUser) throw new Error("Usuario ja existe");

    await prisma.user.update({
      where: {
        id: requestUser.id,
      },
      data: {
        ...requestUser,
        companyId: company.id,
        updatedAt: new Date().toISOString(),
        status: "SA",
      },
    });

    return res.status(200).json({
      msg: "User updated",
    });
  } catch (e: any) {
    return res.status(400).json({
      message: e.message || "Falha ao atualizar usuario",
    });
  }
}
