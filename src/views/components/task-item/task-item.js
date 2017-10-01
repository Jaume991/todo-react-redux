import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Button from '../button';
import Icon from '../icon';

import './task-item.css';


export class TaskItem extends Component {
  constructor() {
    super(...arguments);

    this.state = {editing: false, title: this.props.task.title, price: this.props.task.price};

    this.edit = this.edit.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.remove = this.remove.bind(this);
    this.save = this.save.bind(this);
    this.stopEditing = this.stopEditing.bind(this);
    this.toggleStatus = this.toggleStatus.bind(this);
  }

  edit() {
    this.setState({editing: true});
  }

  handleKeyUp(event) {
    if (event.keyCode === 13) {
      this.save(event);
    }
    else if (event.keyCode === 27) {
      this.stopEditing();
    }
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  remove() {
    this.props.removeTask(this.props.task);
  }

  save(event) {
    if (this.state.editing) {
      const { task } = this.props;

      console.log(this.state.title);
      console.log(this.state.price);
      if (this.state.title.length && this.state.title !== task.title) {
        this.props.updateTask(task, {title: this.state.title, price: this.state.price});
      }

      this.stopEditing();
    }
  }

  stopEditing() {
    this.setState({editing: false});
  }

  toggleStatus() {
    const { task } = this.props;
    this.props.updateTask(task, {completed: !task.completed});
  }

  renderValues(task) {
    return (
      <div className="cell">
        <div className="task-item__title" tabIndex="0">
            {task.title} - {task.price}
        </div>
      </div>
    );
  }

  renderInput(task) {
    return (
      <div className="cell">
        <form noValidate>
        <input
            autoComplete="off"
            autoFocus
            className="task-item__input"
            defaultValue={task.title}
            name="title"
            maxLength="64"
            onChange={this.handleChange}
            onKeyUp={this.handleKeyUp}
            type="text"
        />
        <input
          autoComplete="off"
          autoFocus
          className="task-item__input"
          defaultValue={task.price}
          maxLength="64"
          onChange={this.handleChange}
          onKeyUp={this.handleKeyUp}
          type="text"
          name="price"
        />
        </form>
      </div>
    );
  }

  render() {
    const { editing } = this.state;
    const { task } = this.props;

    let containerClasses = classNames('task-item', {
      'task-item--completed': task.completed,
      'task-item--editing': editing
    });

    return (
      <div className={containerClasses} tabIndex="0">
        <div className="cell">
          <Button
            className={classNames('btn--icon', 'task-item__button', {'active': task.completed, 'hide': editing})}
            onClick={this.toggleStatus}>
            <Icon name="done" />
          </Button>
        </div>

        {editing ? this.renderInput(task) : this.renderValues(task)}

        <div className="cell">
          <Button
            className={classNames('btn--icon', 'task-item__button', {'hide': editing})}
            onClick={this.edit}>
            <Icon name="mode_edit" />
          </Button>
          <Button
            className={classNames('btn--icon', 'task-item__button', {'hide': !editing})}
            onClick={this.stopEditing}>
            <Icon name="clear" />
          </Button>
          <Button
            className={classNames('btn--icon', 'task-item__button', {'hide': editing})}
            onClick={this.remove}>
            <Icon name="delete" />
          </Button>
        </div>
      </div>
    );
  }
}

TaskItem.propTypes = {
  removeTask: PropTypes.func.isRequired,
  task: PropTypes.object.isRequired,
  updateTask: PropTypes.func.isRequired
};


export default TaskItem;
