import React, { Suspense } from 'react';
import { Route, Switch, Router } from "react-router-dom";
import { useSelector } from "react-redux";
import { Spin } from "antd"
import history from "../history"
import Login from "../pages/LoginPage";
import LandingPage from "../pages/LandingPage";
import RegisterPage from "../pages/registerPage";
import NavBar from "../pages/navbar/navBar";
import MovieDetail from "../pages/movie/movie"
import Auth from "./auth";
import FavouritePage from "../pages/movie/favouritePage";
import TvShows from "../pages/tv/tvShows";
import TvDetailed from "../pages/tv/tvDetail";

import Home from "../pages/Home"

function App() {
  const pendingRequests = useSelector(state => state.pendingRequests)
  const loading = pendingRequests > 0 ? true : false
  return (
    <div>
      <NavBar />
      <div style={{ paddingTop: '69px', minHeight: 'calc(100vh - 80px)' }}>
        <Router history={history} >
          <Switch>
            <Route path="/movies" exact component={Auth(LandingPage, null)} />
            <Route path="/" exact component={Auth(Home, null)} />
            <Route path="/register" exact component={Auth(RegisterPage, false)} />
            <Route path="/login" exact component={Auth(Login, false)} />
            <Route path="/movie/:movieId" exact component={Auth(MovieDetail, null)} />
            <Route path="/favourite" exact component={Auth(FavouritePage, null)} />
            <Route path="/tvShows" exact component={Auth(TvShows, null)} />
            <Route path="/tvShows/:showId" exact component={Auth(TvDetailed, null)} />
          </Switch>
        </Router>
        {loading && <Spin spinning={true} size="large" />}
      </div>
    </div >
  );
}

export default App;
