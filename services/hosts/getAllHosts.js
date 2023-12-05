import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../handlers/notFoundHandler.js";

const getAllHosts = async (name) => {
  const prisma = new PrismaClient();

  try {
    const hosts = await prisma.host.findMany({
      where: {
        name,
      },
      select: {
        id: true,
        username: true,
        name: true,
        email: true,
        phoneNumber: true,
        profilePicture: true,
        aboutMe: true,
      },
    });
    if (hosts.length === 0) {
      return {
        status: 404,
        message: "Unknown host, check your spelling",
      };
    }
    return hosts;
  } catch (error) {
    console.log("error fetching all hosts", error);
    throw new NotFoundError(error);
  }
};

export default getAllHosts;
