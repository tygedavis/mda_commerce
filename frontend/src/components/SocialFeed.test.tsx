import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import SocialFeed from '../components/SocialFeed';
import type { SocialPost } from '../types';

const MOCK_POSTS: SocialPost[] = [
    { id: 1, image_url: "post1.jpg", link: "http://link1.com" },
    { id: 2, image_url: "post2.jpg", link: "http://link2.com" }
];

describe('SocialFeed Component', () => {
    it('renders heading', () => {
        render(<SocialFeed items={MOCK_POSTS} />);
        expect(screen.getByText("Follow Along")).toBeInTheDocument();
        expect(screen.getByText("@ArtistName")).toBeInTheDocument();
    });

    it('renders social posts', () => {
        render(<SocialFeed items={MOCK_POSTS} />);
        const links = screen.getAllByRole('link');
        // 1 for @ArtistName + 2 posts = 3 links
        expect(links).toHaveLength(3);

        const images = screen.getAllByRole('img');
        expect(images).toHaveLength(2);
        expect(images[0]).toHaveAttribute('src', 'post1.jpg');
    });
});
