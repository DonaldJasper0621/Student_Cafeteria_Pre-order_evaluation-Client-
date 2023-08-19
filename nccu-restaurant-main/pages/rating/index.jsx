import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import RatingCardList from "../../components/RatingCardList";
import { FcLike } from "react-icons/fc";
import { HiXCircle } from "react-icons/hi";
import axios from "axios";
import { prisma } from "../../lib/prisma";
import { useRouter } from "next/router";

const Rating = ({ dishes }) => {
  const route = useRouter();
  const [message, setMessage] = useState("");
  const [removeId, setRemoveId] = useState(0);
  const [newDishes, setNewDishes] = useState(dishes);

  function removeItem(id) {
    console.log("remove", id);
    setNewDishes(newDishes.filter((dish) => dish.id !== id));
    setRemoveId((prev) => prev + 1);
  }
  const handleRating = async (rating) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post("/api/rating", {
        rating: rating,
        Dish_id: removeId,
        token,
      });
    } catch (err) {
      console.log(err);
      alert("Please login first");
      route.push("/");
    }
  };
  useEffect(() => {
    console.log("newDishes", newDishes);
  }, [newDishes]);

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-col justify-center items-center h-full p-6 space-y-4 mt-12">
        <div className="flex flex-col items-center justify-center h-full">
          {newDishes.length > 0 && (
            <h2 className="text-4xl font-bold w-full text-center">{message}</h2>
          )}
          <div className="stack mt-10">
            <RatingCardList
              dishes={newDishes}
              removeItem={removeItem}
              setMessage={setMessage}
              handleRating={handleRating}
            />
            {newDishes.length === 0 && (
              <div className="w-full text-center">Thanks for your feedback</div>
            )}
          </div>

          {newDishes.length > 0 && (
            <div className="flex space-x-20 mt-10">
              <HiXCircle
                className="flex-1 w-20 h-20 cursor-pointer hover:scale-110"
                onClick={() => {
                  handleRating(0);
                  setMessage("Dislike");
                  removeItem(removeId);
                }}
              />
              <FcLike
                className="flex-1 w-20 h-20 cursor-pointer hover:scale-110"
                onClick={() => {
                  handleRating(1);
                  setMessage("Like");
                  removeItem(removeId);
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Rating;

export async function getServerSideProps() {
  // filter out the dishes that have been rated by the user
  const dishes = await prisma.dish.findMany();

  return {
    props: {
      dishes,
    },
  };
}
