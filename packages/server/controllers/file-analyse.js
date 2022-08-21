const router = require('express').Router();
const multer = require('multer');

const upload = multer({
    limits: {
        fileSize: 3000,
        files: 1,
    },
});

router.post('/', upload.single('upfile'), (req, res, next) => {
    if (!req.file) next(new Error('No file sended with upfile key'));

    const { originalname, mimetype, size } = req.file;

    res.send({
        name: originalname,
        type: mimetype,
        size,
    });
});

module.exports = router;
