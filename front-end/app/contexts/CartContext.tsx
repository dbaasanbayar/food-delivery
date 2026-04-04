"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import { DishType } from "@/lib/type";

// Cart-ийн нэг хоолны төрөл
type CartItem = {
  food: DishType;
  quantity: number;
};

// Context-ийн төрөл
type CartContextType = {
  cartItems: CartItem[];
  addToCart: (food: DishType) => void;
  removeFromCart: (foodId: string) => void;
  increaseQuantity: (foodId: string) => void;
  decreaseQuantity: (foodId: string) => void;
  totalPrice: number;
  totalItems: number;
  clearCart: () => void;
  deliveryAddress: string;           // ✅ нэмэх
  setDeliveryAddress: (address: string) => void; // ✅ нэмэх
};

const CartContext = createContext<CartContextType>({} as CartContextType);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [deliveryAddress, setDeliveryAddress] = useState("");
  // ✅ Хоол нэмэх
  const addToCart = (food: DishType) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.food._id === food._id);
      if (existing) {
        // Байгаа бол тоог нэмэх
        return prev.map((item) =>
          item.food._id === food._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      // Байхгүй бол шинээр нэмэх
      return [...prev, { food, quantity: 1 }];
    });
  };

  // ✅ Хоол хасах
  const removeFromCart = (foodId: string) => {
    setCartItems((prev) => prev.filter((item) => item.food._id !== foodId));
  };

  // ✅ Тоо нэмэх
  const increaseQuantity = (foodId: string) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.food._id === foodId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  // ✅ Тоо хасах
  const decreaseQuantity = (foodId: string) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.food._id === foodId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  // ✅ Нийт үнэ
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.food.price * item.quantity,
    0
  );

  // ✅ Нийт тоо
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // ✅ Cart цэвэрлэх
  const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider
  value={{
    cartItems,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    totalPrice,
    totalItems,
    clearCart,
    deliveryAddress,        
    setDeliveryAddress,   
  }}
>
  {children}
</CartContext.Provider>
  );
};

// ✅ Hook — ашиглахад хялбар болгоно
export const useCart = () => useContext(CartContext);