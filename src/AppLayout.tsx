import React from 'react';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Avatar, Breadcrumb, Layout, Menu, theme } from 'antd';
import Preloader from './components/common/Preloader/Preloader';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import ProfileContainer from './components/Profile/ProfileContainer';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import UsersPage from './components/Users/UsersContainer';
import LoginPage from './components/Login/Login';
import Music from './components/Music/Music';
import News from './components/News/News';
import Settings from './components/Settings/Settings';
import { Error404 } from './Error404';
// import HeaderContainer from './components/Header/HeaderContainer';
import AppHeader from './components/Header/AppHeader';


const { Header, Content, Sider } = Layout;



//Боковое меню
const items2: MenuProps['items'] = [
  {
    key: 'MyProfile',
    icon: React.createElement(UserOutlined),
    label: 'My Profile',
    children: [
      {
        key: 'Profile',
        label: 'Profile',
      },
      {
        key: 'Message',
        label: 'Message',
      },
    ]
  },
  {
    key: 'Users',
    icon: React.createElement(UserOutlined),
    label: 'Users',
    children: [
      {
        key: 'Message',
        label: 'Message',
      }
    ]
  },
  {
    key: 'Music',
    icon: React.createElement(UserOutlined),
    label: 'Music',
    // children : [
    //   {
    //     key: 'Profile',
    //     label: 'Profile',
    //   },
    // ]
  },
  {
    key: 'Settings',
    icon: React.createElement(UserOutlined),
    label: 'Settings',
    // children : [
    //   {
    //     key: 'Profile',
    //     label: 'Profile',
    //   },
    // ]
  },
];

const items3: MenuProps['items'] = [
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
  NotificationOutlined,
  NotificationOutlined
].map((icon, index) => {
  const key = String(index + 1);

  return {
    key: `sub${key}`,
    icon: React.createElement(icon),
    label: `subnav ${key}`,

    children: new Array(4).fill(null).map((_, j) => {
      const subKey = index * 4 + j + 1;
      return {
        key: subKey,
        label: `option${subKey}`,
      };
    }),
  };
},
);





const AppAntD: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
      <AppHeader />
      {/* <Header style={{ display: 'flex', alignItems: 'center' }}>
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          items={items1}
          style={{ flex: 1, minWidth: 0 }}
        />
        <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
      </Header> */}







      <Layout>
        {/* Боковое меню */}
        <Sider width={200} style={{ background: colorBgContainer }}>
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0 }}
            items={items2}
          />
        </Sider>








        {/* Над  "content"-ом    Home List App*/}
        <Layout style={{ padding: '0 24px 24px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>


          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >

            {/* "Suspense" крутилка( мною написанная) для ВСЕх компонент проекта */}
            <React.Suspense fallback={<div><Preloader /></div>}>
              <Routes >
                {/* Есть Route exact тут ищется точное совпадение и дальше не идем */}

                <Route path='/' element={<ProfileContainer />} />

                <Route path='/Profile/:userId?' element={<ProfileContainer />} />
                <Route path='/Dialogs/*' element={<DialogsContainer />} />
                <Route path="/users" element={<UsersPage pageTitle='user page title' />} />
                {/* pageTitle={"Social network"} */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/music" element={<Music />} />
                <Route path="/news" element={<News />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="*" element={<Error404 />} />


              </Routes>
            </React.Suspense>


          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default AppAntD;