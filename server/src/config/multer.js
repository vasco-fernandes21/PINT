const multer = require('multer');
const path = require('path');

// Configuração do Multer
const storage = multer.diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
        // Gera um nome de arquivo único para evitar conflitos
        const ext = path.extname(file.originalname);
        const filename = file.fieldname + '-' + Date.now() + '-' + path.basename(file.originalname, ext) + ext;
        cb(null, filename);
    }
});

const upload = multer({ storage });

module.exports = upload;