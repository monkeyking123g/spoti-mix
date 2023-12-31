import { AccessTokenResponse } from "./types";

const TOKEN_KEY = "TOKEN_KEY";
const EXPIRY_KEY = "EXPIRY_KEY";
const ONE_HOUR_IN_MS = 3600 * 1000;

const saveTokenToLocalStorage = (token: string): void => {
  const now = new Date();
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(EXPIRY_KEY, now.getTime().toString());
};

const getTokenFromLocalStorage = (): string | null => {
  const token = localStorage.getItem(TOKEN_KEY);
  const expiry = localStorage.getItem(EXPIRY_KEY);

  if (!token || !expiry) return null;

  const now = new Date().getTime();
  const savedExpiry = parseInt(expiry, 10);

  if (now - savedExpiry > ONE_HOUR_IN_MS) {
    return null;
  }

  return token;
};

export const getToken = async (): Promise<string | null> => {
  let token = getTokenFromLocalStorage();

  if (token) return token;

  try {
    const result = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " +
          btoa(
            `${process.env.NEXT_PUBLIC_CLIENT_ID}:${process.env.NEXT_PUBLIC_CLIENT_SECRET}`
          ),
      },
      body: "grant_type=client_credentials",
    });

    if (!result.ok) {
      throw new Error("Failed to fetch token");
    }

    const data: AccessTokenResponse = await result.json();
    saveTokenToLocalStorage(data.access_token);
    return data.access_token;
  } catch (error) {
    console.error("Error fetching token:", error);
    return null;
  }
};
