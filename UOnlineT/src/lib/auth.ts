import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

interface TokenData {
  userId: string;
  email: string;
  role: "admin" | "user" | "guest";
}

export const getTokenData = async (): Promise<TokenData | null> => {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) return null;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as TokenData;
    return decoded;
  } catch (error) {
    return null;
  }
};
