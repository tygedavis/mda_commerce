import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Header from '../components/Header';

describe('Header Component', () => {
    it('renders logo text', () => {
        render(<Header />);
        expect(screen.getByText("Artist Name")).toBeInTheDocument();
    });

    it('renders navigation links', () => {
        render(<Header />);
        expect(screen.getByRole('link', { name: "Collection" })).toHaveAttribute('href', '#collection');
        expect(screen.getByRole('link', { name: "About" })).toHaveAttribute('href', '#about');
        expect(screen.getByRole('link', { name: "Contact" })).toHaveAttribute('href', '#contact');
    });

    it('renders cart button', () => {
        render(<Header />);
        expect(screen.getByRole('button', { name: /Cart/i })).toBeInTheDocument();
    });
});
