// ! main page 상단 헤더 영역
// ! 붙어다니는 상단 헤더영역이다....1번 메뉴, 2번, 3번 메뉴까지 얘가 같이 나옴...

// reactstrap components
import { Card, CardBody, CardTitle, Container, Row, Col } from 'reactstrap';

const PostBg = () => {
  return (
    <>
      <div className='header postHeader'>
        <div className='bg-gradient-info pb-8 pt-5 pt-md-8'></div>
      </div>
    </>
  );
};

export default PostBg;
