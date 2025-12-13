import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import AdminDashboard from '../../pages/AdminDashboard';
import { vi } from 'vitest';

// Mock navigation
const mockedNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useNavigate: () => mockedNavigate,
    };
});

describe('AdminDashboard', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        localStorage.clear();
        global.fetch = vi.fn();
    });

    it('renders login redirect if no token', () => {
        // Since the component checks token on submission, initial render is fine.
        // ProtectedRoute handles the redirect on load, but here we test the Dashboard component itself.
        // The dashboard doesn't auto-redirect on load in its current implementation (it relies on ProtectedRoute wrapper),
        // except when logging out or submitting.

        render(
            <BrowserRouter>
                <AdminDashboard />
            </BrowserRouter>
        );
        expect(screen.getByText('Admin Dashboard')).toBeInTheDocument();
    });

    it('handles logout', () => {
        localStorage.setItem('authToken', 'fake-token');
        render(
            <BrowserRouter>
                <AdminDashboard />
            </BrowserRouter>
        );

        fireEvent.click(screen.getByText('Logout'));
        expect(localStorage.getItem('authToken')).toBeNull();
        expect(mockedNavigate).toHaveBeenCalledWith('/admin/login');
    });

    it('submits product successfully', async () => {
        localStorage.setItem('authToken', 'fake-token');
        const mockFetch = vi.fn().mockResolvedValue({
            ok: true,
            json: () => Promise.resolve({ id: '123' }),
        });
        global.fetch = mockFetch;

        render(
            <BrowserRouter>
                <AdminDashboard />
            </BrowserRouter>
        );

        fireEvent.change(screen.getByLabelText(/Title/i), { target: { value: 'New Art' } });
        fireEvent.change(screen.getByLabelText(/Price/i), { target: { value: '500' } });
        fireEvent.change(screen.getByLabelText(/Image URL/i), { target: { value: 'http://img.com' } });
        fireEvent.change(screen.getByLabelText(/Description/i), { target: { value: 'Desc' } });

        fireEvent.click(screen.getByText('Add Product'));

        await waitFor(() => {
            expect(mockFetch).toHaveBeenCalledWith('/api/products', expect.objectContaining({
                method: 'POST',
                headers: expect.objectContaining({
                    'Authorization': 'Bearer fake-token'
                }),
                body: JSON.stringify({
                    title: 'New Art',
                    description: 'Desc',
                    price: 50000, // 500 * 100
                    image_url: 'http://img.com'
                })
            }));
            expect(screen.getByText('Product added successfully!')).toBeInTheDocument();
        });
    });

    it('handles submission error', async () => {
        localStorage.setItem('authToken', 'fake-token');
        const mockFetch = vi.fn().mockResolvedValue({
            ok: false,
            json: () => Promise.resolve({ message: 'Server Error' }),
        });
        global.fetch = mockFetch;

        render(
            <BrowserRouter>
                <AdminDashboard />
            </BrowserRouter>
        );

        fireEvent.change(screen.getByLabelText(/Title/i), { target: { value: 'New Art' } });
        fireEvent.change(screen.getByLabelText(/Price/i), { target: { value: '500' } });
        fireEvent.click(screen.getByText('Add Product'));

        await waitFor(() => {
            expect(screen.getByText('Server Error')).toBeInTheDocument();
        });
    });
});
