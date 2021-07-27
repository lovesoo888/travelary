import React, { useState, useCallback } from 'react';
import { Container, Form } from 'reactstrap';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const PostCreate = () => {
  // 데이터 담는 함수
  const useInput = () => {
    const initialValue = null;
    const [value, setValue] = useState(initialValue);
    const handler = useCallback((e) => {
      setValue(e.target.value);
    }, []);
    console.log(value);
    return [value, handler, setValue];
  };

  const [title, onChangeTitle, thumbnailImg] = useInput('');

  // 제목 입력

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
                className='form-control'
                placeholder='제목을 입력해주세요'
                onChange={onChangeTitle}
                value={title}
              ></input>
            </dd>
          </dl>
          <dl>
            <dt>게시글 작성</dt>
            <dd className='mt-2'>
              <CKEditor
                editor={ClassicEditor}
                data='<p>내용을 입력해주세요</p>'
                onReady={(editor) => {
                  // You can store the "editor" and use when it is needed.
                  console.log('Editor is ready to use!', editor);
                }}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  console.log({ event, editor, data });
                }}
                onBlur={(event, editor) => {
                  console.log('Blur.', editor);
                }}
                onFocus={(event, editor) => {
                  console.log('Focus.', editor);
                }}
              />
            </dd>
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
                  value={thumbnailImg}
                />
                <label
                  className='custom-file-label inputStyle'
                  for='customFileLang'
                >
                  대표 섬네일 이미지를 선택해주세요
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
          <div>
            <button class='btn btn-primary'>Submit</button>
          </div>
        </Form>
      </Container>
    </div>
  );
};

export default PostCreate;
