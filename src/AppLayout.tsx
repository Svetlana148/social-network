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
import  ChatPage  from './pages/Chat/ChatPage';
import SubMenu from 'antd/es/menu/SubMenu';
import { NavLink } from "react-router-dom";


const { Content, Sider } = Layout;



//Боковое меню-----SideBar------------------------------------------------------
// const items2: MenuProps['items'] = [
//   {
//     key: 'MyProfile',
//     icon: React.createElement(UserOutlined),
//     label: 'My Profile',
//     children: [
//       {
//         key: 'Profile',
//         label: 'Profile',
//       },
//       {
//         key: 'Message',
//         label: 'Message',
//       },
//     ]
//   },
//   {
//     key: 'Users',
//     icon: React.createElement(UserOutlined),
//     label: 'Users',
//     children: [
//       {
//         key: 'Message',
//         label: 'Message',
//       }
//     ]
//   },
//   {
//     key: 'Music',
//     icon: React.createElement(UserOutlined),
//     label: 'Music',
//   },
//   {
//     key: 'Settings',
//     icon: React.createElement(UserOutlined),
//     label: 'Settings',
//   },
// ];
//------------------------------------------------------





const AppAntD: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
      <AppHeader />
      
      <Layout>
        {/* Боковое меню */}
        <Sider width={200} style={{ background: colorBgContainer }}>
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0 }}
            // items={items2}
          >

            <SubMenu key="sub1" icon={<UserOutlined/>} title="My Profile">
                <Menu.Item key="1"> <NavLink to="/profile">Profile</NavLink></Menu.Item>
                <Menu.Item key="2"> <NavLink to="/dialogs">Messages</NavLink></Menu.Item>
                {/* <Menu.Item key="3">option3</Menu.Item>
                <Menu.Item key="4">option4</Menu.Item> */}
            </SubMenu>
            <SubMenu key="sub2" icon={<LaptopOutlined/>} title="Users">
                <Menu.Item key="5"><NavLink to="/users">Users</NavLink></Menu.Item>
                {/* <Menu.Item key="6">option6</Menu.Item>
                <Menu.Item key="7">option7</Menu.Item>
                <Menu.Item key="8">option8</Menu.Item> */}
            </SubMenu>
            <SubMenu key="sub3" icon={<LaptopOutlined/>} title="Music">
                <Menu.Item key="5"><NavLink to="/music">Music</NavLink></Menu.Item>
                {/* <Menu.Item key="6">option6</Menu.Item>
                <Menu.Item key="7">option7</Menu.Item>
                <Menu.Item key="8">option8</Menu.Item> */}
            </SubMenu>
            <SubMenu key="sub4" icon={<LaptopOutlined/>} title="Settings">
                <Menu.Item key="5"><NavLink to="/settings">Settings</NavLink></Menu.Item>
                {/* <Menu.Item key="6">option6</Menu.Item>
                <Menu.Item key="7">option7</Menu.Item>
                <Menu.Item key="8">option8</Menu.Item> */}
            </SubMenu>
            <SubMenu key="sub5" icon={<NotificationOutlined/>} title="Chat">
                <Menu.Item key="9"><NavLink to="/chat">Chat</NavLink></Menu.Item>
                {/* <Menu.Item key="10">option10</Menu.Item>
                <Menu.Item key="11">option11</Menu.Item>
                <Menu.Item key="12">option12</Menu.Item> */}
            </SubMenu>


          </Menu>
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

            {/* "React.Suspense"  крутилка из React-а для ВСЕх компонент проекта */}
            <React.Suspense fallback={<div><Preloader /></div>}>
              <Routes >
                {/* Есть Route exact тут ищется точное совпадение и дальше не идем */}

                <Route path='/' element={<ProfileContainer />} />

                <Route path='/Profile/:userId?' element={<ProfileContainer />} />
                <Route path='/Dialogs/*' element={<DialogsContainer />} />
                <Route path="/users" element={<UsersPage pageTitle='User page title' />} />
                {/* pageTitle={"Social network"} */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/music" element={<Music />} />
                <Route path="/news" element={<News />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/chat" element={<ChatPage />} />
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