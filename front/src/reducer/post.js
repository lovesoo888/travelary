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
  imagePaths: [], // 이미지 업로드할때 이미지 경로 저장
  categoryAdded: false, // 카테고리 추가가 완료 되면 true로 반환
  postAdded: false,
};

//? 액션 함수 시작

// 카테고리 추가
// 액션 타입을 상수로 빼준 이유 : 오타방지
const ADD_CATEGORY = 'ADD_CATEGORY';
const ADD_POST = 'ADD_POST';

// 액션 타입 불러오기, 나중에 컴포넌트에서 onSubmit 같은 액션으로 액션을 불러와준다.
export const addCategory = {
  type: ADD_CATEGORY,
};

export const addPost = {
  type: ADD_POST,
};

const dummyCategory = {
  //아직 게시글 저장을 하지 못해서 테스트로 넣어보는 데이터
  id: 2,
  User: {
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
    case ADD_CATEGORY:
      return {
        ...state,
        // 앞에다 추가를 해주어야 최신글이 위로 주르륵 올라온다 (왼쪽), 기존 리스트의 불변성도 지켜주자
        categoryList: [dummyCategory, ...state.categoryList],
        categoryAdded: true,
      };
    case ADD_POST:
      return {
        ...state,
        postList: [dummyPost, ...state.postList],
        postAdded: true,
      };
    default:
      return state;
  }
};

export default reducer;
