const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3004;
const SAMPLE_CASES_DIR = path.join(__dirname, 'sampleCases');

// MIME types for static file serving
const MIME_TYPES = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2',
    '.ttf': 'font/ttf',
};

// Get list of sample case files
function getSampleCases() {
    try {
        const files = fs.readdirSync(SAMPLE_CASES_DIR);
        return files
            .filter(file => file.endsWith('.json'))
            .map(file => {
                // Parse filename to extract metadata
                // Format: YYYYMMDD_LANG-PAIR_Description.json
                const basename = path.basename(file, '.json');
                const parts = basename.split('_');
                let date = '', langPair = '', description = '';

                if (parts.length >= 3) {
                    date = parts[0];
                    langPair = parts[1];
                    description = parts.slice(2).join(' ').replace(/-/g, ' ');
                } else {
                    description = basename.replace(/-/g, ' ');
                }

                return {
                    filename: file,
                    date: date,
                    langPair: langPair,
                    description: description,
                    displayName: `[${langPair}] ${description}` + (date ? ` (${date.slice(0, 4)}-${date.slice(4, 6)}-${date.slice(6, 8)})` : '')
                };
            })
            .sort((a, b) => b.date.localeCompare(a.date)); // Sort by date, newest first
    } catch (error) {
        console.error('Error reading sample cases directory:', error);
        return [];
    }
}

// Read sample case file content
function getSampleCaseContent(filename) {
    try {
        const filePath = path.join(SAMPLE_CASES_DIR, filename);
        // Security check: ensure the path is within SAMPLE_CASES_DIR
        if (!filePath.startsWith(SAMPLE_CASES_DIR)) {
            return null;
        }
        const content = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(content);
    } catch (error) {
        console.error('Error reading sample case file:', error);
        return null;
    }
}

// Serve static files
function serveStaticFile(res, filePath) {
    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('File not found');
            return;
        }
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(data);
    });
}

const server = http.createServer((req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const pathname = url.pathname;

    // CORS headers for development
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }

    // API endpoints
    if (pathname === '/api/sample-cases') {
        // List all sample cases
        const cases = getSampleCases();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(cases));
        return;
    }

    if (pathname.startsWith('/api/sample-cases/')) {
        // Get specific sample case content
        const filename = decodeURIComponent(pathname.replace('/api/sample-cases/', ''));
        const content = getSampleCaseContent(filename);
        if (content) {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(content));
        } else {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Sample case not found' }));
        }
        return;
    }

    // Static file serving
    let filePath;
    if (pathname === '/' || pathname === '/index.html') {
        filePath = path.join(__dirname, 'analyzer.html');
    } else {
        filePath = path.join(__dirname, pathname);
    }

    // Security check: ensure the path is within the project directory
    if (!filePath.startsWith(__dirname)) {
        res.writeHead(403, { 'Content-Type': 'text/plain' });
        res.end('Forbidden');
        return;
    }

    serveStaticFile(res, filePath);
});

server.listen(PORT, '0.0.0.0', () => {
    console.log(`\n🚀 Persona Translation Analyzer Server`);
    console.log(`   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
    console.log(`   Local:    http://localhost:${PORT}`);
    console.log(`   Network:  http://0.0.0.0:${PORT}`);
    console.log(`\n   Available sample cases:`);
    const cases = getSampleCases();
    cases.forEach((c, i) => {
        console.log(`   ${i + 1}. ${c.displayName}`);
    });
    console.log(`\n   Press Ctrl+C to stop the server.\n`);
});
