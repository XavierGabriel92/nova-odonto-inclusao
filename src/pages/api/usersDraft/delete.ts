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

  const requestUser = req.body;

  await prisma.userDraft.delete({
    where: {
      id: requestUser.id,
    },
  });

  return res.status(200).json({
    msg: "User deleted",
  });
}
