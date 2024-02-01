import { config } from "dotenv";
import { ConfigError } from "./errors";

config();

export const MAVAPAY_URL =
  process.env.MAVAPAY_URL ?? process.env.NEXT_PUBLIC_MAVAPAY_URL ?? "";
export const MAVAPAY_API_KEY =
  process.env.MAVAPAY_API_KEY ?? process.env.NEXT_PUBLIC_MAVAPAY_API_KEY ?? "";
export const MAVAPAY_MONEY_DOMAIN =
  process.env.MAVAPAY_MONEY_DOMAIN ?? "";

// TODO: fix regression in managing multiple domains by removing suffix in address
export const API_DOMAIN =
  process.env.API_DOMAIN ?? "";
export const isProd = process.env.NODE_ENV === "production";
export const isDev = process.env.NODE_ENV === "development";

export const JWT_SECRET = 
  process.env.JWT_SECRET ?? ""
export const PRIVATE_KEY = 
  process.env.PRIVATE_KEY ?? ""
export const PUBLIC_KEY = 
  process.env.PUBLIC_KEY ?? ""

if (!MAVAPAY_URL) {
  throw new ConfigError("MAVAPAY_URL not found");
}
if (!MAVAPAY_API_KEY) {
  throw new ConfigError("MAVAPAY_API_KEY not found");
}
if (!MAVAPAY_MONEY_DOMAIN) {
  throw new ConfigError("MAVAPAY_MONEY_DOMAIN not found");
}
if (!API_DOMAIN) {
  throw new ConfigError("API_DOMAIN not found");
}
if (!JWT_SECRET) {
  throw new ConfigError("JWT_SECRET not found");
}
if (!PRIVATE_KEY) {
  throw new ConfigError("PRIVATE_KEY not found");
}
