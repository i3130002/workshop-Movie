import React, { Component } from 'react';
import { MoviesRemove } from "./Movies.Remove.js"
import { MoviesEdit } from "./Movies.Edit.js"

export class MoviesViewAll extends Component {
    render() {
        
        return (
            <div>
                <h1>Wellcome to View All Movies</h1>

                <p>Here is the list of all Movies</p>

                <MoviesTable refresh='false' />
            </div>
        );
    }
}
export class MoviesTable extends Component {
    static displayName = MoviesViewAll.name;

    constructor(props) {
        super(props);
        this.state = { forecasts: [], loading: true, refresh: false, RemoveMessage:null };
        this.fetchMovies = this.fetchMovies.bind(this);
        this.renderForecastsTable = this.renderForecastsTable.bind(this);
        this.removeRrefreshHandler = this.removeRrefreshHandler.bind(this);

    }

    fetchMovies() {
        fetch('api/Movies')
            .then(response => response.json())
            .then(data => {
                this.setState({ forecasts: data, loading: false });
            });
    }
    componentDidMount() {
        this.fetchMovies();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.refresh !== this.props.refresh) {
            this.fetchMovies();
        }
        if (
            prevState.refresh !== this.state.refresh) {
            this.fetchMovies();
        }
    }

    removeRrefreshHandler(data) {
        if (data.ok) {
            this.setState({
                RemoveMessage: < div className="alert alert-success" >
                    <strong>Success!</strong> Movie removed
                </div >,
                refresh: !this.state.refresh
            })
        } else {
            console.log(data)
            this.setState({
                RemoveMessage:
                    < div className="alert alert-danger" >
                        <strong>Error!</strong> Problem adding movie (code: {data.status}) {data.statusText}.</div >,
                refresh: !this.state.refresh
            })

        }

    }

    renderForecastsTable(data) {
        return (
            <table className='table table-striped'>
                <thead>
                    <tr>
                        {
                            Object.keys(data[0]).map(key =>
                                <th key={key}>{key}</th>
                            )
                        }
                    </tr>
                </thead>
                <tbody key="tbody">
                    {

                        data.map((row_, index) =>
                            <tr key={"Movies" + index}>
                                <td><MoviesEdit refreshHandler={this.removeRrefreshHandler} movie={row_}/></td>
                                {Object.values(row_).map((item, index_) => <td key={"MoviesItem" + index + index_}>{item}</td>)}
                                <td><MoviesRemove refreshHandler={this.removeRrefreshHandler} movieName={row_['name']} moviePublished={row_['published']} /></td>

                            </tr>
                        )}


                </tbody>
            </table>
        );
    }
    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderForecastsTable(this.state.forecasts);
        return (
            <div>
                {this.state.RemoveMessage}
                {contents}
            </div>
        );
    }
}