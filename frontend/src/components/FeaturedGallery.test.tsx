import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import FeaturedGallery from '../components/FeaturedGallery';
import type { Artwork } from '../types';

const MOCK_ITEMS: Artwork[] = [
    { id: 1, title: "Art 1", price: "$100", image_url: "art1.jpg", description: "Desc 1" },
    { id: 2, title: "Art 2", price: "$200", image_url: "art2.jpg", description: "Desc 2" }
];

describe('FeaturedGallery Component', () => {
    it('renders gallery title', () => {
        render(<FeaturedGallery items={MOCK_ITEMS} />);
        expect(screen.getByText("Featured Collection")).toBeInTheDocument();
    });

    it('renders all artworks', () => {
        render(<FeaturedGallery items={MOCK_ITEMS} />);
        expect(screen.getByText("Art 1")).toBeInTheDocument();
        expect(screen.getByText("Art 2")).toBeInTheDocument();
        expect(screen.getByText("$100")).toBeInTheDocument();
    });

    it('renders correct images', () => {
        render(<FeaturedGallery items={MOCK_ITEMS} />);
        const images = screen.getAllByRole('img');
        expect(images[0]).toHaveAttribute('src', 'art1.jpg');
        expect(images[1]).toHaveAttribute('src', 'art2.jpg');
    });
});
