import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const CheckoutPage: React.FC = () => {
    const { cartItems, cartTotal, removeFromCart } = useCart();

    const handleCheckout = () => {
        // Placeholder for Stripe integration
        console.log('Initiating checkout with items:', cartItems);
        alert('Proceeding to checkout... (This is a skeleton for Stripe integration)');
        // In a real app, this would redirect to Stripe Checkout or open a modal
    };

    return (
        <div className="py-20 bg-art-cream/30 min-h-screen">
            <div className="max-w-4xl mx-auto px-6">
                <h1 className="text-4xl font-serif text-center mb-10 tracking-wider">Your Cart</h1>

                {cartItems.length === 0 ? (
                    <div className="text-center py-10">
                        <p className="text-xl text-gray-600 mb-6">Your cart is empty.</p>
                        <Link to="/shop" className="inline-block border border-art-black px-8 py-3 uppercase tracking-widest hover:bg-art-black hover:text-white transition-colors">
                            Continue Shopping
                        </Link>
                    </div>
                ) : (
                    <div className="bg-white p-8 shadow-sm">
                        <ul className="divide-y divide-gray-100">
                            {cartItems.map((item) => (
                                <li key={item.id} className="py-6 flex items-center">
                                    <div className="h-20 w-20 flex-shrink-0 overflow-hidden bg-gray-100 border border-gray-200">
                                        <img
                                            src={item.image_url}
                                            alt={item.title}
                                            className="h-full w-full object-cover object-center"
                                        />
                                    </div>
                                    <div className="ml-4 flex-1 flex flex-col">
                                        <div>
                                            <div className="flex justify-between text-base font-medium text-gray-900">
                                                <h3 className="font-serif text-lg">{item.title}</h3>
                                                <p className="ml-4">{item.price}</p>
                                            </div>
                                        </div>
                                        <div className="flex-1 flex items-end justify-between text-sm">
                                            <p className="text-gray-500">Qty {item.quantity}</p>

                                            <div className="flex">
                                                <button
                                                    type="button"
                                                    onClick={() => removeFromCart(item.id)}
                                                    className="font-medium text-red-500 hover:text-red-700 uppercase text-xs tracking-wider"
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>

                        <div className="border-t border-gray-200 py-6 mt-6">
                            <div className="flex justify-between text-base font-medium text-gray-900 mb-4">
                                <p>Subtotal</p>
                                <p>${cartTotal.toFixed(2)}</p>
                            </div>
                            <p className="mt-0.5 text-sm text-gray-500 mb-6">Shipping and taxes calculated at checkout.</p>
                            <div className="mt-6">
                                <button
                                    onClick={handleCheckout}
                                    className="w-full flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium text-white bg-art-black hover:bg-gray-800 shadow-sm transition-colors uppercase tracking-widest"
                                >
                                    Checkout
                                </button>
                            </div>
                            <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                                <p>
                                    or{' '}
                                    <Link to="/shop" className="font-medium text-art-gold hover:text-yellow-600">
                                        Continue Shopping<span aria-hidden="true"> &rarr;</span>
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CheckoutPage;
