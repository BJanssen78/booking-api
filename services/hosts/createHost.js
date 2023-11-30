import { PrismaClient } from "@prisma/client";

const createHost = async (
  username,
  password,
  name,
  email,
  phoneNumber,
  profilePicture,
  aboutMe,
  res // pass the response object as a parameter
) => {
  const prisma = new PrismaClient();

  try {
    const host = await prisma.host.create({
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

    // Send a success response
    res.json(host);
  } catch (error) {
    console.error(error);

    // Send an error response
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default createHost;
