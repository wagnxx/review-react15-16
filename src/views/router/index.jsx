import React from 'react'
import './index.css'

import {
    BrowserRouter as Router,
    Redirect,
    Route,
    Link,
    Switch,
    useHistory,
    useLocation,
    useParams,
    useRouteMatch,
    NavLink

} from 'react-router-dom';


function HomeButton() {
    let history = useHistory();
    let location = useLocation();

    function handleClick() {
        history.push("/HOme/123");
    }

    return (
        <button type="button" onClick={handleClick}>
            Go home
      </button>
    );
}


const Home = () => {
    let { slug } = useParams();

    return <div>home cpt，slug:{slug}</div>;
}


function BlogPost() {
    let match = useRouteMatch("/blog/:slug");

    // Do whatever you want with the match...
    if (!match) return 'null---';
    return <h2>{match.params.slug}</h2>;
}


export default () => {
    return <div>router test page!

        <Router  basename="/RouterTestPage">
            <li><NavLink  exact activeClassName='selected' to='/about'>about</NavLink></li>
            <li><NavLink exact  activeClassName='selected' to='/Home'>home</NavLink></li>
            <li><NavLink exact activeClassName='selected' to='/me'>me</NavLink></li>
            <li><HomeButton /></li>
            <Switch>
                <Route path='/HoME/:slug' sensitive={false} component={Home} />
                <BlogPost />

            </Switch>
        </Router>
    </div>
}


/**
 * =====================统计==========================
 *
 *  useHistory,
    useLocation,
    useParams
    useRouteMatch
 *  basename="/RouterTestPage" 这个很有用

Link元素：string,object,function

 Link to={location => ({ ...location, pathname: "/courses" })} />
<Link to={location => `${location.pathname}?sort=name`} />


Route

props:
    strict:是否匹配斜线
    exact:是否匹配自路径
    sensitive：是否忽略大小写



    <Router> :接下来探究

























 *
 *
 *
 *
 *
 */