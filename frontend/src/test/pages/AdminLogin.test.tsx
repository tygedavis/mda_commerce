import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import AdminLogin from '../../pages/AdminLogin';
import { vi } from 'vitest';

// Mock GoogleLogin
vi.mock('@react-oauth/google', () => ({
    GoogleLogin: ({ onSuccess, onError }: any) => (
        <button onClick={() => onSuccess({ credential: 'fake-jwt' })}>Mock Google Login</button>
    ),
    GoogleOAuthProvider: ({ children }: any) => <div>{children}</div>
}));

// Mock jwt-decode
vi.mock('jwt-decode', () => ({
    jwtDecode: () => ({ email: 'admin@example.com' })
}));

const mockedNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useNavigate: () => mockedNavigate,
    };
});

describe('AdminLogin', () => {
    it('renders login button', () => {
        render(
            <BrowserRouter>
                <AdminLogin />
            </BrowserRouter>
        );
        expect(screen.getByText('Admin Portal')).toBeInTheDocument();
        expect(screen.getByText('Mock Google Login')).toBeInTheDocument();
    });
});
