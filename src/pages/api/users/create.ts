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

  draftUsers.forEach(async (user) => {
    const { id, ...rest } = user;
    await prisma.user.create({
      data: {
        ...rest,
        companyId: company.id,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        movimento: "1",
        status: "I",
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
