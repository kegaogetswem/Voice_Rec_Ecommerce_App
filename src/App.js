import { useState, useEffect } from "react";
import alanBtn from "@alan-ai/alan-sdk-web";

function App() {
  const [cart, setCart] = useState([]);
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    // console.log("Mounts successfully");
    alanBtn({
      key: "63c6622e0c459f05f4af751d85f0e7e12e956eca572e1d8b807a3e2338fdd0dc/stage",
      onCommand: (commandData) => {
        //console.log(commandData);
        if (commandData.command === "getMenu") {
          setMenuItems(commandData.data);
        } else if (commandData.command === "addToCart") {
          addToCart(commandData.data);
        }
      },
    });
  }, []);

  const addToCart = (menuItem) => {
    setCart((oldCart) => {
      return [...oldCart, menuItem];
    });
  };

  return (
    <div className="App">
      {menuItems.map((menuItem) => (
        <li key={menuItem.name}>
          {menuItem.name} - R{menuItem.price} - {menuItem.category}
          {/* <button onClick={() => addToCart(menuItem)}>Add to cart</button> */}
        </li>
      ))}
      <h2>Cart</h2>
      {cart.map((cartItem) => (
        <li key={cartItem.name}>
          {cartItem.name} - R{cartItem.price} - {cartItem.category}
        </li>
      ))}
    </div>
  );
}

export default App;
