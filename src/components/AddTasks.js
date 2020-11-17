import React, { Component } from 'react';
import { FaPlus } from 'react-icons/fa';

class AddTasks extends Component {
  constructor() {
    super();
    this.state = {
      itemName: '',
      dueDate: '',
      status: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
  }

  handleAdd(e) {
    e.preventDefault();
    let tempTask = {
      itemName: this.state.itemName,
      dueDate: this.state.dueDate,
      status: this.state.status, 
      editMode: false
    };

    this.props.addTask(tempTask);

    this.setState({
      itemName: '',
      dueDate: '',
      status: ''
    });
    this.props.toggleForm();
  }

  handleChange(e) {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  statusHandler = e => {
    const tempStatus = e.target.innerHTML;
    this.setState( {status: tempStatus} )
  }

  render() {
    return (
      <div
        className={
          'card textcenter mt-3 ' +
          (this.props.formDisplay ? '' : 'add-task')
        }
      >
        <div
          className="apt-addheading card-header bg-primary text-white"
          onClick={this.props.toggleForm}
        >
          <FaPlus /> Add Task
        </div>

        <div className="card-body">
          <form id="taskForm" noValidate onSubmit={this.handleAdd}>
            <div className="form-group form-row">
              <label
                className="col-md-2 col-form-label text-md-right"
                htmlFor="itemName"
                readOnly
              >
                Todo:
              </label>
              <div className="col-md-10">
                <input
                  type="text"
                  className="form-control"
                  name="itemName"
                  placeholder="Task"
                  value={this.state.itemName}
                  onChange={this.handleChange}
                />
              </div>
            </div>

            <div className="form-group form-row">
              <label
                className="col-md-2 col-form-label text-md-right"
                htmlFor="dueDate"
              >
                Due Date
              </label>
              <div className="col-md-4">
                <input
                  type="date"
                  className="form-control"
                  name="dueDate"
                  id="dueDate"
                  value={this.state.dueDate}
                  onChange={this.handleChange}
                />
              </div>
              <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Status
              </button>
              <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <button className="dropdown-item" type="button" value={this.state.status} onClick={this.statusHandler} >Not Started</button>
                <button className="dropdown-item" type="button" value={this.state.status} onClick={this.statusHandler} >In Progress</button>
                <button className="dropdown-item" type="button" value={this.state.status} onClick={this.statusHandler} >Completed</button>
              </div>
            </div>

            <div className="form-group form-row mb-0">
              <div className="offset-md-2 col-md-10">
                <button
                  type="submit"
                  className="btn btn-primary d-block ml-auto"
                >
                  Add Task
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default AddTasks;
