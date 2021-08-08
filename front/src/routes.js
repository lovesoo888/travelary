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
import Post from 'views/examples/Post';
import CatrgoryAdd from 'views/examples/CatrgoryAdd';
import ForgotPassword from 'views/examples/ForgotPassword';
import SharedMemberManage from 'views/examples/SharedMemberManage';
import CategoryList from 'views/examples/CategoryList';
import PostModify from 'views/examples/PostModify';

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
    path: '/user-profile',
    name: 'User Profile',
    icon: 'ni ni-single-02',
    component: Profile,
    layout: '/admin',
  },
  {
    path: '/maps',
    // name: 'Maps',
    // icon: 'ni ni-square-pin',
    component: Maps,
    layout: '/admin',
  },

  {
    path: '/tables',
    // name: 'Calendar',
    // icon: 'ni ni-calendar-grid-58',
    component: Tables,
    layout: '/admin',
  },
  {
    path: '/login',
    // name: 'Login',
    // icon: 'ni ni-key-25',
    component: Login,
    layout: '/auth',
  },
  {
    path: '/register',
    // name: 'Register',
    // icon: 'ni ni-circle-08',
    component: Register,
    layout: '/auth',
  },
  {
    path: '/categories/:id',
    breadcrumb: 'My Travelary Post List',
    component: PostList,
    layout: '/admin',
  },
  {
    path: '/post/add',
    breadcrumb: 'Created My Travelary',
    component: PostCreate,
    layout: '/admin',
  },
  {
    path: '/post/:id',
    breadcrumb: 'Travelary View',
    component: Post,
    layout: '/admin',
  },
  {
    path: '/category/add',
    breadcrumb: 'Category Add',
    component: CatrgoryAdd,
    layout: '/admin',
  },
  {
    path: '/forgot-password',
    breadcrumb: 'ForgotPassword',
    component: ForgotPassword,
    layout: '/auth',
  },
  {
    path: '/shared-member-manage',
    breadcrumb: 'Shared Member Manage',
    component: SharedMemberManage,
    layout: '/auth',
  },
  {
    path: '/post/modify/:id',
    breadcrumb: 'Shared Member Manage',
    component: PostModify,
    layout: '/auth',
  },
];
export default routes;
