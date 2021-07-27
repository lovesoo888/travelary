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
import axios from 'axios';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

const Register = () => {
  const [member, setMember] = useState({
    userName: '',
    userPwd: '',
    email: '',
    birthday: '',
  });

  const history = useHistory();
  const [passwordConfirm, setPasswordConfirm] = useState({
    check: false,
    value: '',
  });

  // 이메일 유효성 검사 -> 이메일 인증으로 대체?
  // const checkEmail = (e) => {
  //   var regExp =
  //     /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
  // 형식에 맞는 경우 true 리턴
  //   console.log('이메일 유효성 검사 :: ', regExp.test(e.target.value));
  // };

  const onMemberChange = (e) => {
    setMember({ ...member, [e.target.name]: e.target.value });
    // console.log(member.userPwd);
    // 비밀번호 유효성 검사
    const regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,15}$/;
    setPasswordConfirm({
      ...passwordConfirm,
      check: regExp.test(e.target.value),
      value: e.target.value,
    });

    if (e.target.name === 'userPwd') {
      let passinfo = document.querySelector('.passinfo');
      let password = e.target.value;
      let passCheck = regExp.test(password);

      if (password === '') {
        passinfo.innerText = '';
        return;
      }

      if (passCheck) {
        passinfo.classList.add('text-success');
        passinfo.classList.remove('text-muted');
        passinfo.innerText = 'strong';
      } else {
        passinfo.classList.add('text-muted');
        passinfo.classList.remove('text-success');
        passinfo.innerText = 'week';
      }
    }
  };

  // 로그인 여부 체크 - 로긴 안했으면 로긴페이지로 이동시키기
  // const isLogin = isMemberLogined();
  // if (isLogin == false) {else
  //   history.push('/member/login');
  // }

  const onRegister = () => {
    axios
      .post('http://localhost:3003/member/register', member)
      .then((res) => {
        console.log('데이터 처리결과:', res.data);
        alert('Welcome! Please Sign In.');
        history.push('/auth/login');
      })
      .catch(() => {});
  };

  return (
    <>
      <Col lg='6' md='8'>
        <Card className='bg-secondary shadow border-0'>
          <CardHeader className='bg-transparent pb-5'>
            <div className='text-muted text-center mt-2 mb-4'>
              <small>Sign up with</small>
            </div>
            <div className='text-center'>
              <Button
                className='btn-neutral btn-icon mr-4'
                color='default'
                href='#pablo'
                onClick={(e) => e.preventDefault()}
              >
                <span className='btn-inner--icon'>
                  <img
                    alt='...'
                    src={
                      require('../../assets/img/icons/common/github.svg')
                        .default
                    }
                  />
                </span>
                <span className='btn-inner--text'>Github</span>
              </Button>
              <Button
                className='btn-neutral btn-icon'
                color='default'
                href='#pablo'
                onClick={(e) => e.preventDefault()}
              >
                <span className='btn-inner--icon'>
                  <img
                    alt='...'
                    src={
                      require('../../assets/img/icons/common/google.svg')
                        .default
                    }
                  />
                </span>
                <span className='btn-inner--text'>Google</span>
              </Button>
            </div>
          </CardHeader>
          <CardBody className='px-lg-5 py-lg-5'>
            <div className='text-center text-muted mb-4'>
              <small>Or sign up with credentials</small>
            </div>
            <Form role='form'>
              <FormGroup>
                <InputGroup className='input-group-alternative mb-3'>
                  <InputGroupAddon addonType='prepend'>
                    <InputGroupText>
                      <i className='ni ni-hat-3' />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    name='userName'
                    value={member.userName}
                    onChange={onMemberChange}
                    placeholder='Name'
                    type='text'
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className='input-group-alternative mb-3'>
                  <InputGroupAddon addonType='prepend'>
                    <InputGroupText>
                      <i className='ni ni-email-83' />
                    </InputGroupText>
                  </InputGroupAddon>
                  {/* email 중복 검사 넣기 */}
                  <Input
                    name='email'
                    value={member.email}
                    onChange={onMemberChange}
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
                    value={member.userPwd}
                    onChange={onMemberChange}
                    // onKeyUp={checkPassword}
                    placeholder='Password'
                    // placeholder='8 - 10 characters, must contain both letters and numbers'
                    type='password'
                    autoComplete='new-password'
                  />
                </InputGroup>
                <small className='text-muted text-center'>
                  8 - 10 characters, must contain both letters and numbers
                </small>
                <div className='text-muted font-italic'>
                  <small>
                    password strength:
                    {/* <span className='text-success font-weight-700'>strong</span> */}
                    <span className='passinfo font-weight-700'></span>
                  </small>
                </div>
              </FormGroup>
              {/* 비밀번호 확인 */}
              <FormGroup>
                <InputGroup className='input-group-alternative'>
                  <InputGroupAddon addonType='prepend'>
                    <InputGroupText>
                      <i className='ni ni-lock-circle-open' />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder='Password Confirm'
                    type='password'
                    autoComplete='new-password'
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className='input-group-alternative'>
                  <InputGroupAddon addonType='prepend'>
                    <InputGroupText>
                      <i className='ni ni-calendar-grid-58' />
                    </InputGroupText>
                  </InputGroupAddon>
                  {/* date 타입 브라우저 지원문제 예외처리하기 */}
                  <Input
                    name='birthday'
                    value={member.birthday}
                    onChange={onMemberChange}
                    placeholder='Birthday'
                    type='date'
                    autoComplete='new-password'
                  />
                </InputGroup>
              </FormGroup>
              <Row className='my-4'>
                <Col xs='12'>
                  <div className='custom-control custom-control-alternative custom-checkbox'>
                    <input
                      className='custom-control-input'
                      id='customCheckRegister'
                      type='checkbox'
                    />
                    <label
                      className='custom-control-label'
                      htmlFor='customCheckRegister'
                    >
                      <span className='text-muted'>
                        I agree with the{' '}
                        <a href='#pablo' onClick={(e) => e.preventDefault()}>
                          Privacy Policy
                        </a>
                      </span>
                    </label>
                  </div>
                </Col>
              </Row>
              <div className='text-center'>
                <Button
                  onClick={onRegister}
                  className='mt-4'
                  color='primary'
                  type='button'
                >
                  Create account
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

export default Register;
