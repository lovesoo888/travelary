/*!

=========================================================
* Argon Dashboard React - v1.2.1
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
} from 'reactstrap';

import React, { useState } from 'react';
import axios from 'axios';
// import { useDispatch } from 'react-redux';

const Login = () => {
  const [login, setLogin] = useState({
    email: '',
    userPwd: '',
  });

  // 전역데이터 제어용 디스패치 상수 생성
  // const globalDispatch = useDispatch();

  const onLoginChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const onLogin = () => {
    axios
      .post('http://localhost:3003/member/login', login)
      .then((res) => {
        if (res.data.code === '200') {
          console.log('JWT토큰값:', res.data.data.token);
          console.log('로그인 사용자 정보:', res.data.data.member);

          //토큰값을 웹브라우저 로컬스토리지에 보관하기
          window.localStorage.setItem('jwtToken', res.data.data.token);

          const storageToken = window.localStorage.getItem('jwtToken');
          console.log('브라우저 로컬스토리지에 저장된 토큰:', storageToken);

          //사용자 토큰 발급 후 백엔드 API 호출시 발급된 JWT토큰을
          //Ajax 헤더에 x-access-token 영역에 기본 포함 시켜 백엔드 서비스를 호출하게 한다.
          axios.defaults.headers.common[
            'x-access-token'
          ] = `${res.data.data.token}`;

          //발급된 토큰값을 전역 데이터에 반영한다.
          //globalDispatch(액션생성함수명(액션생성함수에 전달할 데이터));
          //globalDispatch(memberLogin(res.data.data.token));

          alert('정상 로그인 되었습니다.');
        } else {
          //서버측 에러 메시지 출력
          alert(res.data.msg);
        }
      })
      .catch(() => {});
  };

  return (
    <>
      <Col lg='5' md='7'>
        <Card className='bg-secondary shadow border-0'>
          <CardHeader className='bg-transparent pb-2'>
            <div className='text-muted text-center mt-2 mb-3'>
              <big>Login</big>
            </div>
            {/* <div className="btn-wrapper text-center">
              <Button
                className="btn-neutral btn-icon"
                color="default"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
              >
                <span className="btn-inner--icon">
                  <img
                    alt="..."
                    src={
                      require("../../assets/img/icons/common/github.svg")
                        .default
                    }
                  />
                </span>
                <span className="btn-inner--text">Github</span>
              </Button>
              <Button
                className="btn-neutral btn-icon"
                color="default"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
              >
                <span className="btn-inner--icon">
                  <img
                    alt="..."
                    src={
                      require("../../assets/img/icons/common/google.svg")
                        .default
                    }
                  />
                </span>
                <span className="btn-inner--text">Google</span>
              </Button>
            </div> */}
          </CardHeader>
          <CardBody className='px-lg-5 py-lg-5'>
            {/* <div className='text-center text-muted mb-4'>
              <small>Or sign in with credentials</small>
            </div> */}
            <Form role='form'>
              <FormGroup className='mb-3'>
                <InputGroup className='input-group-alternative'>
                  <InputGroupAddon addonType='prepend'>
                    <InputGroupText>
                      <i className='ni ni-email-83' />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    name='email'
                    value={setLogin.email}
                    onChange={onLoginChange}
                    placeholder='Email'
                    type='email'
                    autoComplete='new-email'
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className='input-group-alternative'>
                  <InputGroupAddon addonType='prepend'>
                    <InputGroupText>
                      <i className='ni ni-lock-circle-open' />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    name='userPwd'
                    value={setLogin.userPwd}
                    onChange={onLoginChange}
                    placeholder='Password'
                    type='password'
                    autoComplete='new-password'
                  />
                </InputGroup>
              </FormGroup>
              <div className='custom-control custom-control-alternative custom-checkbox'>
                <input
                  className='custom-control-input'
                  id=' customCheckLogin'
                  type='checkbox'
                />
                <label
                  className='custom-control-label'
                  htmlFor='customCheckLogin'
                >
                  <span className='text-muted'>Remember me</span>
                </label>
              </div>
              <div className='text-center'>
                <Button
                  className='my-4'
                  color='primary'
                  type='button'
                  onClick={onLogin}
                >
                  Sign in
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
        <Row className='mt-3'>
          <Col xs='6'>
            <a
              className='text-muted'
              href='#pablo'
              onClick={(e) => e.preventDefault()}
            >
              <small>Forgot password?</small>
            </a>
          </Col>
          <Col className='text-right' xs='6'>
            <a
              className='text-muted'
              href='#pablo'
              onClick={(e) => e.preventDefault()}
            >
              <small>Create new account</small>
            </a>
          </Col>
        </Row>
      </Col>
    </>
  );
};

export default Login;
