import React, {useState} from "react";


function ToDoList(props) {

    return (
        <div className="list">
            <h2>{props.title}</h2>
            <div className="container tasks">
                <div className="row">
                    <div className="col col-sm-9 title center">
                        <p>Task</p>
                    </div>
                    <div className="col col-sm-3 title center">
                        <p>Due</p>
                    </div>
                </div>
                {
                    props.tasks.map((task, index) => {
                    return (
                        <div className="row task" onClick={() => props.func(props.id, index)}>
                            <div className="col col-sm-9 task">
                                <li>{task.title}</li>
                            </div>
                            <div className="col col-sm-3 center">
                                <li>
                                    {props.title !== "Today" ?
                                        task.date.toLocaleDateString('en-US', {day: "numeric", month: "short"}) :
                                        task.date.toLocaleTimeString('en-US', {hour: "numeric"})}
                                </li>
                            </div>
                        </div>
                    )})
                }

            </div>
        </div>
    );
}

export default ToDoList;