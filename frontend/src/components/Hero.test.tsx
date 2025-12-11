import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Hero from '../components/Hero';
import { HeroSection } from '../types';

const MOCK_HERO: HeroSection = {
    title: "Timeless Art",
    subtitle: "A journey of colors",
    cta_text: "View Gallery",
    background_image: "hero.jpg"
};

describe('Hero Component', () => {
    it('renders hero content correctly', () => {
        render(<Hero data={MOCK_HERO} />);

        expect(screen.getByText("Timeless Art")).toBeInTheDocument();
        expect(screen.getByText("A journey of colors")).toBeInTheDocument();
        expect(screen.getByText("View Gallery")).toBeInTheDocument();
    });

    it('renders CTA as an anchor link to #collection', () => {
        render(<Hero data={MOCK_HERO} />);
        const link = screen.getByRole('link', { name: "View Gallery" });
        expect(link).toHaveAttribute('href', '#collection');
    });
});
