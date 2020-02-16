import React, { useState } from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import loadable from "@loadable/component";
import Loading from "./components/Loading";
import "./App.less";
import { Layout, Menu } from "antd";

// Layout components
const { Content, Header } = Layout;

// pages
const MainPage = loadable(() => import("./pages/Main"), {
    fallback: <Loading />
});
const AuthorsPage = loadable(() => import("./pages/Authors"), {
    fallback: <Loading />
});

export default function App() {
    const [curMenu, setCurMenu] = useState("home");
    return (
        <BrowserRouter>
            <Layout className="app">
                <Header>
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        onClick={e => setCurMenu(e.key)}
                        selectedKeys={curMenu}
                    >
                        <Menu.Item key="home">
                            <Link to="/">Главная</Link>
                        </Menu.Item>
                        <Menu.Item key="authors">
                            <Link to="/authors">Авторы</Link>
                        </Menu.Item>
                    </Menu>
                </Header>
                <Content>
                    <Switch>
                        <Route path="/authors">
                            <AuthorsPage />
                        </Route>
                        <Route path="/">
                            <MainPage />
                        </Route>
                    </Switch>
                </Content>
            </Layout>
        </BrowserRouter>
    );
}
