import React from 'react';
import { Card, Container, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';

const PostList = () => {
  return (
    <div className='header pb-8 pt-2 pt-md-7'>
      <Container fluid>
        <Link to='/admin/post/add'>
          <button class='btn btn-primary mb-4' type='button'>
            Add Post
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
            <Col lg='6' xl='4' className='postWrap'>
              <Card className='card-stats mb-4 mb-xl-0'>
                <Link to='/admin/post/view'>
                  <div className='imageThumbnail'>
                    <img
                      alt='...'
                      src={
                        require('../../assets/img/theme/team-4-800x800.jpg')
                          .default
                      }
                    />
                  </div>
                </Link>
              </Card>
              <Link to='/admin/post/view'>
                <p>오늘 꾼 꿈나라 여행..</p>
              </Link>
            </Col>
          </Row>
        </div>
      </Container>

      {/* 유저가 아무런 카테고리를 작성하지 않았을 때 */}
      <Container className='firstPostWrap'>
        <div>
          <p>꿈나라에서 무슨일이 있었나요?</p>
          <p>🛫</p>
        </div>
      </Container>
    </div>
  );
};

export default PostList;
