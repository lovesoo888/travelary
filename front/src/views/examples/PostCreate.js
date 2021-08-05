import React, { useEffect, useCallback, useState, useRef } from 'react';
import axios from 'axios';
import { Container, Form, Button } from 'reactstrap';
import Quill from 'quill';
import { ImageUploader } from 'quill-image-upload';
import 'react-quill/dist/quill.snow.css';

import { useDispatch, useSelector } from 'react-redux';

import { addPostAction } from 'reducer/post';
import useInput from 'helpers/useInput';
import {
  UPLOAD_IMAGES_REQUEST,
  ADD_POST_REQUEST,
  UPLOAD_POST_IMAGES_REQUEST,
  REMOVE_IMAGE,
} from 'reducer/post';
import { useHistory, useParams } from 'react-router-dom';

const PostCreate = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { addPostDone, imagePaths, categoryList } = useSelector(
    (state) => state.post
  );
  // const [imagePaths, setImagePaths] = useState([]);

  // 퀄 설정
  const quillInstance = useRef(null);
  const quillElement = useRef(null);

  const { id } = useParams();

  // useEffect(() => {
  //   // 카테고리 추가가 성공하면 인풋창 날리기..아니지 링크 이동?
  //   if (addPostDone) {
  //     history.push('admin/categories/');
  //   }
  // }, [addPostDone]);

  const [postContents, setPostContents] = useState({
    title: '',
    content: '',
  });

  const onChangePosts = useCallback((e) => {
    const { name, value } = e.target;
    setPostContents({
      ...postContents,
      [name]: value,
    });
    console.log(postContents);
  });

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
      type: UPLOAD_POST_IMAGES_REQUEST,
      data: imageFormData,
    });
  }, []);

  // const onChangeImages = useCallback((e) => {
  //   console.log('images', e.target.files);
  //   const imageFormData = new FormData();
  //   [].forEach.call(e.target.files, (f) => {
  //     imageFormData.append('image', f);
  //   });
  //   console.log('이미지 폼 데이터 입니다 ==========!!!! ', imageFormData);
  //   axios
  //     .post('/category/post/images', imageFormData)
  //     .then((res) => {
  //       console.log('데이터 처리결과:', res.data);
  //       alert('등록완료');
  //       res.data.setImagePaths(imageFormData);
  //     })
  //     .catch((error) => {
  //       console.log('뭐야!!! ======= ', error);
  //     });
  // }, []);

  const toolbarOptions = {
    container: [
      // [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ align: [] }],
      ['bold', 'italic', 'underline', 'strike'], // toggled buttons
      [{ color: [] }, { background: [] }], // dropdown with defaults from theme
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
      [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
      [{ direction: 'rtl' }], // text direction
      ['blockquote', 'link', 'image'], // media
    ],
  };

  useEffect(() => {
    quillInstance.current = new Quill(quillElement.current, {
      theme: 'snow',
      placeholder: '어떤 여행을 보내셨나요?',
      modules: {
        toolbar: toolbarOptions,
      },
    });
  }, []);

  useEffect(() => {
    // 카테고리 추가가 성공하면 인풋창 날리기..아니지 링크 이동?
    if (addPostDone) {
      console.log('post 등록 완료');
    }
  }, [addPostDone]);
  //
  const onSubmit = useCallback(
    (e) => {
      if (!postContents.title || !postContents.title.trim()) {
        return alert('타이틀을 작성하세요');
      }
      e.preventDefault();
      const formData = new FormData();
      imagePaths.forEach((p) => {
        formData.append('image', p);
      });
      formData.append('title', postContents.title);
      formData.append('content', postContents.content);
      return dispatch({
        type: ADD_POST_REQUEST,
        data: formData,
        id,
      });
    },
    [postContents.title, postContents.content, imagePaths]
  );

  const onRemoveImage = useCallback((index) => () => {
    dispatch({
      type: REMOVE_IMAGE,
      data: index,
    });
  });

  // const onSubmit = () => {
  //   if (postContents.title === '') {
  //     alert('제목을 입력해주세요.');
  //     // inputTitleRef.current.focus();
  //     return false;
  //     //useRef로 포커싱 처리하기
  //   }

  //   if (postContents.contents === '') {
  //     alert('내용을 입력해주세요.');
  //     // inputContentsRef.current.focus();
  //     return false;
  //     //useRef로 포커싱 처리하기
  //   }

  //   axios
  //     .post(`/category/${id}/post`, postContents)
  //     .then((res) => {
  //       console.log('데이터 처리결과:', res.data);
  //       alert('등록완료');
  //       // history.goBack();
  //     })
  //     .catch(() => {});
  // };

  return (
    <div className='pb-8 pt-2 pt-md-7'>
      <Container className='postCreateWrap'>
        <Form encType='multipart/form-data' onSubmit={onSubmit}>
          <dl>
            <dt>Category Name</dt>
            <dd className='mt-2'>{categoryList.categoryName}</dd>
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
          <dl className='mb-4'>
            <dt>게시글 작성</dt>
            <dd className='mt-2'>
              <div>
                <input
                  style={{ height: '400px', backgroundColor: '#ffffff' }}
                  ref={quillElement}
                  value={postContents.content}
                  onChange={onChangePosts}
                  name='content'
                />
              </div>
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
                  name='image'
                  onChange={onChangeImages}
                />
                <label
                  className='custom-file-label inputStyle'
                  for='customFileLang'
                  onClick={onClickImageUpload}
                >
                  대표 섬네일 이미지를 선택해주세요
                </label>
              </div>
              {imagePaths.map((v, i) => (
                <div className='imageThumbnail mt-3'>
                  <div key={v} style={{ display: 'inline-block' }}>
                    <img
                      src={`http://localhost:3003/${v}`}
                      style={{ width: '120px', height: '120px' }}
                      alt={v}
                    />
                  </div>
                  <div className='removeBtnWrap'>
                    <Button onClick={onRemoveImage(i)}>X</Button>
                  </div>
                </div>
              ))}
            </dd>
          </dl>
          {/* <dl>
            <dt>공유 카테고리</dt>
            <dd className='mt-2'>
              <select class='form-control' name='categoryCode'>
                <option value={postContents.categoryCode}>공유 안함</option>
              </select>
            </dd>
          </dl> */}
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
