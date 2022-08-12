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

  let draftUsers = await prisma.userDraft.findMany({
    where: {
      companyId: company.id,
    },
  });

  draftUsers = draftUsers.map((user) => ({
    ...user,
    companyId: company.id,
    origemCarencia: Number(user.origemCarencia),
    parentesco: user.parentesco ? Number(user.parentesco) : null,
    dataVigencia: user.dataVigencia && new Date(user.dataVigencia),
    dataCancelamento: user.dataCancelamento && new Date(user.dataCancelamento),
    dataObito: user.dataObito && new Date(user.dataObito),
    dataAposentadoria:
      user.dataAposentadoria && new Date(user.dataAposentadoria),
    nascimento: user.nascimento && new Date(user.nascimento),
    rgExpedicao: user.rgExpedicao && new Date(user.rgExpedicao),
    dataAdimissao: user.dataAdimissao && new Date(user.dataAdimissao),
    plano: Number(user.plano),
    status: "I",
  }));

  draftUsers.forEach(async (user) => {
    const { updatedAt, createdAt, id, ...rest } = user;
    const newUser = await prisma.user.create({
      data: {
        ...rest,
      },
    });

    const logUser = await prisma.movimentacaoUser.create({
      data: {
        ...rest,
        movimento: 1,
        userId: newUser.id,
      },
    });
  });

  await prisma.userDraft.deleteMany({
    where: {
      companyId: company.id,
    },
  });

  return res.status(200).json({
    msg: "Users created",
  });
}
