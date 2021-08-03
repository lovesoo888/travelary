// ! 반응형 사이즈 줄였을 때 나오는 메뉴바 (네비게이션, 프로필...)

/*eslint-disable*/
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink as NavLinkRRD, Link } from 'react-router-dom';
// nodejs library to set properties for components
import { PropTypes } from 'prop-types';

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Collapse,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Media,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col,
} from 'reactstrap';
//각종 유틸리티 함수를 참조한다.
import {
  getJWTToken,
  isMemberLogined,
  getLoginMember,
} from '../../helpers/authUtils';
import axios from 'axios';
import { isProfileChanged } from 'reducer/member';

var ps;

const Sidebar = (props) => {
  // 사용자 정보 초기화
  // const [userName, setUserName] = useState();
  const [loginMember, setLoginMember] = useState({
    userName: '',
    profileImg: '',
  });

  const profilePicUpdate = useSelector(
    (state) => state.member.profilePicUpdate
  );

  const dispatch = useDispatch();

  const [collapseOpen, setCollapseOpen] = useState();
  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName) => {
    return props.location.pathname.indexOf(routeName) > -1 ? 'active' : '';
  };
  // toggles collapse between opened and closed (true/false)
  const toggleCollapse = () => {
    setCollapseOpen((data) => !data);
  };
  // closes the collapse
  const closeCollapse = () => {
    setCollapseOpen(false);
  };
  // creates the links that appear in the left menu / Sidebar
  const createLinks = (routes) => {
    return routes.map((prop, key) => {
      return (
        <NavItem key={key}>
          <NavLink
            to={prop.layout + prop.path}
            tag={NavLinkRRD}
            onClick={closeCollapse}
            activeClassName='active'
          >
            <i className={prop.icon} />
            {prop.name}
          </NavLink>
        </NavItem>
      );
    });
  };

  const { bgColor, routes, logo } = props;
  let navbarBrandProps;
  if (logo && logo.innerLink) {
    navbarBrandProps = {
      to: logo.innerLink,
      tag: Link,
    };
  } else if (logo && logo.outterLink) {
    navbarBrandProps = {
      href: logo.outterLink,
      target: '_blank',
    };
  }

  //사용자 로그아웃 처리 - 로컬 스토리지를 삭제한다.
  const logOut = () => {
    if (window.confirm('Are you sure to log-out?') === true) {
      window.localStorage.removeItem('jwtToken');
      history.push('/auth/login');
    } else {
      return;
    }
  };

  const userEmail = getLoginMember().email;

  // 로딩 시 최초 한 번 실행
  useEffect(() => {
    axios
      .post('http://localhost:3003/member/userProfile', { userEmail })
      .then((res) => {
        setLoginMember({
          ...loginMember,
          profileImg: res.data.data.profileImg,
          userName: res.data.data.userName,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    if (profilePicUpdate) {
      axios
        .post('http://localhost:3003/member/userProfile', { userEmail })
        .then((res) => {
          setLoginMember({
            ...loginMember,
            profileImg: res.data.data.profileImg,
            userName: res.data.data.userName,
          });
          dispatch(isProfileChanged(false));
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [profilePicUpdate]);

  return (
    <Navbar
      className='navbar-vertical fixed-left navbar-light bg-white'
      expand='md'
      id='sidenav-main'
    >
      <Container fluid>
        {/* Toggler */}
        <button
          className='navbar-toggler'
          type='button'
          onClick={toggleCollapse}
        >
          <span className='navbar-toggler-icon' />
        </button>
        {/* Brand */}
        {logo ? (
          <NavbarBrand className='pt-0' {...navbarBrandProps}>
            <span className='logo-default'>Travelary</span>
          </NavbarBrand>
        ) : null}

        {/* 사이드바 프로필 영역 */}
        <Media className='align-items-center avatar-main-wrap'>
          <div
            className='avatar-main avatar-xl rounded-circle'
            style={{
              justifyContent: 'center',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <img
              style={{
                // width: '100%',
                height: '128.28px',
              }}
              alt='...'
              src={
                loginMember.profileImg == null || loginMember.profileImg == ''
                  ? require('../../assets/img/theme/default-avatar.png').default
                  : loginMember.profileImg
              }
            />
          </div>
          <div className='flexbox'>
            <Media className='ml-2 d-lg-block align-items-center'>
              <span className='mb-0 text-ml font-weight-bold'>
                {loginMember.userName}
              </span>
              {/* <span className='mb-0 text-ml font-weight-bold'>UserName</span> */}
            </Media>
            <Nav className='align-items-center d-md-none'>
              <UncontrolledDropdown nav>
                <DropdownToggle nav className='nav-link-icon'>
                  <i className='ni ni-bell-55' />
                </DropdownToggle>
                <DropdownMenu
                  aria-labelledby='navbar-default_dropdown_1'
                  className='dropdown-menu-arrow'
                  right
                >
                  <DropdownItem>Action</DropdownItem>
                  <DropdownItem>Another action</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>Something else here</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              {/* 로그아웃 버튼 */}
              <DropdownToggle nav>
                <i className='ni ni-button-power' onClick={logOut} />
                {/* <span class='badge badge-default'></span> */}
              </DropdownToggle>
            </Nav>
          </div>
        </Media>

        {/* User */}

        {/* Collapse */}
        <Collapse navbar isOpen={collapseOpen}>
          {/* Collapse header */}
          <div className='navbar-collapse-header d-md-none'>
            <Row>
              {logo ? (
                <Col className='collapse-brand' xs='6'>
                  {logo.innerLink ? (
                    <Link to={logo.innerLink}>
                      <img alt={logo.imgAlt} src={logo.imgSrc} />
                    </Link>
                  ) : (
                    <a href={logo.outterLink}>
                      <img alt={logo.imgAlt} src={logo.imgSrc} />
                    </a>
                  )}
                </Col>
              ) : null}
              <Col className='collapse-close' xs='6'>
                <button
                  className='navbar-toggler'
                  type='button'
                  onClick={toggleCollapse}
                >
                  <span />
                  <span />
                </button>
              </Col>
            </Row>
          </div>
          {/* Form */}
          <Form className='mt-4 mb-3 d-md-none'>
            <InputGroup className='input-group-rounded input-group-merge'>
              <Input
                aria-label='Search'
                className='form-control-rounded form-control-prepended'
                placeholder='Search'
                type='search'
              />
              <InputGroupAddon addonType='prepend'>
                <InputGroupText>
                  <span className='fa fa-search' />
                </InputGroupText>
              </InputGroupAddon>
            </InputGroup>
          </Form>
          {/* Navigation */}
          <Nav navbar>{createLinks(routes)}</Nav>

          {/* Navigation */}
          {/* <Nav className='mb-md-3' navbar>
            <NavItem className='active-pro active'>
              <NavLink href='https://www.creative-tim.com/product/argon-dashboard-pro-react?ref=adr-admin-sidebar'>
                <i className='ni ni-spaceship' />
                Upgrade to PRO
              </NavLink>
            </NavItem>
          </Nav> */}
        </Collapse>
      </Container>
    </Navbar>
  );
};

Sidebar.defaultProps = {
  routes: [{}],
};

Sidebar.propTypes = {
  // links that will be displayed inside the component
  routes: PropTypes.arrayOf(PropTypes.object),
  logo: PropTypes.shape({
    // innerLink is for links that will direct the user within the app
    // it will be rendered as <Link to="...">...</Link> tag
    innerLink: PropTypes.string,
    // outterLink is for links that will direct the user outside the app
    // it will be rendered as simple <a href="...">...</a> tag
    outterLink: PropTypes.string,
    // the image src of the logo
    imgSrc: PropTypes.string.isRequired,
    // the alt for the img
    imgAlt: PropTypes.string.isRequired,
  }),
};

export default Sidebar;
