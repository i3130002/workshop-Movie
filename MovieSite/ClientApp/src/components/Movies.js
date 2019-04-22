import React, { Component } from 'react';
import { MoviesTable } from "./Movies.ViewAll.js"
import { MoviesCreate } from "./Movies.Create.js"

export class Movies extends Component {
    constructor(props) {
        super(props)
        this.state = { MoviesTablerefresh: false }
        this.dataFetchHandler = this.dataFetchHandler.bind(this);
    }

    dataFetchHandler(data) {
        this.setState({ MoviesTablerefresh: !this.state.MoviesTablerefresh })
    }

    render() {
        return (
            <div>
                <h1>Wellcome to Movies section</h1>

                <p>You can DO following:</p>
                <ul>
                    <li><strong>View All </strong><a href='/MoviesViewAll'>Click here</a></li>
                    <li><strong>Show by index </strong><a href='https://facebook.github.io/react/'>Click here</a></li>
                    <li><strong>ADD new </strong><a href='https://facebook.github.io/react/'>Click here</a></li>
                    <li><strong>Remove </strong><a href='http://getbootstrap.com/'>Click here</a></li>
                </ul>

                <div className="MoviesViewAll_TableOnly">

                    <br />
                    <p> Here you have the whole data table</p>
                    <MoviesTable refresh={this.state.MoviesTablerefresh} />
                </div>

                <div className="CreateMovies">

                    <br />
                    <p> Here you can Create new Movie</p>
                    <MoviesCreate onFetch={this.dataFetchHandler}/>
                </div>

            </div>


        );
    }
}
