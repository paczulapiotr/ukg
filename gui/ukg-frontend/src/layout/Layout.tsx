import React, { useMemo, useState } from "react";
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
import { useNavigate } from "react-router-dom";
import styles from "./Layout.module.scss";
import Router from "./Router";

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];
const isAdmin = false;

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  onClick?: () => void
): MenuItem {
  return {
    label,
    key,
    icon,
    children,
    onClick,
  } as MenuItem;
}
const useMenuItems = (): MenuItem[] => {
  const navigate = useNavigate();

  return useMemo<MenuItem[]>(
    () => [
      getItem("Badania", "ukg", <FileTextOutlined />, [
        getItem("Nowe badanie", "ukg_new", <FileAddOutlined />, undefined, () =>
          navigate("ukg/new")
        ),
        getItem("Wyszukaj", "ukg_search", <SearchOutlined />, undefined, () =>
          navigate("ukg")
        ),
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
    ],
    []
  );
};

const MainLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const items = useMenuItems();

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
      <Layout className={styles.layout}>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: "1rem" }}>
          <div
            style={{
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
            className={styles.content}
          >
            <Router />
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
