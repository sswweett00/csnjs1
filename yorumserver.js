const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const filePath = 'yorumlar.json';

// Yorumları getirme
app.get('/yorumlar', (req, res) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Yorumlar okunamadı:', err);
            return res.status(500).json({ error: 'Yorumlar okunamadı' });
        }
        res.json(JSON.parse(data));
    });
});

// Yeni yorum ekleme
app.post('/yorumlar', (req, res) => {
    const yeniYorum = req.body;

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Yorumlar okunamadı:', err);
            return res.status(500).json({ error: 'Yorumlar okunamadı' });
        }
        const yorumlar = JSON.parse(data);
        yorumlar.push(yeniYorum);

        fs.writeFile(filePath, JSON.stringify(yorumlar, null, 2), (err) => {
            if (err) {
                console.error('Yorum kaydedilemedi:', err);
                return res.status(500).json({ error: 'Yorum kaydedilemedi' });
            }
            res.status(201).json(yeniYorum);
        });
    });
});

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
