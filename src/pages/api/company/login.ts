import { Prisma } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { prisma } from "../../../utils/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { cpnj, password } = req.body as Prisma.CompanyWhereInput;
    const company = await prisma.company.findFirstOrThrow({
      where: {
        cpnj,
      },
    });

    if (company && password !== company.password) throw new Error();

    const { password: companyPassword, ...rest } = company as any;
    const token = jwt.sign({ company: rest }, "superkey", {
      expiresIn: 60 * 60 * 24 * 30, // 30 days
    });

    return res.status(200).json({
      company: rest,
      token,
    });
  } catch (e) {
    res.status(404).json({
      msg: "Cpnj/password invalidos",
    });
  }
}
