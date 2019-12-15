import React from 'react';
import { BrowserRouter, Switch, Route, Link} from "react-router-dom";
import loadable from '@loadable/component';
import Loading from './Components/Loading';

import './App.scss';

const MainPage = loadable(() => import('./pages/Main'), {fallback: <Loading />})
const AuthorsPage = loadable(() => import('./pages/Authors'), {fallback: <Loading />})

export default function App() {
    return (
        <BrowserRouter>
            <div className="app">
                <nav>
                    <Link to="/">Главная</Link>
                    <Link to="/authors">Авторы</Link>
                </nav>
                <main>
                    <Switch>
                        <Route path="/authors">
                            <AuthorsPage />
                        </Route>
                        <Route path="/">
                            <MainPage />
                        </Route>
                    </Switch>
                </main>
            </div>
        </BrowserRouter>
    );
}
