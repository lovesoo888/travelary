import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Container, Row, Col } from 'reactstrap';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LOAD_POST_REQUEST } from 'reducer/post';

const PostList = ({ post }) => {
  const { categoryList, hasMorePost, loadPostLoading } = useSelector(
    (state) => state.post
  );

  const history = useHistory();

  // const dispatch = useDispatch();
  // const { postList, hasMorePost, loadPostLoading } = useSelector(
  //   (state) => state.post
  // );
  // useEffect(() => {
  //   dispatch({
  //     type: LOAD_POST_REQUEST,
  //     id,
  //   });
  // }, []);

  // useEffect(() => {
  //   function onScroll() {
  //     if (
  //       window.pageYOffset + document.documentElement.clientHeight >
  //       document.documentElement.scrollHeight - 300
  //     ) {
  //       if (hasMorePost && !loadPostLoading) {
  //         const lastId = postList[postList.length - 1]?.id;
  //         dispatch({
  //           type: LOAD_POST_REQUEST,
  //           lastId,
  //         });
  //       }
  //     }
  //   }
  //   window.addEventListener('scroll', onScroll);
  //   return () => {
  //     window.removeEventListener('scroll', onScroll);
  //   };
  // }, [hasMorePost, loadPostLoading, postList]);

  const [postList, setPostList] = useState([]);
  const { id } = useParams();
  // const lastId = postList[postList.length - 1]?.id;
  const lastId = 0;

  useEffect(() => {
    axios
      .get(`/categories/${id}`)
      .then((res) => {
        console.log('백엔드에서 제공된 전체 데이터 구조 파악', res);
        // console.log('PostCategoryId ??', res.data.posts[i].PostCategoryId);
        if (res.data.code === '200') {
          //code가 서버에서 data에 담겨서 옮...
          // 게시글 목록 세터함수를 통해 백엔드에서 전달된 json 배열을 데이터로 목록을 갱신한다.
          setPostList(res.data.posts);
          console.log(res.data);
        } else {
          alert('백엔드 호출 에러 발생');
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  if (postList.length >= 1) {
    return (
      <div className='header pb-8 pt-2 pt-md-7'>
        <Container fluid>
          <Link to={`/admin/${id}/post/add`}>
            {/* <Link to={`/admin/post/add`}> */}
            <button className='btn btn-primary mb-4' type='button'>
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
              {/* const categoryId = window.location.href.split("/").reverse()[0] 와 같이 
              url 일부분 가져와서 카테고리 파람과 같은 postCategoryId 가지고 있는 게시물만 뿌려주기 */}
              {postList.map((post) => {
                const categoryId = window.location.href.split('/').reverse()[0];
                if (categoryId == post.PostCategoryId) {
                  return (
                    <Col key={post.id} lg='6' xl='4' className='postWrap'>
                      <Card className='card-stats mb-4 mb-xl-0'>
                        <Link to={`/admin/post/${post.id}`}>
                          <div className='imageThumbnail'>
                            <img
                              alt='...'
                              src={`http://localhost:3003/${post.thumbnail}`}
                            />
                          </div>
                        </Link>
                      </Card>
                      <Link to='/admin/post/view'>
                        <p>{post.title}</p>
                      </Link>
                    </Col>
                  );
                }
              })}
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
          <Link to={`/admin/${id}/post/add`}>
            <button className='btn btn-primary mb-4' type='button'>
              Add Post
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

export default PostList;
