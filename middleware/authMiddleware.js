import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ error: "Token not provided" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Token invalid" });
  }
};

export const authSocketMiddleware = (socket, next) => {
  const token = socket.handshake.auth?.token || socket.handshake.headers.token;

  if (!token) {
    return next(new Error("Token not provided"));
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    socket.user = decoded;
    next();
  } catch (error) {
    return next(new Error("Token invalid"));
  }
}; // Middleware functions are a powerful feature of Express.js that allow you to perform common tasks such as authentication, logging, error handling, and more. By using middleware functions, you can modularize your code, improve code reusability, and keep your application logic organized.
