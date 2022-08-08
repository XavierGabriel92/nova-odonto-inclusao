import { Prisma } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { prisma } from "../../../utils/prisma";
import { decode } from "querystring";
import { decodeToken } from "../../../utils/decodeToken";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { authorization } = req.headers;
    if (authorization) {
      var company = decodeToken({ authorization });

      return res.status(200).json({
        company,
      });
    }
    throw Error("Cant find token");
  } catch (e) {
    res.status(404).json({
      msg: "Cpnj/password invalidos",
    });
  }
}
