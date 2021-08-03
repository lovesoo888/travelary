const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const { PostCategory, Attachment } = require('../models');

const router = express.Router();

try {
  fs.accessSync('public/upload');
} catch (error) {
  console.log('upload 폴더가 없으므로 생성합니다.');
  fs.mkdirSync('public/upload');
}

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
      done(null, basename + '_' + new Date().getTime() + ext); // ex) 이미지명210802.png
    },
  }),
  limits: { fileSize: 20 * 1024 * 1024 }, //20 메가 제한
});

// 카테고리 추가
router.post('/', upload.none(), async (req, res, next) => {
  try {
    const category = await PostCategory.create({
      categoryName: req.body.categoryName,
      thumbnail: req.body.image,
      categoryTrue: 1,
    });
    if (req.body.image) {
      if (Array.isArray(req.body.image)) {
        // 이미지를 여러 개 올리면 image: [제로초.png, 부기초.png]
        const images = await Promise.all(
          req.body.image.map((image) => Attachment.create({ src: image }))
        );
        await category.addAttachment(images);
      } else {
        // 이미지를 하나만 올리면 image: 제로초.png
        const image = await Attachment.create({ src: req.body.image });
        await category.addAttachment(image);
      }
    }
    const fullCategory = await PostCategory.findOne({
      where: { id: category.id },
      include: [
        {
          model: Attachment,
        },
      ],
    });
    res.status(201).json(fullCategory);
  } catch (error) {
    console.error(error);
    next(error);
  }
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
