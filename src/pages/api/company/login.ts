import { Prisma } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../utils/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    console.log(req.body);
    const { cpnj, password } = req.body as Prisma.CompanyWhereInput;
    const company = await prisma.company.findFirstOrThrow({
      where: {
        cpnj,
      },
    });

    if (company && password !== company.password) throw new Error();

    const { password: companyPassword, ...rest } = company as any;

    return res.status(200).json({
      data: rest,
    });
  } catch (e) {
    res.status(404).json({
      msg: "Cpnj/password invalidos",
    });
  }
}
