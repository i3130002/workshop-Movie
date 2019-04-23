import React from 'react';
import { MoviesLayout } from './Movies.Layout';
import { Button } from 'react-bootstrap';

export class MoviesEdit extends React.Component {
    constructor(props) {
        super(props)

        this.state = { MoviesCreateMessage: null, popOver: false };
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            show: false,
        };
    }

    handleSubmit(formData) {
        fetch('/api/Movies/' + formData.oldName + '/' + formData.oldPublished, {
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
                        MoviesCreateMessage: < div className="alert alert-success" >
                            <strong>Success!</strong> Movie Added
                        <p>{JSON.stringify(formData)}</p>
                        </div >
                    })
                    this.props.refreshHandler(data)
                } else {
                    console.log(data)
                    this.setState({
                        MoviesCreateMessage:
                            < div className="alert alert-danger" >
                                <strong>Error!</strong> Problem adding movie (code: {data.status}) {data.statusText}.</div >
                    })

                }
                this.handleClose()

            })

    }

    handleClose() {
        this.setState({ show: false });
    }

    handleShow() {
        this.setState({ show: true });
    }

    render() {
        let modal = this.state.show ?
            <MoviesLayout heading="Edit Movie Dialog" show={this.state.show} handleClose={this.handleClose}
                movie={this.props.movie} onSubmit={this.handleSubmit} />
            : null

        return (
            <div>
                <Button variant="primary" onClick={this.handleShow}>
                    Edit
                </Button>
                {modal}
                
            </div>
        );
    }
}
