import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import ShopPage from '../pages/ShopPage';
import type { ShopPageData } from '../types';

describe('ShopPage', () => {
    const mockData: ShopPageData = {
        items: [
            {
                id: 1,
                title: "Test Art 1",
                price: "$100",
                image_url: "http://test.com/1.jpg",
                description: "Test Desc 1"
            },
            {
                id: 2,
                title: "Test Art 2",
                price: "$200",
                image_url: "http://test.com/2.jpg",
                description: "Test Desc 2"
            }
        ]
    };

    beforeEach(() => {
        window.fetch = vi.fn();
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('renders loading state initially', () => {
        (window.fetch as any).mockReturnValue(new Promise(() => { })); // Never resolves
        render(<ShopPage />);
        expect(screen.getByText(/Loading Shop.../i)).toBeInTheDocument();
    });

    it('renders items after fetch', async () => {
        (window.fetch as any).mockResolvedValue({
            json: async () => mockData,
        });

        render(<ShopPage />);

        await waitFor(() => {
            expect(screen.getByText('Test Art 1')).toBeInTheDocument();
            expect(screen.getByText('Test Art 2')).toBeInTheDocument();
            expect(screen.getByText('$100')).toBeInTheDocument();
        });
    });

    it('renders error state on fetch failure', async () => {
        (window.fetch as any).mockRejectedValue(new Error("API Error"));
        render(<ShopPage />);
        await waitFor(() => {
            expect(screen.getByText(/Unable to load shop content/i)).toBeInTheDocument();
        });
    });
});
