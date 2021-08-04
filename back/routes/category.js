const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const { PostCategory, Attachment, Post, Member } = require('../models');

const router = express.Router();

// 하드에 upload 폴더 생성
try {
  fs.accessSync('public/upload');
} catch (error) {
  console.log('upload 폴더가 없으므로 생성합니다.');
  fs.mkdirSync('public/upload');
}

// 이미지 업로드 멀터 함수
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

// router.post('/:id/post', async (req, res, next) => {
//   // POST /post/1/comment
//   try {
//     const category = await PostCategory.findOne({
//       where: { id: req.params.id },
//     });
//     if (!category) {
//       return res.status(403).send('존재하지 않는 카테고리 입니다.');
//     }
//     const post = await Post.create({
//       title: req.body.title,
//       content: req.body.content,
//       categoryId: parseInt(req.params.postId, 10),
//     });
//     const fullPost = await Post.findOne({
//       where: { id: post.id },
//       include: [
//         {
//           model: Member,
//           attributes: ['id', 'name'],
//         },
//       ],
//     });
//     res.status(201).json(fullPost);
//   } catch (error) {
//     console.error(error);
//     next(error);
//   }
// });

// 포스트 추가
router.post('/post', upload.none(), async (req, res, next) => {
  try {
    // const category = await PostCategory.findOne({
    //   where: { id: req.params.id },
    // });
    // if (!category) {
    //   return res.status(404).send('카테고리가 존재하지 않습니다');
    // }

    const newPost = await Post.create({
      title: req.body.title,
      thumbnail: req.body.image,
      content: req.body.content,
      categoryCode: 0,
    });

    if (req.body.image) {
      // 이미지 주소를 여러개 올리면 image: [주소1, 주소2]
      if (Array.isArray(req.body.image)) {
        const images = await Promise.all(
          req.body.image.map((image) => Attachment.create({ src: image }))
        );
        await newPost.addAttachments(images);
      } else {
        // 이미지를 하나만 올리면 image: 주소1
        const image = await Attachment.create({ src: req.body.image });
        await newPost.addAttachment(image);
      }
    }

    const fullPost = await Post.findOne({
      where: { id: newPost.id },
      include: [
        {
          model: Attachment,
        },
        {
          model: Member,
        },
        {
          model: PostCategory,
          attributes: ['id'],
        },
      ],
    });
    res.json(fullPost);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

// 이미지 첨부 파일
router.post('/images', upload.array('image'), async (req, res, next) => {
  // post/images
  console.log(req.files);
  res.json(req.files.map((v) => v.filename)); // 업로드된 파일명을 프론트로 넘겨줌
});

router.post('/post/images', upload.array('image'), async (req, res, next) => {
  // post/images
  console.log(req.files);
  res.json(req.files.map((v) => v.filename)); // 업로드된 파일명을 프론트로 넘겨줌
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
