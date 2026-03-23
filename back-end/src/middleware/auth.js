import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.body.token || req.headers["authorization"];
  if (!token) {
    res.status(403).send({ message: "Token is required" });
  }
  const BearerToken = token.split(" ")[1];
  try {
    const decoded = jwt.verify(BearerToken, "secret-key");
    req.user = decoded;
    console.log(decoded);
    next();
  } catch (error) {
    console.error(error);
    res.status(401).send({message: "Invalid token", error });
  }
};

export const autthenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer")) {
    }
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, "secret-key"); // Таны ашиглаж буй secret-key
    req.user = decoded;
    next(); 
  } catch 
    (error) {
      res.status(401).json({message: "Хүчингүй токен байна"})
    }
  }


export const authorization = (req, res, next) => {
  if (req.user && req.user.role === " ADMIN") {
    next();
  } else {
    res.status(403).json({ message: "Танд энэ үйлдлийг хийх АДМИН эрх байхгүй байна"})
  }
}
