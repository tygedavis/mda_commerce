import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import AboutPage from '../pages/AboutPage';
import type { AboutSection } from '../types';

describe('AboutPage', () => {
    const mockData: AboutSection = {
        title: "About Title",
        description: "About Description",
        image_url: "http://test.com/about.jpg"
    };

    beforeEach(() => {
        window.fetch = vi.fn();
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('renders loading state', () => {
        (window.fetch as any).mockReturnValue(new Promise(() => { }));
        render(<AboutPage />);
        expect(screen.getByText(/Loading About.../i)).toBeInTheDocument();
    });

    it('renders content after fetch', async () => {
        (window.fetch as any).mockResolvedValue({
            json: async () => mockData,
        });

        render(<AboutPage />);

        await waitFor(() => {
            expect(screen.getByText('About Title')).toBeInTheDocument();
            expect(screen.getByText('About Description')).toBeInTheDocument();
        });
    });
});
