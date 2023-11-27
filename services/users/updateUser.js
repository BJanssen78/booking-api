import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../handlers/notFoundHandler.js";

const updateUserById = async (
  id,
  username,
  password,
  name,
  email,
  phoneNumber,
  pictureUrl
) => {
  const prisma = new PrismaClient();
  const updateUser = await prisma.user.updateMany({
    where: {
      id,
    },
    data: {
      username,
      password,
      name,
      email,
      phoneNumber,
      pictureUrl,
    },
  });
  if (!updateUser || updateUser.count === 0) {
    throw new NotFoundError("user", id);
  }
  return { message: `user with id ${id} is updated` };
};
export default updateUserById;
