import { Router } from "express";
import { PrismaClient } from "@prisma/client"; // Import the Prisma client
import jwt from "jsonwebtoken";

const router = Router();
const prisma = new PrismaClient(); // Create a new Prisma client instance

router.post("/", async (req, res) => {
  const secretKey = process.env.AUTH_SECRET_KEY || "my-secret-key";
  const { username, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { username: username, password: password },
    });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials!" });
    }

    const token = jwt.sign({ userId: user.id }, secretKey);
    res.status(200).json({ message: "Successfully logged in!", token });
  } catch (error) {
    console.error("Database error:", error);
    res
      .status(500)
      .json({
        message: "Status code 500 : Internal server error, while login attempt",
      });
  }
});

export default router;
