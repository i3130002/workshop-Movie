import React from 'react';
import { MoviesLayout } from './Movies.Layout';
import {  Button } from 'react-bootstrap';

export class MoviesCreate extends React.Component {
    constructor(props) {
        super(props)

        this.state = { MoviesCreateMessage: null };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleShow = this.handleShow.bind(this);
    }

    handleSubmit(formData) {
        fetch('/api/Movies', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        })
            .then(data => {
                if (data.ok) {
                    this.setState({
                        MoviesCreateMessage: < div className= "alert alert-success" > 
                            <strong>Success!</strong> Movie Added
                        <p>{JSON.stringify(formData)}</p>
                            </div > })
                    this.props.onFetch(data)
                } else {
                    console.log(data)
                    this.setState({
                        MoviesCreateMessage: 
                            < div className= "alert alert-danger" >
                                <strong>Error!</strong> Problem adding movie (code: {data.status}) {data.statusText}.</div >
                    })

                }
            })
        this.handleClose()
    }

    handleClose() {
        this.setState({ show: false });
    }

    handleShow() {
    this.setState({ show: true });
    }

    render() {
    let modal = this.state.show ?
            <MoviesLayout heading="Create Movie Dialog" show={this.state.show} handleClose={this.handleClose}
                onSubmit={this.handleSubmit}/>
            : null
 {/* name="ali" published="1995-01-01" director="MrNnobody" description='' */}
        return (
            <div>

                {this.state.MoviesCreateMessage}
                <Button variant="primary" onClick={this.handleShow}>
                    Create Movie
                </Button>
                {modal}
            </div>
        );
    }
}
