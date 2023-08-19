// api route for signing up a user with prisma

import { prisma } from "../../../lib/prisma";
import { checkIfUserExists } from "../../../utils/checkIfUserExists";
export default async function handler(req, res) {
  const { studentId, password, gender, occupation } = req.body;
  console.log(studentId, password, gender, occupation);
  try {
    const userExists = await checkIfUserExists(studentId);
    if (userExists) {
      res.json({ message: "User already exists" });
      return;
    }
    // create user
    const user = await prisma.user.create({
      data: {
        studentId,
        Password: password,
        gender: gender,
        occupation: occupation,
      },
    });

    res.json(user);
  } catch (err) {
    console.log(err);
    res.json({ error: err.message });
  }
}
