import React, { createContext, useContext, useState, type ReactNode } from 'react';
import type { Artwork } from '../types';

export interface CartItem extends Artwork {
    quantity: number;
}

interface CartContextType {
    cartItems: CartItem[];
    addToCart: (item: Artwork) => void;
    removeFromCart: (itemId: number) => void;
    clearCart: () => void;
    cartCount: number;
    cartTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

interface CartProviderProps {
    children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    const addToCart = (item: Artwork) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(i => i.id === item.id);
            if (existingItem) {
                return prevItems.map(i =>
                    i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
                );
            }
            return [...prevItems, { ...item, quantity: 1 }];
        });
    };

    const removeFromCart = (itemId: number) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

    const parsePrice = (priceStr: string): number => {
        // Removes '$' and ',' then parses float
        return parseFloat(priceStr.replace(/[^0-9.]/g, '')) || 0;
    };

    const cartTotal = cartItems.reduce((total, item) => {
        return total + (parsePrice(item.price) * item.quantity);
    }, 0);

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, cartCount, cartTotal }}>
            {children}
        </CartContext.Provider>
    );
};
