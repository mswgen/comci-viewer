import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        background_color: '#333333',
        categories: ['education', 'utilities'],
        description: '컴시간 뷰어',
        display: 'standalone',
        icons: [
            {
                src: '/icon1.png',
                sizes: '512x512',
                type: 'image/png',
                purpose: 'maskable'
            },
            {
                src: '/icon2.png',
                sizes: '192x192',
                type: 'image/png',
                purpose: 'maskable'
            },
            {
                src: '/icon3.png',
                sizes: '512x512',
                type: 'image/png',
                purpose: 'any'
            },
            {
                src: '/icon4.png',
                sizes: '192x192',
                type: 'image/png',
                purpose: 'any'
            }
        ],
        id: 'comci-viewer',
        name: '컴시간 뷰어',
        dir: 'ltr',
        lang: 'ko-KR',
        scope: '/',
        short_name: '컴시간 뷰어',
        start_url: '/',
        theme_color: '#333333'
    }
}