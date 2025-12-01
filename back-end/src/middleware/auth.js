import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.body.token || req.headers["authorization"];
  if (!token) {
    res.status(403).send({ message: "Token is required" });
  }
  const BearerToken = token.split("")[1];
  try {
    const decoded = jwt.verify(BearerToken, "secret-key");
    console.log(decoded);
    next();
  } catch (error) {
    console.error(error);
    res.send({ error });
  }
};
