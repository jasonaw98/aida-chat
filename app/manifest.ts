import type { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'IDRead Messaging',
    short_name: 'IDREAD',
    description: 'IDRead Messaging',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#ffffff',
    icons: [
      {
        src: '/aidaicon.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}