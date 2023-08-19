// send the rating and the user to the backend
import { prisma } from "../../../lib/prisma";
import jwt from "jsonwebtoken";
export default async function handler(req, res) {
  const { Dish_id, token, rating } = req.body;
  if (token === null) {
    res.json({ message: "Not authenticated." });
    return;
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  if (!decoded) {
    res.json({ message: "Not authenticated." });
    return;
  }
  const User_studentId = decoded.studentId;
  // check if the user has already rated the dish and if so, update the rating
  const existingRating = await prisma.rating.findFirst({
    where: {
      Dish_id,
      User_studentId,
    },
  });
  if (existingRating) {
    // update the rating where Dishid and User_studentId
    const updatedRating = await prisma.rating.update({
      where: {
        User_studentId_Dish_id: {
          Dish_id: existingRating.Dish_id,
          User_studentId: existingRating.User_studentId,
        },
      },
      data: {
        rating,
      },
    });
    res.json({ message: "Rating updated." });
    return;
  }

  const order = await prisma.rating.create({
    data: {
      Dish_id,
      User_studentId,
      rating,
    },
  });
  res.json({ message: "Rating created." });
}
