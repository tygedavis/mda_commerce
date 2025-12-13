import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { CartProvider, useCart } from '../context/CartContext';
import type { Artwork } from '../types';

// Mock data
const mockItem: Artwork = {
    id: 1,
    title: 'Test Art',
    price: '$100',
    image_url: 'test.jpg',
    description: 'Test Description',
};

const mockItem2: Artwork = {
    id: 2,
    title: 'Test Art 2',
    price: '$200',
    image_url: 'test2.jpg',
    description: 'Test Description 2',
};

describe('CartContext', () => {
    it('provides default values', () => {
        const { result } = renderHook(() => useCart(), {
            wrapper: CartProvider,
        });

        expect(result.current.cartItems).toEqual([]);
        expect(result.current.cartCount).toBe(0);
        expect(result.current.cartTotal).toBe(0);
    });

    it('adds items to cart', () => {
        const { result } = renderHook(() => useCart(), {
            wrapper: CartProvider,
        });

        act(() => {
            result.current.addToCart(mockItem);
        });

        expect(result.current.cartItems).toHaveLength(1);
        expect(result.current.cartItems[0].id).toBe(mockItem.id);
        expect(result.current.cartItems[0].quantity).toBe(1);
        expect(result.current.cartCount).toBe(1);
        expect(result.current.cartTotal).toBe(100);
    });

    it('increments quantity when adding same item', () => {
        const { result } = renderHook(() => useCart(), {
            wrapper: CartProvider,
        });

        act(() => {
            result.current.addToCart(mockItem);
        });
        act(() => {
            result.current.addToCart(mockItem);
        });

        expect(result.current.cartItems).toHaveLength(1);
        expect(result.current.cartItems[0].quantity).toBe(2);
        expect(result.current.cartCount).toBe(2);
        expect(result.current.cartTotal).toBe(200);
    });

    it('adds different items separately', () => {
        const { result } = renderHook(() => useCart(), {
            wrapper: CartProvider,
        });

        act(() => {
            result.current.addToCart(mockItem);
            result.current.addToCart(mockItem2);
        });

        expect(result.current.cartItems).toHaveLength(2);
        expect(result.current.cartCount).toBe(2);
        expect(result.current.cartTotal).toBe(300);
    });

    it('removes item from cart', () => {
        const { result } = renderHook(() => useCart(), {
            wrapper: CartProvider,
        });

        act(() => {
            result.current.addToCart(mockItem);
            result.current.addToCart(mockItem2);
        });

        expect(result.current.cartItems).toHaveLength(2);

        act(() => {
            result.current.removeFromCart(mockItem.id);
        });

        expect(result.current.cartItems).toHaveLength(1);
        expect(result.current.cartItems[0].id).toBe(mockItem2.id);
        expect(result.current.cartTotal).toBe(200);
    });

    it('clears cart', () => {
        const { result } = renderHook(() => useCart(), {
            wrapper: CartProvider,
        });

        act(() => {
            result.current.addToCart(mockItem);
        });

        act(() => {
            result.current.clearCart();
        });

        expect(result.current.cartItems).toEqual([]);
        expect(result.current.cartCount).toBe(0);
        expect(result.current.cartTotal).toBe(0);
    });

    it('handles price parsing correctly', () => {
        const { result } = renderHook(() => useCart(), {
            wrapper: CartProvider,
        });

        const messyPriceItem: Artwork = {
            ...mockItem,
            id: 3,
            price: '$1,234.56',
        };

        act(() => {
            result.current.addToCart(messyPriceItem);
        });

        expect(result.current.cartTotal).toBe(1234.56);
    });
});
