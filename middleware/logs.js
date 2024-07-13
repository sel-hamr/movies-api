import fs from "fs/promises";
import path from "path";
import url from "url";
export const logs = async (req, res, next) => {
  const __filename = url.fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  await fs.appendFile("logs/logs-request.txt", `${req.method} ${req.url}\n`);
  next();
};
