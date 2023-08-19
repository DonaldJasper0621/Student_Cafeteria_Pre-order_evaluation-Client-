// send the order and the user to the backend
import { prisma } from "../../../lib/prisma";
import jwt from "jsonwebtoken";
export default async function handler(req, res) {
  const { Dish_id, date, token } = req.body;
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
  // check if user has already ordered on that date
  const existingOrder = await prisma.order.findMany({
    where: {
      User_studentId,
      date,
    },
  });
 
  if (existingOrder.length > 0) {
    res.json({ message: "You already ordered" });
    return;
  } else {
    const order = await prisma.order.create({
      data: {
        Dish_id,
        User_studentId,
        date,
      },
    });
    res.json(order);
  }
}
