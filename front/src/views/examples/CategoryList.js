import React from 'react';
import { Card, Container, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const CategoryList = () => {
  const { categoryList } = useSelector((state) => state.post);

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
              <Col key={post.id} post={post} lg='6' xl='4' className='postWrap'>
                <Card className='card-stats mb-4 mb-xl-0'>
                  <Link to='/admin/post/list'>
                    <div className='imageThumbnail'>
                      <img alt='...' src={post.ThumnailImg.src} />
                    </div>
                  </Link>
                </Card>
                <Link to='/admin/post/list'>
                  <p>{post.title}</p>
                </Link>
              </Col>
            ))}
          </Row>
        </div>
      </Container>

      {/* 유저가 아무런 카테고리를 작성하지 않았을 때 */}
      <Container className='firstPostWrap'>
        <div>
          <p>첫 여행 일기를 작성해주세요</p>
          <span></span>
          <p>🛫</p>
        </div>
      </Container>
    </div>
  );
};

export default CategoryList;
