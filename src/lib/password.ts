import { createHash, timingSafeEqual } from "crypto";

export function hashPassword(password: string): string {
  const hash = createHash("sha512");
  hash.update(password);
  return hash.digest("hex");
}

export function verifyPassword(
  password: string,
  hashedPassword: string,
): boolean {
  const hash = createHash("sha512");
  hash.update(password);
  const passwordHashBuffer = Buffer.from(hash.digest("hex"), "hex");
  const hashedPasswordBuffer = Buffer.from(hashedPassword, "hex");

  return timingSafeEqual(passwordHashBuffer, hashedPasswordBuffer);
}
