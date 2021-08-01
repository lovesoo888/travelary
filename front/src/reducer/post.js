import shortId from 'shortid';
import produce from 'immer';
import faker from 'faker';

// 초기 설정
export const initialState = {
  categoryList: [],
  postList: [
    {
      id: 1,
      categoryCode: 1, // 공유/개인 인지 확인
      Member: {
        id: 1,
        nickname: '테스터',
      },
      title: '발리에서 생긴일 part.1',
      contents: '으음',
      ThumnailImg: {
        src: 'http://www.travelnbike.com/news/photo/201903/77604_141293_4837.png',
      },
    },
  ],
  poseView: [],
  categoryCode: 1, // 공유/개인 인지 확인
  ImagePaths: [], // 이미지 업로드할때 이미지 경로 저장
  hasMoreCategory: true, // 카테고리가 없어졌을때
  loadCategoryLoading: false, // 포스트 추가시 로딩
  loadCategoryDone: false,
  loadCategoryError: false,
  addPostLoading: false, // 포스트 추가시 로딩
  addPostDone: false,
  addPostError: false,
  addCategoryLoading: false, // 카테고리 추가시 로딩
  addCategoryDone: false,
  addCategoryError: false,
  removeCategoryLoading: false, // 카테고리 삭세시 로딩
  removeCategoryDone: false,
  removeCategoryError: false,
  removePostLoading: false, // 포스트 삭제시 로딩
  removePostDone: false,
  removePostError: false,
};

export const generateDummyCategory = (number) =>
  Array(9)
    .fill()
    .map(() => ({
      id: shortId.generate(),
      ThumnailImg: {
        src: faker.image.image(),
      },
      Member: {
        id: shortId.generate(),
        nickname: faker.name.findName(),
      },
      title: faker.lorem.text(),
    }));

//? 액션 함수 시작
// 카테고리 추가
// 액션 타입을 상수로 빼준 이유 : 오타방지
export const LOAD_CATEGORY_REQUEST = 'LOAD_CATEGORY_REQUEST';
export const LOAD_CATEGORY_SUCCESS = 'LOAD_CATEGORY_SUCCESS';
export const LOAD_CATEGORY_FAILURE = 'LOAD_CATEGORY_FAILURE';
export const ADD_CATEGORY_REQUEST = 'ADD_CATEGORY_REQUEST';
export const ADD_CATEGORY_SUCCESS = 'ADD_CATEGORY_SUCCESS';
export const ADD_CATEGORY_FAILURE = 'ADD_CATEGORY_FAILURE';
export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';
export const SHARE_CATEGORY_REQUEST = 'SHARE_CATEGORY_REQUEST';
export const SHARE_CATEGORY_SUCCESS = 'SHARE_CATEGORY_SUCCESS';
export const SHARE_CATEGORY_FAILURE = 'SHARE_CATEGORY_FAILURE';

// 카테고리, 게시글 삭제시 액션..
export const REMOVE_CATEGORY_REQUEST = 'REMOVE_CATEGORY_REQUEST';
export const REMOVE_CATEGORY_SUCCESS = 'REMOVE_CATEGORY_SUCCESS';
export const REMOVE_CATEGORY_FAILURE = 'REMOVE_CATEGORY_FAILURE';
export const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST';
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS';
export const REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE';

// 액션 타입 불러오기, 나중에 컴포넌트에서 onSubmit 같은 액션으로 해당 타입액션을 불러와준다.
export const addCategoryAction = (data) => ({
  type: ADD_CATEGORY_REQUEST,
  data,
});

export const addPostAction = (data) => ({
  type: ADD_POST_REQUEST,
  data,
});

const dummyCategory = (data) => ({
  //아직 게시글 저장을 하지 못해서 테스트로 넣어보는 데이터
  id: data.id,
  title: data.title,
  Member: {
    id: 1,
    nickname: '테스터',
  },
  ThumnailImg: {
    src: 'https://post-phinf.pstatic.net/MjAxODAxMDhfMTA2/MDAxNTE1NDAyOTM1NzMw.6AVV-NKg21QLqsVY6S1HV-lMOoO5JoFqevouh2Jwp9Ug.1pvMx529vfdUddfAxx54V1xriC-PMjud1zcxt1OfjY8g.PNG/2018-01-08_18%3B12%3B38.PNG?type=w1200',
  },
});

const dummyPostList = (data) => ({
  id: shortId.generate(),
  Member: {
    id: 1,
    nickname: '테스터',
  },
  title: data.title,
  contents: data.contents,
  ThumnailImg: {
    src: 'http://www.travelnbike.com/news/photo/201903/77604_141293_4837.png',
  },
});

// 리듀서 함수
// 이전 상태를 액션을 통해 다음 상태로 만들어 내는 함수(불변성 지키면서)
const reducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case LOAD_CATEGORY_REQUEST:
        draft.loadCategoryLoading = true;
        draft.loadCategoryDone = false;
        draft.loadCategoryError = null;
        break;
      case LOAD_CATEGORY_SUCCESS:
        draft.loadCategoryLoading = false;
        draft.loadCategoryDone = true;
        draft.categoryList = action.data.concat(draft.categoryList);
        draft.hasMoreCategory = draft.categoryList.length < 50;
        break;
      case LOAD_CATEGORY_FAILURE:
        draft.loadCategoryLoading = false;
        draft.loadCategoryError = action.error;
        break;
      case ADD_CATEGORY_REQUEST:
        draft.addCategoryLoading = true;
        draft.addCategoryDone = false;
        draft.addCategoryError = null;
        break;
      case ADD_CATEGORY_SUCCESS:
        draft.addCategoryLoading = false;
        draft.addCategoryDone = true;
        draft.categoryList.unshift(dummyCategory(action.data));
        break;
      case ADD_CATEGORY_FAILURE:
        draft.addCategoryLoading = false;
        draft.addCategoryError = action.error;
        break;
      case ADD_POST_REQUEST:
        draft.addPostLoading = true;
        draft.addPostDone = false;
        draft.addPostError = null;
        break;
      case ADD_POST_SUCCESS:
        draft.addPostLoading = false;
        draft.addPostDone = true;
        draft.postList = [dummyPostList(action.data), ...state.postList];
        break;
      case ADD_POST_FAILURE:
        draft.addPostLoading = false;
        draft.addPostError = action.error;
        break;
      case REMOVE_CATEGORY_REQUEST:
        draft.removeCategoryLoading = true;
        draft.removeCategoryDone = false;
        draft.removeCategoryError = null;
        break;
      case REMOVE_CATEGORY_SUCCESS:
        draft.removeCategoryLoading = false;
        draft.removeCategoryDone = true;
        draft.categoryList = draft.categoryList.filter(
          (v) => v.id !== action.data
        );
        break;
      case REMOVE_CATEGORY_FAILURE:
        draft.removeCategoryLoading = false;
        draft.removeCategoryError = action.error;
        break;
      case REMOVE_POST_REQUEST:
        draft.removePostLoading = true;
        draft.removePostDone = false;
        draft.removeCategoryError = null;
        break;
      case REMOVE_POST_SUCCESS:
        draft.removePostLoading = false;
        draft.removePostDone = true;
        draft.postList = draft.categoryList.filter((v) => v.id === action.data);
        break;
      case REMOVE_POST_FAILURE:
        draft.removePostLoading = false;
        draft.removePostError = action.error;
        break;
      default:
        break;
    }
  });

export default reducer;
