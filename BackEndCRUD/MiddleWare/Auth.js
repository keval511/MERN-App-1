import JWT from "jsonwebtoken";

export const ensureAuthenticated = (req, res, next) => {
 
  const authHeader = req.headers["authorization"];
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(403).json({ msg: "Unauthorized: JWT token is required" });
  }

  const token = authHeader.split(" ")[1]; // ✅ Get only the token

  console.log("vyuvuiujijn",token);
  

  try {
    const decodedData = JWT.verify(token, process.env.JWT_SECRET);
    req.auth = decodedData; // You can use req.user instead if preferred
    next();
  } catch (error) {
    return res.status(403).json({ msg: "Unauthorized: Token invalid or expired" });
  }
};
