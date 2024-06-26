import React, { useEffect, useMemo, useState } from "react";
import {
  UserOutlined,
  SearchOutlined,
  SettingOutlined,
  PlusOutlined,
  MoreOutlined,
  LogoutOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Layout, Menu, theme } from "antd";
import { useNavigate } from "react-router-dom";
import styles from "./AuthorizedLayout.module.scss";
import Router from "./Router";
import { Footer } from "../Footer";
import { useAuth } from "../../auth/AuthProvider/useAuth";

const { Header, Content, Sider } = Layout;

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
  const { logout } = useAuth();
  return useMemo<MenuItem[]>(
    () => [
      getItem("Pacjenci", "patient", <UserOutlined />, [
        getItem(
          "Dodaj pacjenta",
          "patient_add",
          <PlusOutlined />,
          undefined,
          () => navigate("/patient/add")
        ),
        getItem(
          "Wyszukaj",
          "patient_search",
          <SearchOutlined />,
          undefined,
          () => navigate("/patient")
        ),
      ]),
      getItem("Profil", "user", <SettingOutlined />, [
        getItem(
          "Ustawienia",
          "user_settings",
          <MoreOutlined />,
          undefined,
          () => navigate("settings")
        ),
        getItem(
          "Wyloguj",
          "user_logout",
          <LogoutOutlined />,
          undefined,
          logout
        ),
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

const AuthorizedLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const items = useMenuItems();
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/ukg");
  }, []);

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
        <Footer />
      </Layout>
    </Layout>
  );
};

export default AuthorizedLayout;
