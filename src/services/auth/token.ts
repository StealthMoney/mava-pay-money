import jwt from "jsonwebtoken";
import * as jose from "jose";
import crypto from "crypto";
import { UnauthorizedError } from "./error";
import { NextRequest } from "next/server";
import { JwtPayload, ValidateAuthHeaderResult } from "@/types/auth";
import { JWT_SECRET } from "@/config/process";
import { API_KEY_LENGTH, PARTNER_QUERY } from "@/config/default";
import { PartnerRepository } from "../prisma/repository/partner";

const SECRET = process.env.JWT_SECRET ?? "";

export async function createJwtToken(payload: JwtPayload) {
  const secret = new TextEncoder().encode(SECRET);
  const token = await new jose.SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .sign(secret);
  return token;
}

export const verifyToken = async (token: string) => {
  console.log(SECRET);
  const secret = new TextEncoder().encode(SECRET);
  try {
    console.log(token);
    const { payload, protectedHeader } = await jose.jwtVerify(token, secret);
    console.log({ payload, protectedHeader });
    if (typeof payload === "string" || !payload) {
      return new UnauthorizedError("Invalid token payload");
    }
    return payload as JwtPayload;
  } catch (error) {
    console.log({ error });
    return new UnauthorizedError("Unable to verify token");
  }
};

export const validateAuthHeader = async (
  request: NextRequest
): Promise<ValidateAuthHeaderResult> => {
  const searchParams = request.nextUrl.searchParams;
  const partner = searchParams.get(PARTNER_QUERY);
  const prefix = "Bearer ";
  const auth_header = request.headers.get("Authorization") ?? "";

  if (!partner) {
    return {
      isValid: true,
      isPartner: false,
    };
  }

  if (!auth_header) {
    return new UnauthorizedError("No auth headers present");
  }

  if (!auth_header.startsWith(prefix)) {
    return new UnauthorizedError("Token is not a bearer token");
  }

  const [_, token] = auth_header.split(" ");
  const payload = await verifyToken(token);
  if (payload instanceof Error) {
    return payload;
  }
  if (payload.name.toLowerCase() !== partner.toLowerCase()) {
    return new UnauthorizedError("Invalid Partner");
  }

  return {
    isValid: true,
    isPartner: true,
    partner: payload.name,
  };
};
