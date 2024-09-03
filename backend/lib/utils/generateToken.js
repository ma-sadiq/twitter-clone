import jwt from "jsonwebtoken";

export const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });

  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000, // autodelete after 15 days in milliseconds
    httpOnly: true, // prevent from XSS (cross site scripting) attacks
    sameSite: "strict", // prevent from CSRF (cross site Request Forgery) attacks
    secure: process.env.NODE_ENV !== "development", // https in production
  });
};
