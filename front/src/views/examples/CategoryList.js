import React, { useCallback, useEffect } from 'react';
import { Card, Container, Row, Col, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import {
  LOAD_CATEGORY_REQUEST,
  REMOVE_CATEGORY_REQUEST,
} from '../../reducer/post';

const CategoryList = ({ post }) => {
  const dispatch = useDispatch();
  const { categoryList, hasMoreCategory, loadCategoryLoading } = useSelector(
    (state) => state.post
  );

  // 카테고리 삭제..
  // const onRemovePost = useCallback(() => {
  //   dispatch({
  //     type: REMOVE_CATEGORY_REQUEST,
  //     data: post.id,
  //   });
  // }, []);

  const onRemovePost = useCallback(() => {
    dispatch({
      type: REMOVE_CATEGORY_REQUEST,
    });
  }, []);

  // 무한 스크롤
  useEffect(() => {
    dispatch({
      type: LOAD_CATEGORY_REQUEST,
      // data: postCategoryId,
    });
  }, []);

  useEffect(() => {
    function onScroll() {
      if (
        window.pageYOffset + document.documentElement.clientHeight >
        document.documentElement.scrollHeight - 300
      ) {
        if (hasMoreCategory && !loadCategoryLoading) {
          const lastId = categoryList[categoryList.length - 1]?.id;
          dispatch({
            type: LOAD_CATEGORY_REQUEST,
            lastId,
          });
        }
      }
    }
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [hasMoreCategory, loadCategoryLoading, categoryList]);

  // 카테고리 deletedAt 이 1인지 0인지 체크 해주자..나중에...
  if (categoryList.length >= 1) {
    return (
      <div className='header pb-8 pt-2 pt-md-7'>
        <Container fluid>
          <Link to='/admin/category/add'>
            <button class='btn btn-primary mb-4' type='button'>
              Add Category
            </button>
          </Link>
        </Container>

        <Container fluid>
          <div className='mb-4 noticeMent'>
            <p>Please record your trip. 😘</p>
          </div>
          <div className='header-body'>
            {/* Card stats */}
            <Row>
              {categoryList.map((post) => (
                <Col
                  key={post.id}
                  post={post}
                  lg='6'
                  xl='4'
                  className='postWrap'
                >
                  <Card className='card-stats mb-4 mb-xl-0'>
                    <Link to={`/admin/categories/${post.id}`}>
                      <div className='imageThumbnail'>
                        <img
                          src={`http://localhost:3003/${post.thumbnail}`}
                          alt={post.thumbnail}
                        />
                      </div>
                    </Link>
                  </Card>
                  <Link to='/admin/post/list'>
                    <p>{post.categoryName}</p>
                  </Link>
                  {/* <Button className='btn btn-danger' onClick={onRemovePost}>
                    삭제
                  </Button> */}
                </Col>
              ))}
            </Row>
          </div>
        </Container>
      </div>
    );
  } else {
    return (
      <div className='header pb-8 pt-2 pt-md-7'>
        {/* 유저가 아무런 카테고리를 작성하지 않았을 때 */}
        <Container fluid>
          <Link to='/admin/category/add'>
            <button class='btn btn-primary mb-4' type='button'>
              Add Category
            </button>
          </Link>
        </Container>
        <Container className='firstPostWrap'>
          <div>
            <p>첫 여행 일기를 작성해주세요</p>
            <span></span>
            <p>🛫</p>
          </div>
        </Container>
      </div>
    );
  }
};

// CategoryList.propTypes = {
//   post: PropTypes.shape({
//     id: PropTypes.number,
//     Member: PropTypes.object,
//     contents: PropTypes.string,
//     title: PropTypes.string,
//     createAt: PropTypes.object,
//     ThumnailImg: PropTypes.object,
//   }).isRequired,
// };

export default CategoryList;
