import React, { useState } from "react";
import {
  UserOutlined,
  FileTextOutlined,
  FileAddOutlined,
  SearchOutlined,
  ExportOutlined,
  MoreOutlined,
  LogoutOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Layout, Menu, theme } from "antd";

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];
const isAdmin = false;

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem("Badania", "ukg", <FileTextOutlined />, [
    getItem("Nowe badanie", "ukg_new", <FileAddOutlined />),
    getItem("Wyszukaj", "ukg_search", <SearchOutlined />),
    getItem("Eksportuj", "ukg_export", <ExportOutlined />),
  ]),
  getItem("Uzytkownik", "user", <UserOutlined />, [
    getItem("Ustawienia", "user_settings", <MoreOutlined />),
    getItem("Wyloguj", "user_logout", <LogoutOutlined />),
  ]),
  isAdmin
    ? getItem("Admin", "admin", <UsergroupAddOutlined />, [
        getItem("Dodaj uzytkownika", "admin_new"),
        getItem("Zarządzaj uzytkownikami", "admin_manage"),
      ])
    : null,
];

const MainLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        theme="light"
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        width={280}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="light"
          defaultSelectedKeys={["ukg_search"]}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: "1rem" }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            Bill is a cat.
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          ©2023 Created by Piotr Paczuła
        </Footer>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
