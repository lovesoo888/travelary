import { createWrapper } from 'next-redux-wrapper';
import { applyMiddleware, compose, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

// reducer 불러와서
import reducer from '../reducers';

const configureStore = () => {
  const middlewares = [];
  const enhancer =
    process.env.NODE_ENV === 'production'
      ? compose(applyMiddleware(...middlewares)) // 배포용일때 (dev tool 연결함)
      : composeWithDevTools(applyMiddleware(...middlewares)); //  개발용 (dev tool 연결함)
  // 히스토리가 쌓이면 데이터가 쌓이는거이기 때문에 보안에 취약할 수 있다.

  // createStore로 store 생성
  const store = createStore(reducer, enhancer);
  return store;
};

// 두번째 객체는 옵션 객체인데, 개발 모드일때 디버거 모드를 켜놓는다는 뜻이다.
const wrapper = createWrapper(configureStore, {
  debug: process.env.NODE_ENV === 'development',
});

export default wrapper;
