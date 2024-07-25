"use client";

import "./layoutAdmin.scss";
import {
  TeamOutlined,
  ExceptionOutlined,
  DollarCircleOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme, message } from "antd";
import { useEffect, useState } from "react";

import { Dropdown, Space } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import withAuth from "@/components/with auth/WithAuth";


const { Header, Content, Sider } = Layout;

function getItem(label: any, key: any, icon: any, children: any) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem(
    <Link href="/admin/nganh">Quản lý các ngành</Link>,
    "/admin/nganh",
    <TeamOutlined />,
    []
  ),
  getItem(
    <Link href="/admin/template">Quản lý template</Link>,
    "/admin/template",
    <ExceptionOutlined />,
    []
  ),

];

const AccountAdmin = () => {

  const route = useRouter();

  const handleLogout = async () => {
    window.localStorage.clear();
    route.push('/')
  };

  const items = [
    {
      label: (
        <p onClick={() => route.push("/")}>
          Trang chủ
        </p>
      ),
      key: "tt",
    },
    {
      label: (
        <p onClick={() => route.push("/change-pass")}>
          Đổi mật khẩu
        </p>
      ),
      key: "home",
    },
    {
      label: <p onClick={() => handleLogout()}>Đăng xuất</p>,
      key: "logout",
    },
  ];

  return (
    <div style={{ display: "flex", justifyContent: "flex-end" }}>
      <Space direction="vertical">
        <Space wrap>
          <Dropdown
            menu={{
              items,
            }}
            placement="bottomLeft"
          >
            <div className="admin">Admin</div>
          </Dropdown>
        </Space>
      </Space>
    </div>
  );
};

const LayoutAdmin = ({
  children,
}: {
  children: React.ReactNode
}) => {

  const [keyActive, setKeyActive] = useState("/admin/nganh");
  const [collapsed, setCollapsed] = useState(false);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        width={"220px"}
      >
        <div
          style={{
            margin: 40,
          }}
        ></div>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          selectedKeys={[keyActive]}
          mode="inline"
          items={items}
          onClick={(e) => setKeyActive(e.key)}
        />
      </Sider>
      <Layout>
        <Header
          className="ant-layout-header"
          hidden
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        />
        <Content>
          <AccountAdmin />
          <div
            style={{
              padding: 24,
              minHeight: 500,
              background: colorBgContainer,
            }}
          >
            {children}
          </div>
        </Content>

      </Layout>
    </Layout>
  );
};

export default withAuth(LayoutAdmin)
