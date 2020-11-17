import React, { useState } from 'react';

const EditTask = ({item, handleEdit}) =>  {
    const {itemName, status, dueDate, taskId, editMode} = item;
    const [taskItemName, setTaskItemName] = useState(itemName);
    const [taskdueDate, setTaskDueDate] = useState(dueDate);
    const [taskStatus, setTaskStatus] = useState(status);
      
    return (
        <>
        <div
            className={
                'card textcenter mt-0 ' +
                (!editMode ? 'add-task' : '')
            }
            >
                <div className="card-body">
                <form id="editForm" noValidate >
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
                        value={taskItemName}
                        onChange={e => setTaskItemName(e.target.value)}
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
                        value={taskdueDate}
                        onChange={e => setTaskDueDate(e.target.value)}
                        />
                    </div>
                    <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Status
                    </button>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <button className="dropdown-item" type="button" value={'Not Started'} onClick={e => setTaskStatus(e.target.value)} >Not Started</button>
                        <button className="dropdown-item" type="button" value={'In Progress'} onClick={e => setTaskStatus(e.target.value)} >In Progress</button>
                        <button className="dropdown-item" type="button" value={'Completed'} onClick={e => setTaskStatus(e.target.value)} >Completed</button>
                    </div>
                    </div>
                   <button type="submit" className='btn btn-primary d-block ml-auto' onClick={e => handleEdit(e, {
                       itemName: taskItemName,
                       dueDate: taskdueDate,
                       status: taskStatus,
                       taskId: taskId,
                       editMode: editMode,
                   })}>
                       Update Task
                   </button>
                </form>
            </div>
        </div>
        </>      
    )
}

export default EditTask;
