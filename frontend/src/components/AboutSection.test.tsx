import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import AboutSection from '../components/AboutSection';
import type { AboutSection as AboutData } from '../types';

const MOCK_ABOUT: AboutData = {
    title: "About Title",
    description: "About Description",
    image_url: "about.jpg"
};

describe('AboutSection Component', () => {
    it('renders about content correctly', () => {
        render(<AboutSection data={MOCK_ABOUT} />);
        expect(screen.getByText("About Title")).toBeInTheDocument();
        expect(screen.getByText("About Description")).toBeInTheDocument();
        expect(screen.getByAltText("Artist")).toHaveAttribute('src', 'about.jpg');
    });
});
