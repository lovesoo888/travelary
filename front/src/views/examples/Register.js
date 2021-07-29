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

  // ? 비밀번호 확인 인풋을 useState로 상태관리하면 값이 바로 안담김
  // setState는 해당 스코프를 벗어날때 실행됨.
  // useEffect로 나중에 수정하기
  // const [pwdRepeat, setPwdRepeat] = useState('');

  const history = useHistory();

  // 이메일 유효성 검사 -> 이메일 인증으로 대체?
  // const checkEmail = (e) => {
  //   var regExp =
  //     /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
  // 형식에 맞는 경우 true 리턴
  //   console.log('이메일 유효성 검사 :: ', regExp.test(e.target.value));
  // };

  const onMemberChange = (e) => {
    setMember({ ...member, [e.target.name]: e.target.value });

    // 비밀번호 유효성 검사 - 8 ~ 15자 영문, 숫자 조합
    const regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,15}$/;

    if (e.target.name === 'userPwd') {
      let pwdCheck = document.querySelector('.pwdCheck');
      let password = e.target.value;
      let pwdRegExp = regExp.test(password);

      // 아직 아무것도 치지 않았을 때 공백
      if (password === '') {
        pwdCheck.innerText = '';
        return;
      }

      // 유효성 검사 통과 시 초록색으로 strong 뜨기
      if (pwdRegExp) {
        pwdCheck.classList.add('text-success');
        pwdCheck.classList.remove('text-muted');
        pwdCheck.innerText = 'strong';
      } else {
        // 통과 못했을 시 회색으로 week 뜨기
        pwdCheck.classList.add('text-muted');
        pwdCheck.classList.remove('text-success');
        pwdCheck.innerText = 'week';
      }
    }
  };

  // 비밀번호 재확인
  const onPwdRepeatChange = (e) => {
    // 아래 주석 두 줄 : 나중에 useEffect로 수정하기
    // setPwdRepeat(e.target.value);
    // console.log(pwdRepeat);
    let pwdRepeat = e.target.value;
    let pwdCheckIcon = document.querySelector('.pwdCheckIcon');

    if (pwdRepeat === member.userPwd) {
      pwdCheckIcon.classList.add('text-success');
    } else {
      pwdCheckIcon.classList.remove('text-success');
    }
  };

  // 이메일 중복 검사
  const checkEmail = (e) => {
    // 인풋박스에 메일을 적고 마우스를 때는 순간 서버로 조회 요청하기
    const checkEmail = document.querySelector('.checkEmail');
    const emailCheckIcon = document.querySelector('.emailCheckIcon');

    axios
      .post('http://localhost:3003/member/checkEmail', { email: member.email })
      .then((res) => {
        console.log('데이터 처리결과:', res.data);
        if (res.data.code === '200') {
          // 사용 가능한 이메일일 경우
          checkEmail.classList.add('text-success');
          checkEmail.classList.remove('text-muted');
          checkEmail.innerText = 'Email address available';
          emailCheckIcon.classList.add('text-success');
        } else {
          // 이미 사용 중인 이메일일 경우
          checkEmail.classList.add('text-muted');
          checkEmail.classList.remove('text-success');
          checkEmail.innerText = 'Email address already in use';
          emailCheckIcon.classList.remove('text-success');
        }
      })
      .catch(() => {});
  };

  // 로그인 여부 체크 - 로긴 안했으면 로긴페이지로 이동시키기
  // const isLogin = isMemberLogined();
  // if (isLogin == false) {else
  //   history.push('/member/login');
  // }

  // 회원 등록 버튼 실행 함수
  const onRegister = () => {
    // 빈 칸 작성시 알림창으로 알려주기
    if (member.userName === '') {
      alert('Please fill out your name!');
    }
    if (member.email === '') {
      alert('Please fill out your Email address!');
    }

    axios
      .post('http://localhost:3003/member/register', member)
      .then((res) => {
        console.log('데이터 처리결과:', res.data);
        alert('Welcome to Travelary! Please Sign In.');
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
                <InputGroup className='input-group-alternative mb-0'>
                  <InputGroupAddon addonType='prepend'>
                    <InputGroupText>
                      <i className='ni ni-email-83' />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    name='email'
                    value={member.email}
                    onChange={onMemberChange}
                    onBlur={checkEmail}
                    placeholder='Email'
                    type='email'
                    autoComplete='new-email'
                  />
                  <InputGroupAddon addonType='prepend'>
                    <InputGroupText>
                      <i className='ni ni-check-bold emailCheckIcon' />
                    </InputGroupText>
                  </InputGroupAddon>
                </InputGroup>
                {/*//! 이메일 중복 검사 */}
                <small>
                  {/* <span className='text-success font-weight-700'>strong</span> */}
                  <span className='checkEmail font-italic'></span>
                </small>
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
                    placeholder='Password'
                    // placeholder='8 - 15 characters, must contain both letters and numbers'
                    type='password'
                    autoComplete='new-password'
                  />
                </InputGroup>
                <small className='text-muted text-center'>
                  8 - 10 characters, must contain both letters and numbers
                </small>
                <div className='text-muted font-italic'>
                  {/* 비밀번호 유효성 검사 */}
                  <small>
                    password strength:
                    {/* <span className='text-success font-weight-700'>strong</span> */}
                    <span className='pwdCheck font-weight-700'></span>
                  </small>
                </div>
              </FormGroup>
              {/* 비밀번호 재확인 */}
              <FormGroup>
                <InputGroup className='input-group-alternative'>
                  <InputGroupAddon addonType='prepend'>
                    <InputGroupText>
                      <i className='ni ni-lock-circle-open' />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    onChange={onPwdRepeatChange}
                    // value={pwdRepeat}
                    placeholder='Confirm Password'
                    type='password'
                    autoComplete='new-password'
                  />
                  <InputGroupAddon addonType='prepend'>
                    <InputGroupText>
                      <i className='ni ni-check-bold pwdCheckIcon' />
                    </InputGroupText>
                  </InputGroupAddon>
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className='input-group-alternative'>
                  <InputGroupAddon addonType='prepend'>
                    <InputGroupText>
                      <i className='ni ni-calendar-grid-58' />
                    </InputGroupText>
                  </InputGroupAddon>
                  {/* date 타입 브라우저 지원 문제 예외처리하기 */}
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
              {/* <Row className='my-4'>
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
              </Row> */}
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
