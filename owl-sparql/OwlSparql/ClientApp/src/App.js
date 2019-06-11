import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import GetPlacesThatServeBreakfastAndTea from './components/FoursquareSPARQL/GetPlacesThatServeBreakfastAndTea';
import GetPlacesWithSocialMedia from './components/FoursquareSPARQL/GetPlacesWithSocialMedia';
import GetAllLikesForDinnerPlace from './components/FoursquareSPARQL/GetAllLikesForDinnerPlace';
import GetTopTenRecentPosts from './components/RedditSPARQL/GetTopTenRecentPosts';
import Parametered from './components/RedditSPARQL/Parametered';

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/first-sparql' component={GetPlacesThatServeBreakfastAndTea} />
        <Route path='/second-sparql' component={GetPlacesWithSocialMedia} />
        <Route path='/third-sparql' component={GetAllLikesForDinnerPlace} />
        <Route path='/fourth-sparql' component={GetTopTenRecentPosts} />
        <Route path='/fifth-sparql' component={Parametered} />
      </Layout>
    );
  }
}
