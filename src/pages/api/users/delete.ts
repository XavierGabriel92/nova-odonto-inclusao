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
      status: "SE",
    },
  });

  delete user.updatedAt;
  delete user.createdAt;
  delete user.id;

  await prisma.movimentacaoUser.create({
    data: {
      ...user,
      movimento: 4,
      companyId: company.id,
      userId: requestUser.id,
    },
  });

  return res.status(200).json({
    msg: "User deleted",
  });
}
