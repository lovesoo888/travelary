import axios from 'axios';
import { all, fork, put, delay, takeLatest } from 'redux-saga/effects'; // saga 이펙트
import {
  ADD_CATEGORY_SUCCESS,
  ADD_CATEGORY_REQUEST,
  ADD_CATEGORY_FAILURE,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  ADD_POST_FAILURE,
} from '../reducer/post';

// ! API 는 제네레이터 함수를 사용하지 않는다.
// Step 2. 데이터를 api 로 보내준다.
function categoryAPI(data) {
  // 실제 서버에 요청을 보냄
  return axios.post('/api/category', data);
}

// Step 1. action에서 데이터 보내서
function* addCategory(action) {
  // 요청이 실패했을 때를 대비해서 try catch로 받아준다.
  // 성공 결과 : result.data
  // 실패 결과 : err.response.data
  console.log('saga AddCategory');
  try {
    // ? 근데 아직 서버 연동을 안해주었으니 api를 불러오면 에러가 뜬다 나중에 수정해주자.
    // const result = yield call(categoryAPI, action.data); // 서버에 api 요청한 결과 값을 받는다.
    // call(categoryAPI, action.data) -> categoryAPI(action.data) 라고 보면 된다.
    yield delay(1000); // 서버 연동이 안된 상태에선 딜레이 이펙트를 준다.
    // 아직 데이터가 없으니 비동기적인 효과를 주는 것이다.
    yield put({
      // put: dispatch 라고 생각해라
      type: ADD_CATEGORY_SUCCESS,
      // data: result.data,
      data: action.data, //ADD_CATEGORY_REQUEST 에서 보낸 데이터를 바로 SUCCESS로 보냄
    });
  } catch (err) {
    yield put({
      type: ADD_CATEGORY_FAILURE,
      data: err.response.data,
    });
  }
}

function postAPI(data) {
  return axios.post('/api/post', data);
}

function* addPost(action) {
  try {
    yield put({
      type: ADD_POST_REQUEST,
    });
    // const result = yield call(postAPI, action.data);
    yield delay(1000);
    yield put({
      type: ADD_POST_SUCCESS,
      // data: result.data,
      data: action.data,
    });
  } catch (err) {
    yield put({
      type: ADD_POST_FAILURE,
      data: err.response.data,
    });
  }
}

// 비동기 액션 생성 함수
function* watchAddCategory() {
  // take : ADD_CATEGORY_REQUEST (해당)액션이 실행되기 까지 기다리겠다.
  // take: 단, 한번밖에 받지 않는다. 한번 실행하면 이벤트 리스너가 사라져버린다. (게시글을 하나밖에 못씀)
  // ADD_CATEGORY_REQUEST 액션이 실행되면 addCategory 함수가 실행된다. (상단에 있음)
  // 그래서 무한하게 실행되도록 while(true)문을 감싸서 사용한다. 원래 자바스크립트에선 금지된...코드지만 (무한실행때문에)
  // 제네레이터 함수는 next() 로 다음 함수를 실행하기 때문에 써도 ok -> 하지만 직관적이지 않으니까
  // 비동기 방식으로 작동하는 takeEvery를 사용한다. (while문 대체)
  // 근데 takeEvery는 두번클릭,세번클릭하면 두번,세번이 전부 실행이 된다.
  // 그래서 takeLatest 를 사용한다. 여러번 요청을 보내도 앞에거 다 무시하고 마지막것만 실행된다. (어휴..) -> 근데 프론트에서만 그렇게 인식한다
  // 응답은 완료된것 하나 외에는 다 무시하지만, 요청은 무시되지 않는다는 소리 그래서 서버쪽에서 데이터 중복 검사를 따로 해주어야한다.
  yield takeLatest(ADD_CATEGORY_REQUEST, addCategory);
}

function* watchAddPost() {
  yield takeLatest(ADD_POST_REQUEST, addPost);
}

export default function* postSaga() {
  yield all([fork(watchAddCategory), fork(watchAddPost)]);
}
