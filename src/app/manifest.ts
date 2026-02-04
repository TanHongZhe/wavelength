import { MetadataRoute } from 'next'

export const dynamic = 'force-static'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Wavelength Online - Free Social Guessing Game',
        short_name: 'Wavelength',
        description: 'Play the viral telepathic party game in your browser! A social guessing game where players guess positions on a spectrum based on one-word clues.',
        start_url: '/',
        scope: '/',
        id: '/',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#0f172a',
        theme_color: '#0f172a',
        categories: ['games', 'entertainment', 'social'],
        icons: [
            {
                src: '/favicon.ico',
                sizes: '32x32',
                type: 'image/x-icon',
            },
            {
                src: '/icon-192.png',
                sizes: '192x192',
                type: 'image/png',
                purpose: 'any',
            },
            {
                src: '/icon-512.png',
                sizes: '512x512',
                type: 'image/png',
                purpose: 'maskable',
            },
            {
                src: '/apple-touch-icon.png',
                sizes: '180x180',
                type: 'image/png',
            },
        ],
        shortcuts: [
            {
                name: 'Create New Game',
                short_name: 'Create',
                description: 'Start a new Wavelength game room',
                url: '/?action=create',
                icons: [{ src: '/icon-192.png', sizes: '192x192' }],
            },
            {
                name: 'How to Play',
                short_name: 'Rules',
                description: 'Learn the rules of Wavelength',
                url: '/rules',
                icons: [{ src: '/icon-192.png', sizes: '192x192' }],
            },
        ],
        screenshots: [
            {
                src: '/og-image.png',
                sizes: '1200x630',
                type: 'image/png',
                label: 'Wavelength Online - Social Guessing Game',
            },
        ],
        prefer_related_applications: false,
    }
}
