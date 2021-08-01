const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const { PostCategory } = require('../models');

const router = express.Router();

try {
  fs.accessSync('public/upload');
} catch (error) {
  console.log('upload 폴더가 없으므로 생성합니다.');
  fs.mkdirSync('public/upload');
}

// 카테고리 추가
router.post('/', async (req, res, next) => {
  try {
    const category = await PostCategory.create({
      categoryName: req.body.categoryName,
    });
    res.status(201).json(category);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

const upload = multer({
  storage: multer.diskStorage({
    // destination(req, file, done) {
    //   done(null, 'uploads');
    // },
    destination(req, file, cb) {
      cb(null, 'public/upload/');
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname); // 이미지 명 중복 방지, 확장자 추출
      const basename = path.basename(file.originalname, ext); // 이미지명 추출
      done(null, basename + new Date().getTime() + ext); // ex) 이미지명210802.png
    },
  }),
  limits: { fileSize: 20 * 1024 * 1024 }, //20 메가 제한
});

router.post('/images', upload.array('image'), async (req, res, next) => {
  // post/images
  console.log(req.files);
  res.json(req.files.map((v) => v.filename));
});

router.delete('/:postCategoryId', async (req, res, next) => {
  try {
    await PostCategory.destroy({
      where: { id: req.params.postCategoryId },
    });
    res.json({ PostCategoryId: req.params.postCategoryId });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
