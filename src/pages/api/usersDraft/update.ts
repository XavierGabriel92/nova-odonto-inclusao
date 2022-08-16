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
}
