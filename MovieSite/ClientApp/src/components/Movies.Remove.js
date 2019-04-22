import React from 'react';

export class MoviesRemove extends React.Component {
    constructor(props) {
        super(props);
        this.removeBtnHandler = this.removeBtnHandler.bind(this)
    }
   
    fetchMovies() {
        
        fetch('api/Movies')
            .then(response => response.json())
            .then(data => {
                this.setState({ MoviesList: data, loading: false });
            });
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
                                <td ><button onClick={this.removeBtnHandler(row_['name'], row_['published'])} className="btn btn-danger" >X</button></td>
                                {Object.values(row_).map((item, index_) => <td key={"MoviesItem" + index + index_}>{item}</td>)}
                            </tr>
                        )}
                </tbody>
            </table>
        );
    }

    removeBtnHandler(name, published) {
        console.log({ "name": name, "published": published })
        fetch('/api/Movies/' + name + '/' + published, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        }).then(e => {
            this.props.refreshHandler(e)
        })

    }

    render() {
        let movieName = this.props.movieName
        let moviePublished = this.props.moviePublished

        return (
            <div>
                <button onClick={this.removeBtnHandler.bind(this, movieName, moviePublished)} className="btn btn-danger" >X</button>
            </div>
        );
    }
}
