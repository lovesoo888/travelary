// 초기 설정
export const initialState = {
  profilePicUpdate: false,
  token: '',
  loginMember: {},
};

// 액션 타입 정의
//회원 정보 수정 정보 확인
export const IS_PROFILE_CHANGED = 'IS_PROFILE_CHANGED';
//로그인 사용자의 토큰정보를 전역데이터로 관리
export const MEMBER_LOGIN_TOKEN = 'MEMBER_LOGIN_TOKEN';
//로그인 한 사용자 정보를 전역 데이터로 관리
export const MEMBER_LOGIN_UPDATE = 'MEMBER_LOGIN_UPDATE';

// 액션 함수
export const isProfileChanged = (data) => ({
  type: IS_PROFILE_CHANGED,
  profilePicUpdate: data,
});
export const memberLoginToken = (token) => ({
  type: MEMBER_LOGIN_TOKEN,
  token: token,
});
export const memberLoginUpdate = (member) => ({
  type: MEMBER_LOGIN_UPDATE,
  member,
});

// 리듀서 함수
function member(state = initialState, action) {
  switch (action.type) {
    case IS_PROFILE_CHANGED:
      return { ...state, profilePicUpdate: action.profilePicUpdate };
    case MEMBER_LOGIN_TOKEN:
      return { ...state, token: action.token };
    case MEMBER_LOGIN_UPDATE:
      return { ...state, loginMember: action.member };
    default:
      return state;
  }
}

export default member;
