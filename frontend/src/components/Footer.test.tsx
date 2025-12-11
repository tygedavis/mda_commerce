import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Footer from '../components/Footer';

describe('Footer Component', () => {
    it('renders footer content', () => {
        render(<Footer />);
        expect(screen.getByText("Artist Name")).toBeInTheDocument();
        expect(screen.getByText(/Fine Art & Prints/i)).toBeInTheDocument();
        expect(screen.getByText(/Join the List/i)).toBeInTheDocument();
    });

    it('renders navigation links', () => {
        render(<Footer />);
        expect(screen.getByRole('link', { name: "Shop" })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: "About" })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: "Contact" })).toBeInTheDocument();
    });
});
