// server.js — simple, secure file upload and JSON index updater
const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');


const app = express();
const PORT = process.env.PORT || 3000;


// paths
const UPLOAD_DIR = path.join(__dirname, 'uploads');
const DATA_DIR = path.join(__dirname, 'data');
const DATA_FILE = path.join(DATA_DIR, 'images.json');


// ensure dirs exist
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, '[]');


// security middleware
app.use(helmet());
app.use(cors());
app.use(express.json());


// serve static frontend and uploads
app.use('/', express.static(path.join(__dirname)));
app.use('/uploads', express.static(UPLOAD_DIR));
app.use('/data', express.static(DATA_DIR));


// multer setup
const storage = multer.diskStorage({
destination: (req, file, cb) => cb(null, UPLOAD_DIR),
filename: (req, file, cb) => {
const safeName = file.originalname.replace(/[^a-z0-9.\-\_]/gi, '_');
const filename = `${Date.now()}-${safeName}`;
cb(null, filename);
}
});
const upload = multer({
storage,
limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
fileFilter: (req, file, cb) => {
if (!file.mimetype.startsWith('image/')) return cb(new Error('Only images allowed'));
cb(null, true);
}
});


app.post('/upload', upload.single('image'), (req, res) => {
if (!req.file) return res.status(400).json({ message: 'No file uploaded' });


try {
// prepare metadata
const record = {
filename: req.file.filename,
url: `/uploads/${req.file.filename}`,
uploadedAt: new Date().toISOString(),
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
