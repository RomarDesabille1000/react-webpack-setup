import React, {Suspense, lazy} from 'react';
import style from './App.module.css'
import Logo from "./components/Logo";
import gif from "./images/gif.gif";
import png from "./images/png.png";
import {BrowserRouter, Route, Switch, NavLink} from 'react-router-dom'

//Split to Pages to Chunks for optimization
const Home = lazy(() => import('./Pages/Home'));
const Counter = lazy(() => import('./Pages/Counter'));
const NotFound = lazy(() => import('./Pages/NotFound'));

function App() {
    return (
        <div className={style.container}>
            <h1>Webpack Setup</h1>
            <Logo/>
            <h2>Loader Test</h2>
            <div>
                <img src={gif} className={style.imageLoader}/>
                <img src={png} className={style.imageLoader}/>
            </div>
            <div>Split Pages into chunk test</div>
            <BrowserRouter>
                <div className={style.navbar}>
                    <NavLink className={style.navbarLink} exact to="/" activeClassName={style.navbarLinkActive}>Home</NavLink>
                    <NavLink className={style.navbarLink} exact to="/counter" activeClassName={style.navbarLinkActive}>Counter</NavLink>
                </div>
                <Suspense fallback={<div>Loading..</div>}>
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route exact path="/counter" component={Counter}/>
                        <Route exact component={NotFound}/>
                    </Switch>
                </Suspense>
            </BrowserRouter>
        </div>
    );
}

export default App