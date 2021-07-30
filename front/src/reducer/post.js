import produce from 'immer';

// 초기 설정
export const initialState = {
  categoryList: [
    {
      id: 1,
      categoryCode: 1, // 공유/개인 인지 확인
      Member: {
        id: 1,
        nickname: '테스터',
      },
      title: '발리에서 생긴일 카테고리',
      ThumnailImg: {
        src: 'https://newsroom-prd-data.s3.ap-northeast-2.amazonaws.com/wp-content/uploads/2018/08/b_01.png',
      },
    },
  ],
  postList: [
    {
      id: 1,
      categoryCode: 1, // 공유/개인 인지 확인
      Member: {
        id: 1,
        nickname: '테스터',
      },
      title: '발리에서 생긴일 part.1',
      ThumnailImg: {
        src: 'http://www.travelnbike.com/news/photo/201903/77604_141293_4837.png',
      },
    },
  ],
  title: '발리에서 생긴일 post1',
  contents: ['난 안되겠니~~ 이 세상에서~~'],
  categoryCode: 1, // 공유/개인 인지 확인
  ImagePaths: [], // 이미지 업로드할때 이미지 경로 저장
  categoryAdded: false, // 카테고리 추가가 완료 되면 true로 반환
  addPostLoading: false, // 포스트 추가시 로딩
  addPostDone: false,
  addPostError: false,
  addCategoryLoading: false, // 카테고리 추가시 로딩
  addCategoryDone: false,
  addCategoryError: false,
};

//? 액션 함수 시작

// 카테고리 추가
// 액션 타입을 상수로 빼준 이유 : 오타방지
export const ADD_CATEGORY_REQUEST = 'ADD_CATEGORY_REQUEST';
export const ADD_CATEGORY_SUCCESS = 'ADD_CATEGORY_SUCCESS';
export const ADD_CATEGORY_FAILURE = 'ADD_CATEGORY_FAILURE';
export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';
export const SHARE_CATEGORY_REQUEST = 'SHARE_CATEGORY_REQUEST';
export const SHARE_CATEGORY_SUCCESS = 'SHARE_CATEGORY_SUCCESS';
export const SHARE_CATEGORY_FAILURE = 'SHARE_CATEGORY_FAILURE';

// 액션 타입 불러오기, 나중에 컴포넌트에서 onSubmit 같은 액션으로 해당 타입액션을 불러와준다.
export const addCategoryAction = (data) => ({
  type: ADD_CATEGORY_REQUEST,
  data,
});

export const addPostAction = (data) => ({
  type: ADD_POST_REQUEST,
  data,
});

const dummyCategory = {
  //아직 게시글 저장을 하지 못해서 테스트로 넣어보는 데이터
  id: 2,
  Member: {
    id: 1,
    nickname: '테스터',
  },
  title: '파리의 연인',
  ThumnailImg: {
    src: 'https://post-phinf.pstatic.net/MjAxODAxMDhfMTA2/MDAxNTE1NDAyOTM1NzMw.6AVV-NKg21QLqsVY6S1HV-lMOoO5JoFqevouh2Jwp9Ug.1pvMx529vfdUddfAxx54V1xriC-PMjud1zcxt1OfjY8g.PNG/2018-01-08_18%3B12%3B38.PNG?type=w1200',
  },
};

const dummyPost = {
  id: 2,
  Member: {
    id: 1,
    nickname: '테스터',
  },
  title: '발리에서 생긴일 part2',
  ThumnailImg: {
    src: 'http://www.travelnbike.com/news/photo/201903/77604_141293_4837.png',
  },
};

// 리듀서 함수
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CATEGORY_REQUEST:
      console.log('reducer categoryadd');
      return {
        ...state,
        addCategoryLoading: true,
        addCategoryDone: false,
        addCategoryError: null,
      };
    case ADD_CATEGORY_SUCCESS:
      return {
        ...state,
        // 앞에다 추가를 해주어야 최신글이 위로 주르륵 올라온다 (왼쪽), 기존 리스트의 불변성도 지켜주자
        categoryList: [dummyCategory, ...state.categoryList],
        addCategoryLoading: false,
        addCategoryDone: true,
      };
    case ADD_CATEGORY_FAILURE:
      return {
        ...state,
        addCategoryLoading: false,
        addCategoryError: action.error,
      };
    case ADD_POST_REQUEST:
      return {
        ...state,
        addPostLoading: true,
        addPostDone: false,
        addPostError: null,
      };
    case ADD_POST_SUCCESS:
      return {
        ...state,
        postList: [dummyPost, ...state.postList],
        addPostLoading: false,
        addPostDone: true,
      };
    case ADD_POST_FAILURE:
      return {
        ...state,
        addPostLoading: false,
        addPostError: action.error,
      };
    default:
      return state;
  }
};

export default reducer;
