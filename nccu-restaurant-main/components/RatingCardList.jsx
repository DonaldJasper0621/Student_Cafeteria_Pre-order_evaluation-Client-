import { motion } from "framer-motion";

const RatingCard = ({ dish, removeItem, setMessage, handleRating }) => {
  return (
    <>
      <motion.div
        className="card bg-gray-700 shadow-xl active:scale-105 h-[28rem] w-[22rem] lg:w-96"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        whileDrag={{ scale: 1.05 }}
        dragSnapToOrigin={true}
        dragElastic={0.5}
        onDragEnd={(event, info) => {
          console.log(dish.id);
          if (info.offset.x > 200) {
            removeItem(dish.id);
            setMessage("Liked");
            handleRating(1);
          }
          if (info.offset.x < -200) {
            removeItem(dish.id);
            setMessage("Disliked");
            handleRating(0);
          }
        }}
      >
        <figure>
          <img
            src={dish.image}
            alt="dish image"
            className="w-full h-64 object-cover object-center"
            draggable="false"
          />
        </figure>
        <div className="card-body cursor-pointer">
          <h2 className="card-title">
            {dish.name}
            <div className="badge badge-accent badge-outline"> {dish.type}</div>
          </h2>

          <p>內容物: {dish.ingredients}</p>
        </div>
      </motion.div>
    </>
  );
};

const RatingCardList = ({ dishes, removeItem, setMessage, handleRating }) => {
  return (
    <>
      {dishes.map((dish, index) => (
        <RatingCard
          key={index}
          dish={dish}
          removeItem={removeItem}
          setMessage={setMessage}
          handleRating={handleRating}
        />
      ))}
    </>
  );
};

export default RatingCardList;
