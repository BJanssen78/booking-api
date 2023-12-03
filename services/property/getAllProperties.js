import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../handlers/notFoundHandler.js";

const getAllProperties = async () => {
  const prisma = new PrismaClient();

  try {
    const property = await prisma.property.findMany();
    return property;
  } catch (error) {
    console.log("error fetching all properties", error);
    throw new NotFoundError(error);
  }
};

export default getAllProperties;
