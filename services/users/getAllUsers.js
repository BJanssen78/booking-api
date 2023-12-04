import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../handlers/notFoundHandler.js";

const getAllUsers = async () => {
  const prisma = new PrismaClient();

  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        name: true,
        email: true,
        phoneNumber: true,
        profilePicture: true,
      },
    });

    return users;
  } catch (error) {
    console.log("error fetching all users", error);
    throw new NotFoundError(error);
  }
};

export default getAllUsers;
