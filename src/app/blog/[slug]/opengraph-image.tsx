import { ImageResponse } from 'next/og'
import { getBlogPost } from '@/lib/blogData'

export const runtime = 'edge'
export const size = {
    width: 1200,
    height: 630,
}
export const contentType = 'image/png'

export default async function Image({ params }: { params: { slug: string } }) {
    const post = getBlogPost(params.slug)

    if (!post) {
        return new ImageResponse(
            (
                <div
                    style={{
                        fontSize: 48,
                        background: '#0f172a',
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                    }}
                >
                    Wavelength Blog
                </div>
            ),
            { ...size }
        )
    }

    return new ImageResponse(
        (
            <div
                style={{
                    background: 'linear-gradient(to bottom right, #0f172a, #1e293b)',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '80px',
                    color: 'white',
                    position: 'relative',
                }}
            >
                {/* Abstract Background Shapes */}
                <div style={{ position: 'absolute', top: -100, left: -100, width: 400, height: 400, borderRadius: '50%', background: '#ec4899', opacity: 0.1, filter: 'blur(100px)' }} />
                <div style={{ position: 'absolute', bottom: -100, right: -100, width: 500, height: 500, borderRadius: '50%', background: '#8b5cf6', opacity: 0.1, filter: 'blur(120px)' }} />

                {/* Category Pill */}
                <div
                    style={{
                        background: 'rgba(236, 72, 153, 0.2)',
                        color: '#f9a8d4',
                        padding: '10px 24px',
                        borderRadius: '50px',
                        fontSize: 24,
                        fontWeight: 600,
                        marginBottom: 40,
                        textTransform: 'uppercase',
                        letterSpacing: '2px',
                    }}
                >
                    {post.category}
                </div>

                {/* Title */}
                <div
                    style={{
                        fontSize: 72,
                        fontWeight: 800,
                        textAlign: 'center',
                        lineHeight: 1.1,
                        marginBottom: 30,
                        background: 'linear-gradient(to right, #ffffff, #e2e8f0)',
                        backgroundClip: 'text',
                        color: 'transparent',
                        textShadow: '0 4px 8px rgba(0,0,0,0.3)',
                    }}
                >
                    {post.title}
                </div>

                {/* Footer/Brand */}
                <div style={{ position: 'absolute', bottom: 60, display: 'flex', alignItems: 'center', opacity: 0.8 }}>
                    <svg
                        width="40"
                        height="40"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        color="#ec4899"
                        style={{ marginRight: 16 }}
                    >
                        <path d="M2 12h2.5l2.5-6 5 12 5-12 2.5 6H22" />
                    </svg>
                    <span style={{ fontSize: 32, fontWeight: 700, color: '#e2e8f0' }}>Wavelength Online</span>
                </div>
            </div>
        ),
        {
            ...size,
        }
    )
}
