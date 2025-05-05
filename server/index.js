import express from 'express'
import cors from 'cors'
import multer from 'multer'
import fs from 'fs';
import path from 'path';
import pdfParse from 'pdf-parse';
import { fileURLToPath } from 'url';


const app = express();
app.use(express.json());
app.use(cors());

// Define __dirname for ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, `${uniqueSuffix}-${file.originalname}`)
    }
})

const upload = multer({ storage: storage });
// const upload = multer({ dest: "uploads/" });

// multer configuration ends

const PORT = process.env.PORT || 8000;

// endpoints
app.post('/upload/pdf', upload.single('pdf'), async (req, res) => {
    console.log(req.file);
    const dataBuffer = fs.readFileSync(req.file.path);
    const pdfData = await pdfParse(dataBuffer);
    const chunks = chunkText(pdfData.text);
    console.log(chunks);

    res.json({ "msg": 'File uploaded successfully!' });
});

function chunkText(text, chunkSize = 500, overlap = 50) {
    const chunks = [];
    let i = 0;

    while (i < text.length) {
        let end = Math.min(i + chunkSize, text.length);
        chunks.push(text.slice(i, end));
        i += chunkSize - overlap;
    }

    return chunks;
}

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});