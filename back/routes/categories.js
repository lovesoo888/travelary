// 카테고리 목록 라우터
const express = require('express');

const router = express.Router();

const { PostCategory, Member, Attachment } = require('../models');

router.get('/', async (req, res, next) => {
  // GET /posts
  try {
    const categories = await PostCategory.findAll({
      limit: 9,
      order: [
        ['createdAt', 'DESC'], // 게시글 내림차순
      ],
      // 20. 19, 18, 17, 16, 15, 14, 13 , 12, 11, 10 , 9 , 8 ,7, 6, 5, 4, 3, 2, 1
      include: [
        {
          model: Member,
          attributes: ['id', 'nickname'],
        },
        {
          model: Attachment,
        },
      ],
    }); // 모든 게시물 가져온다
    console.log(categories);
    res.status(200).json(categories);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
