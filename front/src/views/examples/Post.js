// ! main page 상단 헤더 영역
// ! 붙어다니는 상단 헤더영역이다....1번 메뉴, 2번, 3번 메뉴까지 얘가 같이 나옴...

// reactstrap components
import { Card, CardBody, CardTitle, Container, Row, Col } from 'reactstrap';

const Header = () => {
  return (
    <>
      <div className='header postHeader bg-gradient-info pb-8 pt-5 pt-md-8'>
        <Container fluid>
          <div className='header-body'>
            {/* Card stats */}
            <Row>
              <Col lg='6' xl='12'>
                <Card className='card-stats mb-4 mb-xl-0'>
                  <CardBody>
                    <Row>
                      <div className='col'>
                        <CardTitle
                          tag='h5'
                          className='text-uppercase text-muted mb-0'
                        >
                          Traffic 공통헤더는 ?
                        </CardTitle>
                        <span className='h2 font-weight-bold mb-0'>
                          350,897
                        </span>
                      </div>
                      <Col className='col-auto'>
                        <div className='icon icon-shape bg-danger text-white rounded-circle shadow'>
                          <i className='fas fa-chart-bar' />
                        </div>
                      </Col>
                    </Row>
                    <p className='mt-3 mb-0 text-muted text-sm'>
                      <span className='text-success mr-2'>
                        <i className='fa fa-arrow-up' /> 3.48%
                      </span>{' '}
                      <span className='text-nowrap'>Since last month</span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Header;
