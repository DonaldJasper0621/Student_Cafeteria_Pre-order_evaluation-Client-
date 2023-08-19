// filter out the dishes that have been rated by the user
import { prisma } from "../../../lib/prisma";
import jwt from "jsonwebtoken";
export default async function handler(req, res) {
  const { token } = req.body;
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
  // select the dishes that have been rated by the user
  const ratedDishes = await prisma.rating.findMany({
    where: {
      User_studentId: User_studentId,
    },
    select: {
      Dish_id: true,
    },
  });
  // select the dishes that have not been rated by the user
  const unratedDishes = await prisma.dish.findMany({
    where: {
      NOT: {
        id: {
          in: ratedDishes.map((dish) => dish.Dish_id),
        },
      },
    },
  });

  res.json(unratedDishes);
}
