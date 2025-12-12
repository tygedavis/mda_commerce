import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import App from './App';
import type { LandingPageData } from './types';

const MOCK_DATA: LandingPageData = {
    hero: {
        title: "Test Hero",
        subtitle: "Test Subtitle",
        cta_text: "Test CTA",
        background_image: "test.jpg"
    },
    featured_collection: [],
    about: {
        title: "About Test",
        description: "Test description",
        image_url: "test.jpg"
    },
    social_feed: []
};

// Mock fetch
window.fetch = vi.fn();

describe('App Component', () => {
    beforeEach(() => {
        vi.resetAllMocks();
    });

    it('shows loading state initially', () => {
        // Return a promise that never resolves immediately to test loading state
        (window.fetch as any).mockReturnValue(new Promise(() => { }));
        render(<App />);
        expect(screen.getByText(/Loading Artistry/i)).toBeInTheDocument();
    });

    it('renders content after data fetch', async () => {
        (window.fetch as any).mockResolvedValue({
            json: async () => MOCK_DATA
        });

        render(<App />);

        await waitFor(() => {
            expect(screen.getByText("Test Hero")).toBeInTheDocument();
        });
    });

    it('shows error message on fetch failure', async () => {
        (window.fetch as any).mockRejectedValue(new Error("API Error"));

        render(<App />);

        await waitFor(() => {
            expect(screen.getByText(/Unable to load content/i)).toBeInTheDocument();
        });
    });
});
