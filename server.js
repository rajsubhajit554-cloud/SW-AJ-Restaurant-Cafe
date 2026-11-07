/**
 * SW AJ Restaurant & Cafe - Local Server & Diwali Festival API
 * Built with pure Node.js (Zero external dependencies needed!)
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = __dirname;

const MIME_TYPES = {
    '.html': 'text/html; charset=UTF-8',
    '.css': 'text/css; charset=UTF-8',
    '.js': 'application/javascript; charset=UTF-8',
    '.json': 'application/json; charset=UTF-8',
    '.webp': 'image/webp',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.mp3': 'audio/mpeg',
    '.wav': 'audio/wav',
    '.ttf': 'font/ttf',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2'
};

const DIWALI_GREETINGS = [
    "শুভ দীপাবলি ও কালীপূজার আন্তরিক প্রীতি ও শুভেচ্ছা! আপনার জীবন আলোয় ভরে উঠুক। 🪔✨",
    "May the divine glow of Diwali diyas illuminate your home with boundless joy, happiness, and prosperity! ✨",
    "আলোর উৎসব দীপাবলি আপনার এবং আপনার পরিবারের জন্য বয়ে আনুক সুস্বাস্থ্য এবং অপার আনন্দ! 🎆",
    "Wishing you a sparkling and joyous Diwali! Feast on the sweetest treats from AJ Restaurant & Cafe! 🍛🪔"
];

const COUPONS = ["DIWALI10", "LIGHTS15", "DHAMAKA20", "AJFESTIVE"];

const server = http.createServer((req, res) => {
    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }

    const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
    let pathname = decodeURIComponent(parsedUrl.pathname);

    // API: Diwali Festival Status & Greetings
    if (pathname === '/api/diwali-status' && req.method === 'GET') {
        const responseData = {
            festival: "Diwali & Kali Puja (দীপাবলি ও কালীপূজা)",
            year: new Date().getFullYear(),
            active: true,
            theme: "diwali-lights",
            offers: [
                { title: "Special Thali & Combos", discount: "10% OFF", code: "DIWALI10" },
                { title: "Special Dahi Lassi & Sweet Combos", discount: "Festive Special", code: "SWEETDIWALI" }
            ],
            contact: {
                phone: "6295982636",
                whatsapp: "916295982636",
                restaurant: "AJ Restaurant & Cafe"
            },
            randomWish: DIWALI_GREETINGS[Math.floor(Math.random() * DIWALI_GREETINGS.length)]
        };

        res.writeHead(200, { 'Content-Type': 'application/json; charset=UTF-8' });
        res.end(JSON.stringify(responseData, null, 2));
        return;
    }

    // API: Post Diwali Greeting to get custom coupon & card
    if (pathname === '/api/diwali-greeting' && (req.method === 'POST' || req.method === 'GET')) {
        let name = parsedUrl.searchParams.get('name') || 'Guest';

        const result = {
            success: true,
            recipient: name,
            message: `শুভ দীপাবলি ${name}! AJ Restaurant & Cafe পক্ষ থেকে রইল প্রীতি ও শুভেচ্ছা! 🪔`,
            coupon: COUPONS[Math.floor(Math.random() * COUPONS.length)],
            discountText: "10% Discount on orders above ₹300",
            validUntil: "Diwali Special Period",
            orderLink: `https://wa.me/916295982636?text=Hello%20AJ%20Restaurant,%20I%20have%20the%20Diwali%20Special%20Coupon!`
        };

        res.writeHead(200, { 'Content-Type': 'application/json; charset=UTF-8' });
        res.end(JSON.stringify(result, null, 2));
        return;
    }

    // Static File Serving
    if (pathname === '/') {
        pathname = '/index.html';
    }

    const safePath = path.normalize(path.join(PUBLIC_DIR, pathname));

    // Security check: stay within PUBLIC_DIR
    if (!safePath.startsWith(PUBLIC_DIR)) {
        res.writeHead(403, { 'Content-Type': 'text/plain' });
        res.end('403 Forbidden');
        return;
    }

    fs.stat(safePath, (err, stats) => {
        if (err || !stats.isFile()) {
            res.writeHead(404, { 'Content-Type': 'text/html; charset=UTF-8' });
            res.end(`<h1>404 Not Found</h1><p>AJ Restaurant & Cafe - Page or file not found.</p>`);
            return;
        }

        const ext = path.extname(safePath).toLowerCase();
        const contentType = MIME_TYPES[ext] || 'application/octet-stream';

        res.writeHead(200, {
            'Content-Type': contentType,
            'Cache-Control': 'no-cache'
        });

        const fileStream = fs.createReadStream(safePath);
        fileStream.pipe(res);
    });
});

server.listen(PORT, () => {
    console.log(`====================================================`);
    console.log(`🪔 AJ Restaurant & Cafe Diwali Website Server`);
    console.log(`✨ Local URL: http://localhost:${PORT}`);
    console.log(`🎆 Diwali API: http://localhost:${PORT}/api/diwali-status`);
    console.log(`====================================================`);
});

