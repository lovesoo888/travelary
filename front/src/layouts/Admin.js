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
import React from 'react';
import { useLocation, Route, Switch, Redirect } from 'react-router-dom';
// reactstrap components
import { Container, Media } from 'reactstrap';
// core components
import AdminNavbar from 'components/Navbars/AdminNavbar.js';
import AdminFooter from 'components/Footers/AdminFooter.js';
import Sidebar from 'components/Sidebar/Sidebar.js';
import PostBg from 'components/Headers/PostBg';

import routes from 'routes.js';

const Admin = (props) => {
  const mainContent = React.useRef(null);
  const location = useLocation();

  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContent.current.scrollTop = 0;
  }, [location]);

  React.useEffect(() => {
    document.body.classList.add('bg-default');
    return () => {
      document.body.classList.remove('bg-default');
    };
  }, []);

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === '/admin') {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };

  const getBrandText = (path) => {
    for (let i = 0; i < routes.length; i++) {
      if (
        props.location.pathname.indexOf(routes[i].layout + routes[i].path) !==
        -1
      ) {
        return routes[i].name;
      }
    }
    return 'Brand';
  };

  const getBreadcrumb = () => {
    for (let i = 0; i < routes.length; i++) {
      if (
        props.location.pathname.indexOf(routes[i].layout + routes[i].path) !==
        -1
      ) {
        return routes[i].breadcrumb;
      }
    }
  };

  // /post/view/ url 일때만 보이는 백그라운드임.
  const PostViewHeader = () => {
    if (window.location.pathname === '/admin/post/view')
      return (
        <div className='pt-7'>
          <PostBg />
        </div>
      );
    return null;
  };

  return (
    <>
      <Sidebar
        {...props}
        routes={routes}
        logo={{
          innerLink: '/admin/index',
          imgSrc: require('../assets/img/brand/argon-react.png').default,
          imgAlt: '...',
        }}
      />
      <div className='main-content' ref={mainContent}>
        <AdminNavbar
          {...props}
          brandText={getBrandText(props.location.pathname)}
          breadcrumb={getBreadcrumb(props.location.pathname)}
        />

        {/* post view 페이지에만 나오는 헤더영역 */}
        {PostViewHeader()}

        <div style={{ margin: 'auto', maxWidth: '1200px' }}>
          <Switch>
            {getRoutes(routes)}
            <Redirect from='*' to='/admin/index' />
          </Switch>
        </div>
        <Container fluid>
          <AdminFooter />
        </Container>
      </div>
    </>
  );
};

export default Admin;
