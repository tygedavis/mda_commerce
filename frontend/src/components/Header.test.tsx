import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Header from '../components/Header';

describe('Header Component', () => {
    it('renders logo text', () => {
        render(
            <MemoryRouter>
                <Header />
            </MemoryRouter>
        );
        expect(screen.getByText("Artist Name")).toBeInTheDocument();
    });

    it('renders navigation links', () => {
        render(
            <MemoryRouter>
                <Header />
            </MemoryRouter>
        );
        expect(screen.getByRole('link', { name: "Shop" })).toHaveAttribute('href', '/shop');
        expect(screen.getByRole('link', { name: "About" })).toHaveAttribute('href', '/about');
        expect(screen.getByRole('link', { name: "Contact" })).toHaveAttribute('href', '/contact');
    });

    it('renders cart button', () => {
        render(
            <MemoryRouter>
                <Header />
            </MemoryRouter>
        );
        expect(screen.getByRole('button', { name: /Cart/i })).toBeInTheDocument();
    });
});
