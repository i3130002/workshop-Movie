import React from 'react';

export class MoviesRemove extends React.Component {
    constructor(props) {
        super(props);

        this.state = { MoviesList: [], loading: true };

        this.fetchMovies = this.fetchMovies.bind(this);
        this.removeBtnHandler = this.removeBtnHandler.bind(this);
        this.renderMoviesTable = this.renderMoviesTable.bind(this);

    }
    componentDidMount() {
        this.fetchMovies()
    }

    componentDidUpdate(prevProps) {
        if (prevProps.refresh !== this.props.refresh) {
            this.fetchMovies();
        }
    }
    fetchMovies() {
        fetch('api/Movies')
            .then(response => response.json())
            .then(data => {
                this.setState({ MoviesList: data, loading: false });
            });
        console.log("fetchMovies")
    }
    renderMoviesTable(data) {
        return (
            <table className='table table-striped'>
                <thead>
                    <tr>
                        <th>Remove</th>
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
                                <td ><button onClick={this.removeBtnHandler.bind(this, row_['name'], row_['published'])} className="btn btn-danger" >X</button></td>
                                {Object.values(row_).map((item, index_) => <td key={"MoviesItem" + index + index_}>{item}</td>)}
                            </tr>
                        )}
                </tbody>
            </table>
        );
    }

    removeBtnHandler(name, published) {
        console.log({ "name": name, "published": published })
        console.log(JSON.stringify({ "name": name, "published": published }))
        fetch('/api/Movies/' + name + '/' + published, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        }).then(e => console.log(e.status == 'ok'? "Removed":"Error"))
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderMoviesTable(this.state.MoviesList);
        return (
            <div>
                {contents}
            </div>
        );
    }
}
