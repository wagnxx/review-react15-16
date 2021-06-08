import React from 'react';
import 'antd/dist/antd.css';
import { Switch, NavLink, BrowserRouter as Router } from 'react-router-dom';
import RoutesRoot from '../routes';
import { Layout, Menu, Breadcrumb } from 'antd';
import './dashboard.css'


const { Header, Content, Footer } = Layout;

export default function Dashboard() {

  return (

    <Router basename="/app">



      <Layout className="layout">
        <Header
          style={{ zIndex: '999' }}
        >

          <Menu
            theme="dark"
            mode="horizontal"
            // mode="inline"
            defaultSelectedKeys={['1']}
            style={{ lineHeight: '64px' }}
          >
            <Menu.Item key="1">
              <NavLink activeClassName="navSelected" to="/home" >
                Home
            </NavLink>
            </Menu.Item>
            <Menu.Item key="2">
              <NavLink activeClassName="navSelected" to="/login">login</NavLink>
            </Menu.Item>
            <Menu.Item key="3">
              <NavLink activeClassName="navSelected" to="/product">product</NavLink>
            </Menu.Item>
            <Menu.Item key="4">
              <NavLink activeClassName="navSelected" to="/manage">manage</NavLink>
            </Menu.Item>
            <Menu.Item key="5">
              <NavLink activeClassName="navSelected" to="/hooks">hooks</NavLink>
            </Menu.Item>
            <Menu.Item key="6">
              <NavLink activeClassName="navSelected" to="/RouterTestPage">RouterTestPage</NavLink>
            </Menu.Item>
            <Menu.Item key="7">
              <NavLink activeClassName="navSelected" to="/CustReduxPage">CustReduxPage</NavLink>
            </Menu.Item>
            <Menu.Item key="8">
              <NavLink activeClassName="navSelected" to="/SchedulePage">源码&fiber</NavLink>
            </Menu.Item>
            <Menu.Item key="9">
              <NavLink activeClassName="navSelected" to="/immutable">immutable</NavLink>
            </Menu.Item>
            <Menu.Item key="10">
              <NavLink activeClassName="navSelected" to="/basic">basic</NavLink>
            </Menu.Item>
          </Menu>
        </Header>
        <Content
          style={{
            padding: '0 10px',
            height: 'calc(100vh - 88px)',
            overflow: 'scroll',
          }}
        >
          {/* <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb> */}
          <div style={{ background: '#fff', minHeight: 280 }}>
            <Switch
            >
              <RoutesRoot />
            </Switch>
          </div>
        </Content>
        {/* <Footer style={{ textAlign: 'center' }}>
            reactJS系列及周边 ©2021 Created by wangxx
        </Footer>  */}
      </Layout>


    </Router>

  );
}
