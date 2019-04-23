import React from 'react';
import { Form, Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal'

export class MoviesLayout extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            movie: this.props.movie ?
                {
                    name: this.props.movie.name ? this.props.movie.name : "",
                    oldName: this.props.movie.name ? this.props.movie.name : "",
                    published: this.props.movie.published ? this.props.movie.published : "",
                    oldPublished: this.props.movie.published ? this.props.movie.published : "",
                    director: this.props.movie.director ? this.props.movie.director : "",
                    description: this.props.movie.description ? this.props.movie.description : "",
                }
                :
                { name: '', published: '', director: '', description: ''}
            }
        
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        console.log("handleInputChange " + name + ":" + value)
        var movie_ = this.state.movie
        movie_[name] = value

        this.setState({
            movie: movie_
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        var state_ = this.state
        this.setState({ movie: { name: "", published: "", director: "", description: "" } })
        this.props.onSubmit(state_.movie)
    }

    render() {
        return (
            <div className="modal fade" id="mymodal" role="dialog">
                
                <Modal show={this.props.show} onHide={this.props.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.props.heading}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Group controlId="name" >
                                <Form.Label>Movie Name</Form.Label>
                                <Form.Control value={this.state.movie.name ? this.state.movie.name : ""} type="text" name="name" placeholder="Enter name" onChange={this.handleInputChange} />
                            </Form.Group>

                            <Form.Group controlId="published">
                                <Form.Label>Published date time</Form.Label>
                                <Form.Control value={this.state.movie.published ? this.state.movie.published : ""} type="date" name="published" placeholder="Enter Published" onChange={this.handleInputChange} />
                            </Form.Group>

                            <Form.Group controlId="director">
                                <Form.Label>Director</Form.Label>
                                <Form.Control value={this.state.movie.director ? this.state.movie.director : ""} type="text" name="director" placeholder="Enter director" onChange={this.handleInputChange} />
                            </Form.Group>

                            <Form.Group controlId="description">
                                <Form.Label>Description</Form.Label>
                                <Form.Control value={this.state.movie.description ? this.state.movie.description : ""} type="text" name="description" placeholder="Enter description" onChange={this.handleInputChange} />
                            </Form.Group>

                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.props.handleClose}>
                            Close
                    </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}
