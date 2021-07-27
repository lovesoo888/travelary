// ! main page 상단 헤더 영역
// ! 붙어다니는 상단 헤더영역이다....1번 메뉴, 2번, 3번 메뉴까지 얘가 같이 나옴...

// reactstrap components
import { Card, CardBody, CardHeader, Container, Row, Col } from 'reactstrap';

const Header = () => {
  return (
    <>
      <div className='header postViewWrap pb-8 pt-md-6'>
        {/* <PostBg /> */}
        <Container className='mt--7' fluid>
          <Row>
            <Col className='mb-5 mb-xl-0' xl='12'>
              <Card className='shadow'>
                <CardHeader className='bg-transparent'>
                  <Row className='align-items-center postHeader pl-3 pr-3'>
                    <h3>발리에서 생긴일</h3>
                    <div>
                      <button class='btn btn-secondary'>목록</button>
                      <button class='btn btn-primary'>수정</button>
                      <button class='btn btn-danger'>삭제</button>
                    </div>
                  </Row>
                </CardHeader>
                <CardBody>
                  {/* Chart */}
                  <div>
                    <p>
                      난 안되겠니 이생에서 다음 생에선 되겠니 약속한다면 오늘이
                      끝이라도 두렵지 않겠어 My Love 나는 자꾸 지쳐가 너의
                      등뒤에서 너는 불러도 다른 곳만 봐 왜 대답이 없어 보내줘야
                      하는데 나 잘 알고 있는데 나의 마음은 내것이 아냐 너의
                      슬픔이 나를 닮아서 그 외로움 알것 같아서 눈물이 못오게 꼭
                      안고싶어서 왜 몰라주니 넌 내맘을 아님 나 라도 안되니
                      누군갈 내가 이렇게 간절하게 원한 적 없었어 난 안되겠니
                      이생에서 다음 생에선 되겠니 약속한다면 오늘이 끝이라도
                      두렵지 않겠어 My Love 이런 내맘 알겠니 너무도 힘들어 너를
                      위해선 보내주는 게 더 나을테지만 모든걸 다 잃어도 난
                      너만을 지킬게 너와 바꿀 수 없는 이유로 너의 슬픔이 나를
                      닮아서 그 외로움 알것 같아서 눈물이 못오게 꼭 안고싶어서
                      왜 몰라주니 넌 내맘을 아님 나 라도 안되니 누군갈 내가
                      이렇게 간절하게 원한 적 없었어 난 안되겠니 이생에서 다음
                      생에선 되겠니 약속한다면 오늘이 끝이라도 두렵지 않겠어 My
                      Love
                    </p>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Header;
