const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Serve static files (HTML, CSS, JS)
app.use(express.static(__dirname));

// Routes for all HTML pages
app.get('/:page', (req, res) => {
    const page = req.params.page;
    const filePath = path.join(__dirname, `${page}.html`);

    res.sendFile(filePath, (err) => {
        if (err) {
            res.status(404).send('Page not found');
        }
    });
});

// Default route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});