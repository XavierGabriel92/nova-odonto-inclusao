import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../utils/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { authorization } = req.headers;
  if (!authorization) throw Error("Cant find token");

  const requestUser = req.body;

  delete requestUser.createdAt;

  await prisma.user.update({
    where: {
      id: requestUser.id,
    },
    data: {
      updatedAt: new Date().toISOString(),
      status: "SA",
    },
  });

  return res.status(200).json({
    msg: "User deleted",
  });
}
