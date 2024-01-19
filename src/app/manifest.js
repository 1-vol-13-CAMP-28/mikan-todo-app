// extends MetadataRoute.Manifest
export default function manifest() {
    return {
        "theme_color": "#f98518",
        "background_color": "#dcb38b",
        "display": "minimal-ui",
        "scope": "/",
        "start_url": "/",
        "name": "Mikan-todo-app",
        "short_name": "Mikan",
        "description": "A fun & fancy to-do management app that fits your life.",
        "icons": [
            {
                "src": "/public/img/icon/icon-192x192.png",
                "sizes": "192x192",
                "type": "image/png"
            },
            {
                "src": "/public/img/icon/icon-256x256.png",
                "sizes": "256x256",
                "type": "image/png"
            },
            {
                "src": "/public/img/icon/icon-384x384.png",
                "sizes": "384x384",
                "type": "image/png"
            },
            {
                "src": "/icon-512x512.png",
                "sizes": "512x512",
                "type": "image/png"
            }
        ]
    }
}