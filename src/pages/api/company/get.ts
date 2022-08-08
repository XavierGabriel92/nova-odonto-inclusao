import { Prisma } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { prisma } from "../../../utils/prisma";
import { decode } from "querystring";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { authorization } = req.headers;
    var decoded = jwt.verify(authorization!.replace("Bearer ", ""), "superkey");

    const company = (decoded as any).company;

    return res.status(200).json({
      company,
    });
  } catch (e) {
    res.status(404).json({
      msg: "Cpnj/password invalidos",
    });
  }
}
