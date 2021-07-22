
// ! 메인 페이지의 네비바

import { Link } from "react-router-dom";
// reactstrap components
import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Form,
  FormGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  InputGroup,
  Navbar,
  Nav,
  Container,
  Media,
} from "reactstrap";

const AdminNavbar = (props) => {
  return (
    <>
      <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
        <Container fluid>

          {/* page title 명 뜨는 상단 타이틀 부분  */}
          {/* Admin.js에서 getBrandText()로 routes에 있는 타이틀 텍스트를 불러온다. */}
          <Link
            className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block"
            to="/"
          >
            {props.brandText}
          </Link>

          {/* 검색창 */}
          <Form className="navbar-search navbar-search-dark form-inline mr-3 d-none d-md-flex ml-lg-auto">
            <FormGroup className="mb-0">
              <InputGroup className="input-group-alternative">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="fas fa-search" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input placeholder="Search" type="text" />
              </InputGroup>
            </FormGroup>
          </Form>

          {/* 오른쪽 상단바 유저 프로필 이미지, 이미지를 클릭하면 나오는 메뉴 */}
          <Nav className="align-items-center d-none d-md-flex " navbar>
          <span className="icon icon-shape bg-secondary rounded-circle shadow">
            <i className="ni ni-bell-55" />
            <span class="badge badge-default">4</span>
          </span>
          </Nav>
         
          {/* 유저 상단바 끝 */}
        </Container>
      </Navbar>
    </>
  );
};

export default AdminNavbar;
