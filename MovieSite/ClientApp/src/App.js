import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { Movies } from './components/Movies';
import { MoviesViewAll } from './components/Movies.ViewAll';
import { MoviesRemove } from './components/Movies.Remove';
import { MoviesEdit } from './components/Movies.Edit';
import { NotFound } from './components/NotFound';

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/counter' component={Counter} />
        <Route path='/fetch-data' component={FetchData} />
            <Route path='/Movies' component={Movies} />
            <Route path='/MoviesViewAll' component={MoviesViewAll} />
            <Route path='/MoviesRemove' component={MoviesRemove} />
            <Route path='/MoviesEdit' component={MoviesEdit} />
            {<Route path='*' component={NotFound} />
            }

      </Layout>
    );
  }
}
