import React, { Component } from 'react';
import '../css/App.css';

import AddTasks from './AddTasks.js';
import SearchTasks from './SearchTasks';
import ListTasks from './ListTasks';

import { without } from 'lodash';

class App extends Component {
  constructor() {
    super();
    this.state = {
      myTodoItems: [],
      formDisplay: false,
      editDisplay: false,
      orderBy: 'itemName',
      orderDir: 'asc',
      queryText: '',
      status: '',
      lastIndex: 0
    };
    this.deleteTaskItem = this.deleteTaskItem.bind(this);
    this.toggleForm = this.toggleForm.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.addTask = this.addTask.bind(this);
    this.changeOrder = this.changeOrder.bind(this);
    this.searchTasks = this.searchTasks.bind(this);
    this.editTask = this.editTask.bind(this);
  }


  handleEdit = (e, updateTask) => {
    e.preventDefault();
    let tempTaskArray = this.state.myTodoItems;
    tempTaskArray = tempTaskArray.map(item => {
      if (item.taskId === updateTask.taskId) {
        return {
          ...updateTask, editMode: false
        }        
      }
      return item;
    })
    this.setState({
      myTodoItems: tempTaskArray
    })
  }  

  toggleForm() {
    this.setState({
      formDisplay: !this.state.formDisplay
    });
  }

  editTask(name, e, taskID) {
    e.preventDefault();
    console.log(name + ': ' + e.target.innerText);
  }

  toggleEdit(taskId) {
    let tempTaskArray = this.state.myTodoItems;
    tempTaskArray = tempTaskArray.map(item => {
      if (item.taskId === taskId) {
        let tempTask = {...item, editMode: !item.editMode}
        return {...tempTask}
      }
      return item
    })
    this.setState({
      myTodoItems: tempTaskArray
    });
  }

  searchTasks(query) {
    this.setState({ queryText: query });
  }

  changeOrder(order, dir) {
    this.setState({
      orderBy: order,
      orderDir: dir
    });
  }

  addTask(task) {
    console.log('In add task: ', task)
    let tempTasks = this.state.myTodoItems;
    task.taskId = this.state.lastIndex;
    tempTasks.unshift(task);
    this.setState({
      myTodoItems: tempTasks,
      lastIndex: this.state.lastIndex + 1
    });
  }

  deleteTaskItem(task) {
    let tempTasks = this.state.myTodoItems;
    tempTasks = without(tempTasks, task);

    this.setState({
      myTodoItems: tempTasks
    });
  }

  componentDidMount() {
    fetch('./data.json')
      .then(response => response.json())
      .then(result => {
        const tasks = result.map(item => {
          item.taskId = this.state.lastIndex;
          this.setState({ lastIndex: this.state.lastIndex + 1 });
          return item;
        });
        this.setState({
          myTodoItems: tasks
        });
      });
  }

  render() {
    let order;
    let filteredTasks = this.state.myTodoItems;
    if (this.state.orderDir === 'asc') {
      order = 1;
    } else {
      order = -1;
    }

    filteredTasks = filteredTasks
      .sort((a, b) => {
        if (
          a[this.state.orderBy].toLowerCase() <
          b[this.state.orderBy].toLowerCase()
        ) {
          return -1 * order;
        } else {
          return 1 * order;
        }
      })
      .filter(eachItem => {
        return (
          eachItem['itemName']
            .toLowerCase()
            .includes(this.state.queryText.toLowerCase())
        );
      });

    return (
      <main className="page bg-white" id="petratings">
        <div className="container">
          <div className="row">
            <div className="col-md-12 bg-white">
              <div className="container">
                <AddTasks
                  formDisplay={this.state.formDisplay}
                  toggleForm={this.toggleForm}
                  addTask={this.addTask}
                />
                <SearchTasks
                  orderBy={this.state.orderBy}
                  orderDir={this.state.orderDir}
                  changeOrder={this.changeOrder}
                  searchTasks={this.searchTasks}
                  tasks={filteredTasks}
                />
                <ListTasks
                  tasks={filteredTasks}
                  deleteTaskItem={this.deleteTaskItem}
                  saveEditTask={this.saveEditTask}
                  toggleEdit={this.toggleEdit}
                  editDisplay={this.state.editDisplay}
                  editTask={this.editTask}
                  handleEdit={this.handleEdit}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default App;
