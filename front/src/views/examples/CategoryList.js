import React from 'react';
import { Card, Container, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';

const CategoryList = () => {
  return (
    <div className='header pb-8 pt-2 pt-md-7'>
      <Container fluid>
        <Link to='/admin/post/list'>
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
            <Col lg='6' xl='4' className='postWrap'>
              <Card className='card-stats mb-4 mb-xl-0'>
                <Link to='/admin/post/list'>
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
              <Link to='/admin/post/list'>
                <p>와 진짜 너무 졸리다....꿈나라 여행 간 후기</p>
              </Link>
            </Col>
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
