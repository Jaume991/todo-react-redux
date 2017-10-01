import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './task-form.css';


export class TaskForm extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired
  };

  constructor() {
    super(...arguments);

    this.state = {title: '', price: '', date: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  clearInput() {
    this.setState({title: '', price: ''});
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  handleKeyUp(event) {
    if (event.keyCode === 27) this.clearInput();
  }

  handleSubmit(event) {
    event.preventDefault();
    const title = this.state.title.trim();
    const price = this.state.price.trim();
    if (title.length && price.length) {
      this.props.handleSubmit(title, price);
      this.clearInput();
    }
  }

  render() {
    return (
      <form className="task-form" onSubmit={this.handleSubmit} noValidate>
        <input
          autoComplete="off"
          autoFocus
          className="task-form__input"
          maxLength="64"
          onChange={this.handleChange}
          onKeyUp={this.handleKeyUp}
          placeholder="Name the expense"
          ref={e => this.titleInput = e}
          name="title"
          type="text"
          value={this.state.title}
        />
        <input
          autoComplete="off"
          autoFocus
          className="task-form__input"
          maxLength="64"
          onChange={this.handleChange}
          onKeyUp={this.handleKeyUp}
          placeholder="Price"
          ref={e => this.priceInput = e}
          type="text"
          name="price"
          value={this.state.price}
        />
        <input type="submit" style={{visible: 'none', position: 'absolute', zIndex: '-9999'}}/>
      </form>
    );
  }
}


export default TaskForm;
