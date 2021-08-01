// 카테고리 추가 페이지

import React, { useCallback, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { Card, Container, Row, Col, Form } from 'reactstrap';

import { useDispatch, useSelector } from 'react-redux';
import { addCategoryAction, UPLOAD_IMAGES_REQUEST } from 'reducer/post';
import useInput from 'helpers/useInput';

import CategoryList from './CategoryList';

const CatrgoryAdd = () => {
  // 데이터 담는 함수
  const dispatch = useDispatch();
  const history = useHistory();

  const { imagePaths, addCategoryDone } = useSelector((state) => state.post);
  const [categoryName, onChangeTitle, setCategoryName] = useInput('');

  useEffect(() => {
    // 카테고리 추가가 성공하면 인풋창 날리기..아니지 링크 이동?
    if (addCategoryDone) {
      setCategoryName('');
    }
  }, [addCategoryDone]);

  // const onChangeTitle = useCallback((e) => {
  //   setTitle(e.target.value);
  // }, []);

  // 카테고리 추가 액션
  const onSubmit = useCallback(
    (e) => {
      if (!categoryName || !categoryName.trim()) {
        return alert('카테고리명을 작성하세요');
      }
      e.preventDefault();
      dispatch(addCategoryAction(categoryName));
      // history.push('/admin/index');
    },
    [categoryName]
  );

  const imageInput = useRef();

  const onClickImageUpload = useCallback(() => {
    imageInput.current.click();
  }, [imageInput.current]);

  const onChangeImages = useCallback((e) => {
    console.log('images', e.target.files);
    const imageFormData = new FormData();
    [].forEach.call(e.target.files, (f) => {
      imageFormData.append('image', f);
    });
    dispatch({
      type: UPLOAD_IMAGES_REQUEST,
      data: imageFormData,
    });
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
                      name='categoryName'
                      value={categoryName}
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
                        multiple
                        name='thumnailImg'
                        name='image'
                        ref={imageInput}
                        onChange={onChangeImages}
                      />
                      <label
                        className='custom-file-label inputStyle'
                        for='customFileLang'
                        onClick={onClickImageUpload}
                      >
                        Select file
                      </label>
                    </div>
                    <div className='imageThumbnail mt-3'>
                      {/* {imagePaths.map((v) => (
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
                      ))} */}
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
    </div>
  );
};

export default CatrgoryAdd;
