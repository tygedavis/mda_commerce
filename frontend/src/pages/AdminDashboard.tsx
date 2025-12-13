import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        price: '',
        image_url: '',
        description: ''
    });
    const [status, setStatus] = useState<{ type: 'success' | 'error' | null, message: string }>({ type: null, message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setStatus({ type: null, message: '' });

        const token = localStorage.getItem('authToken');
        if (!token) {
            setStatus({ type: 'error', message: 'Not authenticated. Please login again.' });
            setIsSubmitting(false);
            return;
        }

        const cleanPrice = formData.price.replace(/[^0-9.]/g, '');
        const priceInCents = Math.round(parseFloat(cleanPrice) * 100);

        if (isNaN(priceInCents)) {
            setStatus({ type: 'error', message: 'Invalid price format.' });
            setIsSubmitting(false);
            return;
        }

        try {
            const response = await fetch('/api/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    title: formData.title,
                    description: formData.description,
                    price: priceInCents,
                    image_url: formData.image_url
                })
            });

            if (response.ok) {
                setStatus({ type: 'success', message: 'Product added successfully!' });
                setFormData({ title: '', price: '', image_url: '', description: '' });
            } else {
                const errorData = await response.json().catch(() => ({}));
                setStatus({ type: 'error', message: errorData.message || 'Failed to add product.' });
            }
        } catch (error) {
            console.error('Submission error:', error);
            setStatus({ type: 'error', message: 'Network error. Please try again.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        navigate('/admin/login');
    };

    return (
        <div className="min-h-screen bg-art-cream py-10 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-10">
                    <h1 className="text-3xl font-serif text-art-black">Admin Dashboard</h1>
                    <button
                        onClick={handleLogout}
                        className="text-sm text-gray-600 hover:text-red-500 transition-colors"
                    >
                        Logout
                    </button>
                </div>

                <div className="bg-white p-8 shadow rounded-lg">
                    <h2 className="text-xl font-serif mb-6 border-b pb-2">Add New Product</h2>

                    {status.message && (
                        <div className={`p-4 mb-6 rounded ${status.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                            {status.message}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                            <input
                                id="title"
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                required
                                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-art-gold"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">Price (USD)</label>
                                <input
                                    id="price"
                                    type="text"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    placeholder="200.00"
                                    required
                                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-art-gold"
                                />
                            </div>
                            <div>
                                <label htmlFor="image_url" className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                                <input
                                    id="image_url"
                                    type="url"
                                    name="image_url"
                                    value={formData.image_url}
                                    onChange={handleChange}
                                    placeholder="https://..."
                                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-art-gold"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                            <textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows={4}
                                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-art-gold"
                            />
                        </div>

                        <div className="flex justify-end">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="bg-art-black text-white px-6 py-2 rounded hover:bg-gray-800 transition-colors disabled:opacity-50"
                            >
                                {isSubmitting ? 'Adding...' : 'Add Product'}
                            </button>
                        </div>
                    </form>
                </div>

                 <div className="mt-6 text-center text-xs text-gray-400">
                    <a href="/" className="hover:text-art-black transition-colors">Return to Home</a>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
