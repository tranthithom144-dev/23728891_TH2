import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STUDENT, PRICE_MULTIPLIER } from '../constants/student';
import { Product } from '../services/productApi';

export interface CartItem {
    product: Product;
    quantity: number;
}

export interface CartState {
    cart: CartItem[];
    addToCart: (product: Product) => void;
    removeFromCart: (productId: number) => void;
    changeQuantity: (productId: number, delta: number) => void;
    changeQty: (productId: number, delta: number) => void;
    clearCart: () => void;
    getTotalAmount: () => number;
}

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            cart: [],
            addToCart: (product) =>
                set((state) => {
                    const existing = state.cart.find((i) => i.product.id === product.id);
                    if (existing) {
                        return {
                            cart: state.cart.map((i) =>
                                i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i,
                            ),
                        };
                    }
                    return { cart: [...state.cart, { product, quantity: 1 }] };
                }),
            removeFromCart: (productId) =>
                set((state) => ({
                    cart: state.cart.filter((i) => i.product.id !== productId),
                })),
            changeQuantity: (productId, delta) =>
                set((state) => ({
                    cart: state.cart
                        .map((i) => {
                            if (i.product.id === productId) {
                                const newQty = i.quantity + delta;
                                return newQty > 0 ? { ...i, quantity: newQty } : null;
                            }
                            return i;
                        })
                        .filter(Boolean) as CartItem[],
                })),
            changeQty: (productId, delta) => get().changeQuantity(productId, delta),
            clearCart: () => set({ cart: [] }),
            getTotalAmount: () =>
                get().cart.reduce(
                    (sum, item) => sum + Math.round(item.product.price * PRICE_MULTIPLIER) * item.quantity,
                    0,
                ),
        }),
        {
            name: `ktxgo-cart-${STUDENT.mssv}`,
            storage: createJSONStorage(() => AsyncStorage),
        },
    ),
);