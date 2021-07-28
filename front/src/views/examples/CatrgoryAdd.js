// 카테고리 추가 페이지

import React, { useState, useCallback, useRef } from 'react';
import { Card, Container, Row, Col, Form } from 'reactstrap';

import { useDispatch, useSelector } from 'react-redux';
import { addCategory } from 'reducer/post';

import CategoryList from './CategoryList';

const CatrgoryAdd = () => {
  // 데이터 담는 함수
  const dispatch = useDispatch();

  const { imagePaths } = useSelector((state) => state.post);
  const [title, setTitle] = useState('');

  const onChangeTitle = useCallback((e) => {
    setTitle(e.target.value);
  }, []);

  const onSubmit = useCallback((e) => {
    e.preventDefault();
    dispatch(addCategory);
    setTitle('');
  }, []);

  return (
    <div className='pb-8 pt-2 pt-md-7 categoryAddWrap'>
      <Container fluid>
        <Row className='addWrap'>
          <Col lg='6' xl='12' className='postWrap'>
            <Card className='card-stats mb-4 mb-xl-0 pt-6 pb-6'>
              <h4 className='mb-6'>당신의 여행 카테고리를 추가해주세요 :)</h4>
              <Form encType='multipart/form-data' onSubmit={onSubmit}>
                <ul>
                  <li>
                    <label>Category Title</label>
                    <input
                      type='text'
                      className='form-control inputStyle'
                      placeholder='Category Title'
                      name='title'
                      value={title}
                      onChange={onChangeTitle}
                    ></input>
                  </li>
                  <li className='mt-5'>
                    <span>Thumbnail Image</span>
                    <div className='custom-file'>
                      <input
                        type='file'
                        className='custom-file-input'
                        id='customFileLang'
                        lang='en'
                        name='thumnailImg'
                      />
                      <label
                        className='custom-file-label inputStyle'
                        for='customFileLang'
                      >
                        Select file
                      </label>
                    </div>
                    <div className='imageThumbnail mt-3'>
                      {imagePaths.map((v) => (
                        <div key={v}>
                          <img src={v} alt={v} />
                          <div>
                            <button
                              type='button'
                              class='btn btn-default'
                              // onClick={onCategoryAdd}
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </li>
                </ul>
                <div className='btnWrap mt-5'>
                  <button
                    class='btn btn-default'
                    type='submit'
                    // onClick={onCategoryAdd}
                  >
                    Category Add
                  </button>
                </div>
              </Form>
            </Card>
          </Col>
        </Row>
      </Container>
      {/* <CategoryList /> */}
    </div>
  );
};

export default CatrgoryAdd;
