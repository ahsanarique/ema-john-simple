import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { UserContext } from "../../App";
import { getDatabaseCart, processOrder } from "../../utilities/databaseManager";

const Shipment = () => {
  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = (data) => {
    const savedCart = getDatabaseCart();
    const orderDetails = {
      ...loggedInUser,
      products: savedCart,
      shipment: data,
      orderTime: new Date(),
    };

    fetch("http://localhost:5000/addOrder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderDetails),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          processOrder();
          alert("Your order placed successfully");
        }
      });
  };
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);

  console.log(watch("example"));

  const shipmentStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  };
  const errorColor = {
    color: "red",
  };

  console.log(loggedInUser);

  return (
    <form style={shipmentStyle} onSubmit={handleSubmit(onSubmit)}>
      <div>
        <input
          name="name"
          defaultValue={loggedInUser.name}
          ref={register({ required: true })}
          placeholder="Your Name"
        />
        {errors.exampleRequired && (
          <span style={errorColor}>Name is required</span>
        )}
      </div>

      <div>
        <input
          name="email"
          defaultValue={loggedInUser.email}
          ref={register({ required: true })}
          placeholder="Your email"
        />
        {errors.email && <span style={errorColor}>Email is required</span>}
      </div>

      <div>
        <input
          name="address"
          ref={register({ required: true })}
          placeholder="Your address"
        />
        {errors.address && <span style={errorColor}>Address is required</span>}
      </div>

      <div>
        <input
          name="phone"
          ref={register({ required: true })}
          placeholder="Your phone number"
        />
        {errors.phone && (
          <span style={errorColor}>Phone number is required</span>
        )}
      </div>

      <div>
        <input type="submit" />
      </div>
    </form>
  );
};

export default Shipment;
