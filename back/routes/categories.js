// 카테고리 목록, 포스트 목록 라우터
const express = require('express');
const { Op } = require('sequelize');

const { PostCategory, Member, Attachment, Post } = require('../models');
const router = express.Router({ mergeParams: true });

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
    // const category = await PostCategory.findOne({
    //   where: { id: req.params.id },
    // });
    // console.log('카테고리 입니다!!!!', category);
    // if (!category) {
    //   return res.status(404).send('카테고리가 존재하지 않습니다.!!!!');
    // }
    if (parseInt(req.query.lastId, 9)) {
      // 초기 로딩이 아닐 때
      where.id = { [Op.lt]: parseInt(req.query.lastId, 9) };
    }
    const posts = await Post.findAll({
      // limit: 9,
      // where: {
      //   PostCategoryId: req.params.id,
      // },
      order: [
        ['createdAt', 'DESC'], // 게시글 내림차순
      ],
      include: [
        {
          model: Member,
        },
        {
          model: Attachment,
        },
        {
          model: PostCategory,
        },
      ],
    }); // 모든 게시물 가져온다
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
router.get('/post/:id', async (req, res, next) => {
  // GET /posts
  try {
    const posts = await Post.findOne({
      where: { id: req.params.id },
    }); // 해당 아이디 값을 가진 게시물을 가져온다.
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

module.exports = router;
