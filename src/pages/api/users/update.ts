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

  const requestUser = req.body;

  delete requestUser.createdAt;
  delete requestUser.updatedAt;

  const user = await prisma.user.update({
    where: {
      id: requestUser.id,
    },
    data: {
      ...requestUser,
      companyId: company.id,
      parentesco: requestUser.parentesco
        ? Number(requestUser.parentesco)
        : null,
      dataVigencia:
        requestUser.dataVigencia && new Date(requestUser.dataVigencia),
      dataCancelamento:
        requestUser.dataCancelamento && new Date(requestUser.dataCancelamento),
      dataObito: requestUser.dataObito && new Date(requestUser.dataObito),
      dataAposentadoria:
        requestUser.dataAposentadoria &&
        new Date(requestUser.dataAposentadoria),
      nascimento: requestUser.nascimento && new Date(requestUser.nascimento),
      rgExpedicao: requestUser.rgExpedicao && new Date(requestUser.rgExpedicao),
      dataAdimissao:
        requestUser.dataAdimissao && new Date(requestUser.dataAdimissao),
      status: "SA",
    },
  });

  delete user.updatedAt;
  delete user.createdAt;
  delete user.id;

  await prisma.movimentacaoUser.create({
    data: {
      ...user,
      movimento: 3,
      companyId: company.id,
      userId: requestUser.id,
    },
  });

  return res.status(200).json({
    msg: "User updated",
  });
}
