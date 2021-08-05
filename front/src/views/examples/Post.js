// 포스트 view 페이지

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
// reactstrap components
import { Card, CardBody, CardHeader, Container, Row, Col } from 'reactstrap';
import { useParams } from 'react-router-dom';
import PostBg from 'components/Headers/PostBg';

const Post = () => {
  // 내 아이디 값 불러오는...건데
  // ? user reducer가 없으니까 어떻게 불러올지는 나중에 수정하자
  // const id = useSelector((state) => state.user.me?.id);
  const [postContent, setPostContent] = useState({
    title: '',
    contnet: '',
  });
  const [postIdx, setPostIdx] = useState(0);

  // 파라메터로 전달되는 와일드 카드 변수명으로 전달되는 값을 받아온다.
  const { id } = useParams();
  console.log(id);
  // const { postList } = useSelector((state) => state.post);
  // const { postId } = useParams(postList);
  // console.log('포스트 파람?????????', postId);

  useEffect(() => {
    setPostIdx(id);
    axios
      .get(`/categories/post/${id}`)
      .then((res) => {
        // console.log('백엔드에서 제공된 전체 데이터 구조파악:', res);
        if (res.data.code === '200') {
          //게시글 세터함수를 통해 백엔드에서 전달된 json을 데이터로 갱신한다.
          console.log(res.data.posts);
          setPostContent(res.data.posts);
        } else {
          alert('백엔드 호출 에러 발생');
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <>
      {/* 배경 백그라운드 이미지로 까는거 잊지 말기 */}
      <div
        className='header postViewWrap pb-8 pt-md-6'
        style={{ width: '100%' }}
      >
        <PostBg />
        <Container className='mt--7' fluid>
          <Row>
            <Col className='mb-5 mb-xl-0' xl='12'>
              <Card className='shadow'>
                {}
                <CardHeader className='bg-transparent'>
                  <Row className='align-items-center postHeader pl-3 pr-3'>
                    <h3>{postContent.title}</h3>
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
                    <p>{postContent.content}</p>
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
