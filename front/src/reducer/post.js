import produce from 'immer';

// 초기 설정
export const initialState = {
  categoryList: [],
  imagePaths: [],
  categories: {},
};

//? 액션 함수 시작

// 카테고리 추가
export const categoryAdd = (data) => {
  return {
    type: 'ADD_CATEGORY_REQUEST',
    data,
  };
};

// 리듀서 함수
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_CATEGORY_REQUEST':
      return {
        ...state,
        categories: null,
      };
    default:
      return state;
  }
};

export default reducer;
