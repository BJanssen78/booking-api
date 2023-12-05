import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../handlers/notFoundHandler.js";

const getAllUsers = async (username, email) => {
  const prisma = new PrismaClient();

  try {
    const users = await prisma.user.findMany({
      where: {
        username,
        email,
      },
      select: {
        id: true,
        username: true,
        name: true,
        email: true,
        phoneNumber: true,
        profilePicture: true,
      },
    });

    if (users.length === 0) {
      return {
        status: 404,
        message: "No match found with these parameter(s)",
      };
    }

    return users;
  } catch (error) {
    console.log("Error fetching all users", error);
    throw new NotFoundError(`Error fetching all users: ${error.message}`);
  }
};

export default getAllUsers;
