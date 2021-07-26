// postView 백그라운드 프리뷰 사진 영역

// reactstrap components
// import { Button, Container, Row, Col } from 'reactstrap';

const PostBg = () => {
  return (
    <>
      <div
        className='header pb-8 pt-5 pt-lg-8 d-flex align-items-center'
        style={{
          minHeight: '600px',
          backgroundImage:
            'url(' +
            require('../../assets/img/theme/profile-cover.jpg').default +
            ')',
          // backgroundImage: `url('http://www.travelnbike.com/news/photo/201706/40021_37790_466.jpg').default`,
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
        }}
      >
        {/* Mask */}
        <span className='mask bg-gradient-default opacity-8' />
        {/* Header container */}
        {/* <Container className='d-flex align-items-center' fluid>
          <Row>
            <Col lg='7' md='10'>
              <h1 className='display-2 text-white'>title : dfsdfsdfsd</h1>
              <p className='text-white mt-0 mb-5'>
                This is your profile page. You can see the progress you've made
                with your work and manage your projects or assigned tasks
              </p>
              <Button
                color='info'
                href='#pablo'
                onClick={(e) => e.preventDefault()}
              >
                Edit profile
              </Button>
            </Col>
          </Row>
        </Container> */}
      </div>
    </>
  );
};

export default PostBg;
