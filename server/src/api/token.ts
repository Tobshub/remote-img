import jwt from "jsonwebtoken";
import Log from "../config/logger";
import { Err, Ok } from "../helpers/result";

const jwtSecret = process.env.JWT_SECRET;

const appToken = {
  generate: (seed: string) => {
    try {
      if (!jwtSecret) throw new Error("JWT secret missing");
      const payload = { data: seed, iat: Date.now() / 1000 };
      const token = jwt.sign(payload, jwtSecret, { expiresIn: "30 days" });
      return Ok(token);
    } catch (err) {
      Log.error(err, "Failed to generate token");
      return Err("Failed to generate token");
    }
  },
  validate: (token: string) => {
    try {
      if (!jwtSecret) throw new Error("JWT secret missing");
      const isValid = jwt.verify(token, jwtSecret) as { data: string };
      return Ok(isValid.data);
    } catch (err) {
      return Err("Token validation failed");
    }
  },
};

export default appToken;
