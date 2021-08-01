// 포스트 view 페이지

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
// reactstrap components
import { Card, CardBody, CardHeader, Container, Row, Col } from 'reactstrap';

const Post = ({ post }) => {
  // 내 아이디 값 불러오는...건데
  // ? user reducer가 없으니까 어떻게 불러올지는 나중에 수정하자
  // const id = useSelector((state) => state.user.me?.id);
  const { postList, title, contents } = useSelector((state) => state.post);
  console.log(postList.contents);
  return (
    <>
      {/* 배경 백그라운드 이미지로 까는거 잊지 말기 */}
      <div className='header postViewWrap pb-8 pt-md-6'>
        {/* <PostBg /> */}
        <Container className='mt--7' fluid>
          <Row>
            <Col className='mb-5 mb-xl-0' xl='12'>
              <Card className='shadow'>
                {}
                <CardHeader className='bg-transparent'>
                  <Row className='align-items-center postHeader pl-3 pr-3'>
                    <h3>{title}</h3>
                    <div>
                      <button class='btn btn-secondary'>목록</button>
                      <button class='btn btn-primary'>수정</button>
                      <button class='btn btn-danger'>삭제</button>
                      {/* 공유 다이어리에선 작성자만 수정가능하도록 처리해주는거 잊지 않기... */}
                      {/* {id && post.Member.id === id ? (
                        <>
                          <button class='btn btn-primary'>수정</button>
                          <button class='btn btn-danger'>삭제</button>
                        </>
                      ) : null} */}
                    </div>
                  </Row>
                </CardHeader>
                <CardBody>
                  {/* Chart */}
                  <div>
                    <p>{contents}</p>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Post;
