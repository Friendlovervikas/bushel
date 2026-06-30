import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {

  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("bushelCart");

    return savedCart ? JSON.parse(savedCart) : [];
  });

  const getId = (item) => item._id || item.id;

  useEffect(() => {
    localStorage.setItem(
      "bushelCart",
      JSON.stringify(cart)
    );
  }, [cart]);

  const addToCart = (product) => {
    setCart((prev) => {

      const exists = prev.find(
        (item) => getId(item) === getId(product)
      );

      if (exists) {

        return prev.map((item) =>
          getId(item) === getId(product)
            ? {
                ...item,
                qty: item.qty + 1,
              }
            : item
        );

      }

      return [
        ...prev,
        {
          ...product,
          qty: 1,
        },
      ];
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) =>
      prev.filter(
        (item) => getId(item) !== id
      )
    );
  };

  const increaseQty = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        getId(item) === id
          ? {
              ...item,
              qty: item.qty + 1,
            }
          : item
      )
    );
  };

  const decreaseQty = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        getId(item) === id
          ? {
              ...item,
              qty: Math.max(
                1,
                item.qty - 1
              ),
            }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const total = cart.reduce(
    (sum, item) =>
      sum + item.price * item.qty,
    0
  );

  const totalItems = cart.reduce(
    (sum, item) =>
      sum + item.qty,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQty,
        decreaseQty,
        clearCart,
        total,
        totalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () =>
  useContext(CartContext);