import React, { useEffect, useCallback, useState } from 'react';
import { Container, Form } from 'reactstrap';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useDispatch, useSelector } from 'react-redux';

import { addPostAction } from 'reducer/post';
import useInput from 'helpers/useInput';

const PostCreate = () => {
  const dispatch = useDispatch();

  const { imagePaths, addPostDone } = useSelector((state) => state.post);

  const [postContents, setPostContents] = useState({
    title: '',
    contents: '',
    // imagePaths: '',
    // categoryCode: '',
  });

  // 새터함수에 데이터 담기
  // const onChangePosts = useCallback((e) => {
  //   setPostContents({ ...postContents, [e.target.name]: e.target.value });
  //   setPostContents({
  //     ...postContents,
  //     contents: data,
  //   });
  //   console.log(e.target.name, e.target.value);
  // });

  const onChangePosts = useCallback((e) => {
    const { name, value } = e.target;
    setPostContents({
      ...postContents,
      [name]: value,
    });
    console.log(postContents);
  });

  useEffect(() => {
    // 카테고리 추가가 성공하면 인풋창 날리기..아니지 링크 이동?
    if (addPostDone) {
      console.log('post 등록 완료');
    }
  }, [addPostDone]);
  //
  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(addPostAction(postContents));
    },
    [postContents]
  );

  return (
    <div className='pb-8 pt-2 pt-md-7'>
      <Container className='postCreateWrap'>
        <Form onSubmit={onSubmit}>
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
                onChange={onChangePosts}
                value={postContents.title}
                name='title'
              ></input>
            </dd>
          </dl>
          <dl>
            <dt>게시글 작성</dt>
            <dd className='mt-2'>
              <CKEditor
                editor={ClassicEditor}
                // value={postContents.content}
                data=''
                onReady={(editor) => {
                  // You can store the "editor" and use when it is needed.
                  console.log('Editor is ready to use!', editor);
                }}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  console.log(data);
                  setPostContents({
                    ...postContents,
                    contents: data,
                  });
                  console.log(postContents);
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
              <select class='form-control' name='categoryCode'>
                <option value={postContents.categoryCode}>공유 안함</option>
              </select>
            </dd>
          </dl>
          <div>
            <button type='submit' class='btn btn-primary'>
              Submit
            </button>
          </div>
        </Form>
      </Container>
    </div>
  );
};

export default PostCreate;
