// ! routes 데이터,

import Index from 'views/Index.js';
import Profile from 'views/examples/Profile.js';
import Maps from 'views/examples/Maps.js';
import Register from 'views/examples/Register.js';
import Login from 'views/examples/Login.js';
import Tables from 'views/examples/Tables.js';
import Icons from 'views/examples/Icons.js';
import PostList from 'views/examples/PostList.js';
import PostCreate from 'views/examples/PostCreate';

var routes = [
  {
    path: '/index',
    name: 'My Travelary',
    icon: 'ni ni-collection',
    component: Index,
    layout: '/admin',
    breadcrumb: 'My Travelary',
  },
  {
    path: '/icons',
    name: 'Shared Travelary',
    icon: 'ni ni-world-2',
    component: Icons,
    layout: '/admin',
  },
  {
    path: '/maps',
    name: 'Maps',
    icon: 'ni ni-square-pin',
    component: Maps,
    layout: '/admin',
  },
  {
    path: '/user-profile',
    name: 'User Profile',
    icon: 'ni ni-single-02',
    component: Profile,
    layout: '/admin',
  },
  {
    path: '/tables',
    name: 'Calendar',
    icon: 'ni ni-calendar-grid-58',
    component: Tables,
    layout: '/admin',
  },
  {
    path: '/login',
    name: 'Login',
    icon: 'ni ni-key-25',
    component: Login,
    layout: '/auth',
  },
  {
    path: '/register',
    name: 'Register',
    icon: 'ni ni-circle-08',
    component: Register,
    layout: '/auth',
  },
  {
    path: '/post/list',
    breadcrumb: 'My Travelary categories',
    component: PostList,
    layout: '/admin',
  },
  {
    path: '/post/add',
    breadcrumb: 'Created My Travelary',
    component: PostCreate,
    layout: '/admin',
  },
];
export default routes;
