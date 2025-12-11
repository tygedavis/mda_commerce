import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import ContactPage from '../pages/ContactPage';
import { ContactPageData } from '../types';

describe('ContactPage', () => {
    const mockData: ContactPageData = {
        title: "Contact Title",
        description: "Contact Description"
    };

    beforeEach(() => {
        global.fetch = vi.fn();
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('renders loading state', () => {
        (global.fetch as any).mockReturnValue(new Promise(() => {}));
        render(<ContactPage />);
        expect(screen.getByText(/Loading Contact.../i)).toBeInTheDocument();
    });

    it('renders form and content after fetch', async () => {
        (global.fetch as any).mockResolvedValue({
            json: async () => mockData,
        });

        render(<ContactPage />);

        await waitFor(() => {
            expect(screen.getByText('Contact Title')).toBeInTheDocument();
            expect(screen.getByText('Contact Description')).toBeInTheDocument();
            expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
            expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
            expect(screen.getByLabelText(/Message/i)).toBeInTheDocument();
        });
    });
});
