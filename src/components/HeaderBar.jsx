import React, { useEffect, useState } from "react";
import indexStyle from "../pages/index/index.module.scss";
import { Input, Col, Avatar, Button, Popover, Menu, message } from "antd";
import { NavLink, useNavigate } from "react-router-dom";
import { loginout as userLoginOut } from "../api/user";
import {
  BookOutlined,
  EditOutlined,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { getAvatarInfo } from "../api/login";
const { Search } = Input;

function HeaderBar() {
  const navigate = useNavigate();
  const [loginHide, setLoginHide] = useState(false);
  const [userinfo, setUserinfo] = useState(null);
  const addArticle = () => {
    navigate("/article/add");
  };
  const loginout = () => {
    userLoginOut().then((res) => {
      console.log(res);
      if (!!res.data) {
        if (res.data.code === 200) {
          localStorage.removeItem("token");
          localStorage.removeItem("userinfo");
          setLoginHide(false);
          message.success("退出登录成功");
        }
      }
    });
  };
  const switchMenuItem = (e) => {
    const { key } = e;
    switch (key) {
      case "item-1":
        navigate("/person/center/profile");
        break;
      case "item-2":
        break;
      case "item-3":
        loginout();
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    getAvatarInfo()
      .then((res) => {
        if (res.data.code === 200) {
          setLoginHide(true);
          setUserinfo(res.data.data);
          localStorage.setItem(
            "user-basic-info",
            JSON.stringify(res.data.data)
          );
        }
      })
      .catch((err) => {
        message.warn(err);
      });
  }, []);

  //声明定义菜单元素
  const menuitems = [
    { label: "个人中心", key: "item-1", icon: <UserOutlined /> }, // 菜单项务必填写 key
    { label: "文章管理", key: "item-2", icon: <BookOutlined /> },
    { label: "退出登录", key: "item-3", icon: <LogoutOutlined /> },
  ];
  //下拉框title部分
  const title = (
    <div className="popoverheaderContainer">
      <div className="avatarContainer">
        <Avatar
          src={`/static/avatar/${userinfo ? userinfo.avatar : ""}`}
          size={60}
          shape="circle"
          icon={<UserOutlined />}
        />
      </div>
      {userinfo ? userinfo.username : null}
    </div>
  );

  const content = <Menu items={menuitems} onClick={switchMenuItem}></Menu>; //下拉框content部分
  //xxl px>=1600 xl px >=1200 lg px>=992px md>=768px sm >=568px xs<568px
  return (
    <>
      <Col xl={3} lg={4} md={5} sm={6} xs={4}>
        <NavLink className={indexStyle.navlinknone} to="/">
          <strong>React-Blog</strong>
        </NavLink>
      </Col>

      <Col
        xl={{ offset: 11, span: 1 }}
        lg={{ offset: 8, span: 2 }}
        md={{ offset: 5, span: 2 }}
        sm={{ offset: 1, span: 2 }}
        xs={{offset:1,span:3}}
      >
        <NavLink className={"antd-a-style"} to={"/index/homepage"}>
          首页
        </NavLink>
      </Col>
      <Col xl={1} lg={2} md={2} sm={2} xs={3}>
        <NavLink className={"antd-a-style"} to={"/index/about"}>
          关于
        </NavLink>
      </Col>
      <Col xl={3} lg={3} md={5} sm={6} xs={6}>
        <Search placeholder="站内搜索" onSearch={Search} enterButton />
      </Col>
      {!loginHide && (
        <Col offset={1} xl={1} lg={2} md={2} sm={2} xs={3}>
          <NavLink className={"antd-a-style"} to={"/index/login"}>
            登录
          </NavLink>
        </Col>
      )}
      {!loginHide && (
        <Col xl={2} lg={2} md={2} sm={2} xs={3}>
          <NavLink className={"antd-a-style"} to={"/index/register"}>
            注册
          </NavLink>
        </Col>
      )}
      {loginHide && (
        <Popover
          overlayClassName="avatarPopover"
          title={title}
          content={content}
          placement="bottom"
        >
          <Col offset={1} xl={1} lg={1} md={1} sm={1} xs={2}>
            <Avatar
              src={`/static/avatar/${userinfo.avatar}`}
              size={{xs: 24,
                sm: 30,
                md: 36,
                lg: 42,
                xl: 48,}}
              shape="circle"
              icon={<UserOutlined />}
            />
          </Col>
        </Popover>
      )}
      {loginHide && (
        <Col xl={3} lg={3} md={3} sm={4} xs={4}>
          <Button
            onClick={addArticle}
            shape="round"
            danger="true"
            className={indexStyle.EditorButton}
            icon={<EditOutlined />}
          >
            写文章
          </Button>
        </Col>
      )}
    </>
  );
}

export default HeaderBar;
