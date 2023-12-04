import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../handlers/notFoundHandler.js";

const getAllHosts = async () => {
  const prisma = new PrismaClient();

  try {
    const hosts = await prisma.host.findMany({
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
    return hosts;
  } catch (error) {
    console.log("error fetching all hosts", error);
    throw new NotFoundError(error);
  }
};

export default getAllHosts;
