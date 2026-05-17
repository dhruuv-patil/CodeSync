import { requireAuth } from "@clerk/express";
import User from "../models/User.js";

export const protectRoute = [
  requireAuth(),
  async (req, res, next) => {
    try {
      console.log("REQ AUTH:", req.auth());

    const clerkId = req.auth().userId;

    console.log("CLERK ID:", clerkId);

    if (!clerkId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await User.findOne({ clerkId });

    console.log("USER:", user);

    if (!user) {
  console.log("CREATING NEW USER");

  const email =
    req.auth.sessionClaims?.email ||
    req.auth.sessionClaims?.email_address ||
    `${clerkId}@temp.com`;

  const newUser = await User.create({
    clerkId,
    email,
    name: "New User",
    profileImage: "",
  });

  req.user = newUser;

  return next();
}

    req.user = user;
    next();
  } catch (error) {
    console.error("Error in protectRoute: ", error);
    res.status(500).json({ message: "Internal server error" });
  }

  },
];
