const express = require('express');

const { PostCategory, Post } = require('../models');

const router = express.Router();

router.post('/:postCategoryId/post', async (req, res, next) => {
  try {
    const category = await PostCategory.findeOne({
      where: { id: req.params.postCategoryId },
    });
    if (!category) {
      return res.status(403).send('카테고리가 존재하지 않습니다.');
    }
    const post = await PostCategory.create({
      title: req.body.title,
      content: req.body.content,
      CategoryId: req.params.postCategoryId,
    });
    res.status(201).json(post);
  } catch (error) {
    console.error(error);
    next(error);
  }
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
