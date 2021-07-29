import axios from 'axios';
import { all, fork, call, put, take } from 'redux-saga/effects'; // saga 이펙트

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
  try {
    yield put({
      type: 'ADD_CATEGORY_REQUEST',
    });
    const result = yield call(categoryAPI, action.data); // 서버에 api 요청한 결과 값을 받는다.
    // call(categoryAPI, action.data) -> categoryAPI(action.data) 라고 보면 된다.
    yield put({
      // put: dispatch 라고 생각해라
      type: 'ADD_CATEGORY_SUCCESS',
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: 'ADD_CATEGORY_FAILURE',
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
      type: 'ADD_POST_REQUEST',
    });
    const result = yield call(postAPI, action.data);
    yield put({
      type: 'ADD_POST_SUCCESS',
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: 'ADD_POST_FAILURE',
      data: err.response.data,
    });
  }
}

// 비동기 액션 생성 함수
function* watchAddCategory() {
  // take : ADD_CATEGORY_REQUEST (해당)액션이 실행되기 까지 기다리겠다.
  // ADD_CATEGORY_REQUEST 액션이 실행되면 addCategory 함수가 실행된다. (상단에 있음)
  yield take('ADD_CATEGORY_REQUEST', addCategory);
}

function* watchAddPost() {
  yield take('ADD_POST_REQUEST', addPost);
}

// generator 함수 사용 function*
export default function* rootSaga() {
  // all은 배열을 받고 배열 안에 있는 것들을 모두 동시에 실행시켜준다.
  // fork : 비동기 함수 호출, 호출이 끝나기 전에 바로 다음꺼 실행중
  // call : 동기 함수 호출, then 안에서 함수를 실행시킨다고 생각
  yield all([fork(watchAddCategory), fork(watchAddPost)]);
}
