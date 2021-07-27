import React from 'react';
import { Container, Form } from 'reactstrap';

const PostCreate = () => {
  return (
    <div className='pb-8 pt-2 pt-md-7'>
      <Container className='postCreateWrap'>
        <Form>
          <dl>
            <dt>Category Name</dt>
            <dd className='mt-2'>유럽에서 한달살기</dd>
          </dl>
          <dl>
            <dt> * Title : </dt>
            <dd className='mt-2'>
              <input
                type='text'
                class='form-control'
                placeholder='Default input'
              ></input>
            </dd>
          </dl>
          <dl>
            <dt>게시글 작성</dt>
            <dd className='mt-2'></dd>
          </dl>
          <dl>
            <dt>
              대표 이미지
              <br />
              (섬네일 이미지)
            </dt>
            <dd className='mt-2'>
              <div className='custom-file'>
                <input
                  type='file'
                  className='custom-file-input'
                  id='customFileLang'
                  lang='en'
                />
                <label
                  className='custom-file-label inputStyle'
                  for='customFileLang'
                >
                  Select file
                </label>
              </div>
              <div className='imageThumbnail mt-3'>
                <img
                  src='https://newsroom-prd-data.s3.ap-northeast-2.amazonaws.com/wp-content/uploads/2018/08/b_01.png'
                  alt=''
                />
              </div>
            </dd>
          </dl>
          <dl>
            <dt>공유 카테고리</dt>
            <dd className='mt-2'>
              <select class='form-control'>
                <option>공유 안함</option>
                <option></option>
              </select>
            </dd>
          </dl>
        </Form>
      </Container>
    </div>
  );
};

export default PostCreate;
