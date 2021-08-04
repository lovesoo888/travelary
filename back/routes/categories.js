// 카테고리 목록 라우터
const express = require('express');
const { Op } = require('sequelize');

const { PostCategory, Member, Attachment, Post } = require('../models');
const router = express.Router();

router.get('/', async (req, res, next) => {
  // GET /categories
  try {
    const where = {};
    if (parseInt(req.query.lastId, 9)) {
      // 초기 로딩이 아닐 때
      where.id = { [Op.lt]: parseInt(req.query.lastId, 9) };
    }
    const categories = await PostCategory.findAll({
      where,
      limit: 9,
      order: [
        ['createdAt', 'DESC'], // 게시글 내림차순
      ],
      include: [
        // {
        //   model: Member,
        // },
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

// post 들 불러오기
router.get('/:id', async (req, res, next) => {
  // GET /posts
  try {
    const where = {};
    if (parseInt(req.query.lastId, 9)) {
      // 초기 로딩이 아닐 때
      where.id = { [Op.lt]: parseInt(req.query.lastId, 9) };
    }
    const posts = await Post.findAll({
      where,
      limit: 9,
      order: [
        ['createdAt', 'DESC'], // 게시글 내림차순
      ],
      include: [
        // {
        //   model: Member,
        // },
        {
          model: Attachment,
        },
      ],
    }); // 모든 게시물 가져온다
    console.log(posts);
    res.status(200).json({
      code: '200',
      posts,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// post 불러오기
router.get('/:id/post/:id', async (req, res, next) => {
  // GET /api/categories/1/post/1

  try {
    // const category = await PostCategory.findOne({
    //   where: { id: req.params.id },
    // });

    // if (!category) {
    //   return res.status(404).send('카테고리가 존재하지 않습니다.!!!!'); ///////////////////////////
    // } //////////////////////////////////////////////////////////////////////////////////////////

    const posts = await Post.findAll({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: Member,
        },
        {
          model: Attachment,
        },
      ],

      order: [['createdAt', 'DESC']], // DESC는 내림차순, ASC는 오름차순
    });

    res.json(posts);
  } catch (e) {
    console.error(e);

    next(e);
  }
});

module.exports = router;
