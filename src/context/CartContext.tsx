import { createContext, useContext, useMemo, useState, ReactNode } from "react";

export interface CartLineItem {
  id: string;
  name: string;
  image: string;
  size: string;
  price: number;
  quantity: number;
}

interface CartContextValue {
  items: CartLineItem[];
  addItem: (item: Omit<CartLineItem, "quantity">, quantity?: number) => void;
  removeItem: (id: string, size: string) => void;
  updateQuantity: (id: string, size: string, quantity: number) => void;
  clear: () => void;
  count: number;
  subtotal: number;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartLineItem[]>([]);

  const addItem: CartContextValue["addItem"] = (incoming, quantity = 1) => {
    setItems((prev) => {
      const existingIndex = prev.findIndex(
        (l) => l.id === incoming.id && l.size === incoming.size
      );
      if (existingIndex >= 0) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity,
        };
        return next;
      }
      return [...prev, { ...incoming, quantity }];
    });
  };

  const removeItem: CartContextValue["removeItem"] = (id, size) => {
    setItems((prev) => prev.filter((l) => !(l.id === id && l.size === size)));
  };

  const updateQuantity: CartContextValue["updateQuantity"] = (id, size, quantity) => {
    setItems((prev) =>
      prev
        .map((l) => (l.id === id && l.size === size ? { ...l, quantity } : l))
        .filter((l) => l.quantity > 0)
    );
  };

  const clear = () => setItems([]);

  const { count, subtotal } = useMemo(() => {
    const countCalc = items.reduce((sum, l) => sum + l.quantity, 0);
    const subtotalCalc = items.reduce((sum, l) => sum + l.price * l.quantity, 0);
    return { count: countCalc, subtotal: subtotalCalc };
  }, [items]);

  const value: CartContextValue = {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clear,
    count,
    subtotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}



