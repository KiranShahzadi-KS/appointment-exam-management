import jwt from "jsonwebtoken";

const protect = (req, res, next) => {
  let token = req.header("Authorization");
  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied." });
  }

  try {
    token = token.split(" ")[1]; // Remove "Bearer" from the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded; // Attach user information to the request
    next();
  } catch (error) {
    res.status(401).json({ message: "Token is not valid." });
  }
};

export default protect;
