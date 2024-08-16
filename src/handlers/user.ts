import { prisma } from "../db";
import { comparePassword, createJWT, hashPassword } from "../module/auth";

export const signup = async (req, res) => {
  const { username, password } = req.body;
  const user = await prisma.user.create({
    data: {
      username,
      password: await hashPassword(password),
    },
  });

  const token = createJWT(user);
  res.status(200).json({ message: "Signup successful", token });
};

export const signin = async (req, res) => {
  const { username, password } = req.body;

  const user = await prisma.user.findUnique({
    where: {
      username: username,
    },
  });
  if (!user) {
    res.status(404).json({ message: "Username not found" });
    return;
  }

  const match = await comparePassword(password, user.password);
  if (!match) {
    res.status(404).json({ message: "Wrong password" });
    return;
  }

  const token = createJWT(user);
  res.status(200).json({ message: "Signin successful", token });
};
