import React from "react";
import axios from "axios";
import { dateStr } from "../utils/getDate";
import { useRouter } from "next/router";
const MenuCard = ({ id, name, ingredients, type, image }) => {
  // send the user token to the server
  const route = useRouter();
  const handleOrder = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post("/api/order", {
        date: dateStr,
        Dish_id: id,
        token,
      });

      if (res.data.message) {
        alert(res.data.message);
        if (res.data.message !== "You already ordered") route.push("/");
      } else {
        alert("Order Success");
      }
    } catch (err) {
      console.log(err);
      alert("err");
    }
  };

  return (
    <>
      <div className="card bg-gray-700 shadow-xl aspect-video" htmlFor={name}>
        <figure>
          <img
            src={image}
            alt="dish image"
            className="w-full h-64 object-cover object-center"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            {name}
            <div className="badge badge-accent badge-outline"> {type}</div>
          </h2>
          <p>內容物: {ingredients}</p>
          <div className="card-actions justify-end">
            <label className="btn btn-primary" htmlFor={name}>
              Select
            </label>
          </div>
        </div>
      </div>
      {/* Put this part before </body> tag */}

      <input type="checkbox" id={name} className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Check Your Order</h3>
          <p className="py-4">{name}</p>
          <div className="modal-action">
            <label htmlFor={name} className="btn" onClick={handleOrder}>
              Confirm
            </label>
            <label htmlFor={name} className="btn">
              Cancel
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default MenuCard;
