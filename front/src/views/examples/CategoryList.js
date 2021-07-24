import React from 'react';
import { Card, Container, Row, Col } from 'reactstrap';

const CategoryList = () => {
  return (
    <div className='header pb-8 pt-2 pt-md-7'>
      <Container fluid>
        <button class='btn btn-primary mb-4' type='button'>
          Add Category
        </button>
      </Container>

      <Container fluid>
        <div
          className='mb-4 noticeMent'
          style={{
            padding: '.5em 1em',
            backgroundColor: '#ffffff',
            borderRadius: '10px',
          }}
        >
          <h3 style={{ lineHeight: '1.5em', marginBottom: '0' }}>
            Please record your trip. 😘
          </h3>
        </div>
        <div className='header-body'>
          {/* Card stats */}
          <Row>
            <Col lg='6' xl='4' className='postWrap'>
              <Card className='card-stats mb-4 mb-xl-0'>
                <div className='imageThumbnail'>
                  <img
                    alt='...'
                    src={
                      require('../../assets/img/theme/team-4-800x800.jpg')
                        .default
                    }
                  />
                </div>
              </Card>
              <p>와 진짜 너무 졸리다....꿈나라 여행 간 후기</p>
            </Col>
            <Col lg='6' xl='4' className='postWrap'>
              <Card className='card-stats mb-4 mb-xl-0'>
                <div className='imageThumbnail'>
                  <img
                    alt='...'
                    src={
                      require('../../assets/img/theme/team-4-800x800.jpg')
                        .default
                    }
                  />
                </div>
              </Card>
              <p>와 진짜 너무 졸리다....꿈나라 여행 간 후기</p>
            </Col>
            <Col lg='6' xl='4' className='postWrap'>
              <Card className='card-stats mb-4 mb-xl-0'>
                <div className='imageThumbnail'>
                  <img
                    alt='...'
                    src={
                      require('../../assets/img/theme/team-4-800x800.jpg')
                        .default
                    }
                  />
                </div>
              </Card>
              <p>와 진짜 너무 졸리다....꿈나라 여행 간 후기</p>
            </Col>
          </Row>
        </div>
      </Container>

      {/* 유저가 아무런 카테고리를 작성하지 않았을 때 */}
      <Container className='firstPostWrap'>
        <div>
          <p>첫 여행 일기를 작성해주세요</p>
          <p>🛫</p>
        </div>
      </Container>
    </div>
  );
};

export default CategoryList;
