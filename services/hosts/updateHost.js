import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../handlers/notFoundHandler.js";

const updateHostById = async (
  id,
  username,
  password,
  name,
  email,
  phoneNumber,
  profilePicture,
  aboutMe
) => {
  const prisma = new PrismaClient();
  const updateHost = await prisma.host.updateMany({
    where: {
      id,
    },
    data: {
      username,
      password,
      name,
      email,
      phoneNumber,
      profilePicture,
      aboutMe,
    },
  });
  if (!updateHost || updateHost.count === 0) {
    throw new NotFoundError("host", id);
  }
  return { message: `host with id ${id} is updated` };
};
export default updateHostById;
