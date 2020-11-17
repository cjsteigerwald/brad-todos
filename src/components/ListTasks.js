import React, { Component } from 'react';
import { FaEdit, FaTimes } from 'react-icons/fa';
import Moment from 'react-moment';
import EditTask from './EditTask';

class ListTasks extends Component {
  constructor() {
    super();
    this.state = {
      itemName: '',
      dueDate: '',
      status: '',
      id: '',
    };    
  }

  render() {
    return (
      <div className="task-list item-list mb-3">
        {this.props.tasks.map(item => (
          <div className="todo-item col media py-3" key={item.taskId}>
            <div className="mr-1">
              <button
                className="task-edit btn btn-sm btn-primary"
                onClick={(e) => this.props.toggleEdit(item.taskId)}
              >
                <FaEdit />
              </button>
            </div>
            <div className="mr-2">
              <button
                  className="task-delete btn btn-sm btn-danger"
                  onClick={() => this.props.deleteTaskItem(item)}>
                    <FaTimes />
                </button>
              </div>

                <div className="task-info media-body">
                  <div className="task-head d-flex">
                    <span
                      className="task-name">
                      {item.itemName}
                    </span>
                    <span className="due-date ml-auto">
                      Due Date:
                      <Moment
                        date={item.dueDate}
                        parse="YYYY-MM-DD"
                        format="MM-DD-YYYY"
                      />
                    </span>
                  </div>

                  <div
                    className="status">
                    {item.status}
                  </div>
                    <EditTask item={item} handleEdit={this.props.handleEdit} 
                    />
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default ListTasks;
