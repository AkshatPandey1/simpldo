import React, {useEffect, useState} from "react";
import ToDoList from "./ToDoList";
import deepCopy from "deep-copy-all";
// Import the functions you need from the SDKs you need
import {getDatabase, ref, set, child, get} from "firebase/database";
import {initializeApp} from "firebase/app";

const firebaseConfig = {

    apiKey: process.env.REACT_APP_APIKY,

    authDomain: process.env.REACT_APP_AUTHD,

    databaseURL: process.env.REACT_APP_DBURL,

    projectId: process.env.REACT_APP_PROID,

    storageBucket: process.env.REACT_APP_STOBU,

    messagingSenderId: process.env.REACT_APP_MSSID,

    appId: process.env.REACT_APP_APPID,

    measurementId: process.env.REACT_APP_MESID

};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

function writeUserData(username, name, tasks) {
    let new_tasks = deepCopy(tasks);
    new_tasks.forEach((task, index, arr) => {
        arr[index] = {
            title: task.title,
            date: task.date.getTime()
        }
    });
    const db = getDatabase(app);
    set(ref(db, 'users/' + username), {
        name: name,
        task_list: [{title: "base_task", date: new Date().getTime()}].concat(new_tasks)
    });
}

function ToDo() {


    let [taskList, setAllTasks] = useState([]);

    let [date, setDate] = useState(new Date(new Date().toDateString()));
    let [todayTasks, setTodayTask] = useState([]);
    let [overdueTasks, setOverdueTask] = useState([]);
    let [laterTasks, setLaterTask] = useState([]);

    useEffect(() => {
        const db = ref(getDatabase());
        get(child(db, `users/${"AP3"}/task_list`)).then((snapshot) => {
            if (snapshot.exists()) {
                let array = deepCopy(snapshot.val())
                array.forEach((task, index, arr) => {
                    arr[index] = {
                        ...task,
                        date: new Date(task.date)
                    }
                })

                function setTasks(tasks) {
                    setAllTasks(tasks);

                    setTodayTask(tasks.filter((task) => {
                        let todayDate = new Date();
                        let taskDate = task.date;
                        return (
                            todayDate.toDateString() === taskDate.toDateString() &&
                            todayDate.getTime() < taskDate.getTime()
                        );
                    }).sort((a, b) => (a.date > b.date) ? 1 : 0));

                    setOverdueTask(tasks.filter((task) => {
                        let todayDate = new Date();
                        let taskDate = task.date;
                        return (
                            todayDate > taskDate
                        );
                    }).sort((a, b) => (a.date > b.date) ? 1 : 0));

                    setLaterTask(tasks.filter((task) => {
                        let todayDate = new Date();
                        let taskDate = task.date;
                        return (
                            todayDate < taskDate && todayDate.toDateString() !== taskDate.toDateString()
                        );
                    }).sort((a, b) => (a.date > b.date) ? 1 : 0));
                }

                setTasks(array.slice(1));
            } else {
                console.log("Hello there");
            }
        }).catch((err) => {
            console.log(err);
        })
    }, [])


    let [task, setTask] = useState({
        title: "",
        date: new Date(new Date().toDateString())
    })




    function handleChange(event) {
        let {value, id} = event.target;
        event.preventDefault();

        if (id === "title") {
            setTask({
                ...task,
                title: value
            })
        } else if (id === "date") {
            let dateInput = new Date(value);
            dateInput = new Date(dateInput.getFullYear(), dateInput.getMonth(), dateInput.getDate(), 0);
            setTask({
                ...task,
                date: dateInput
            })
            setDate(dateInput);
        } else {
            try {
                let hours = Number(value.slice(0, 2));
                let minutes = Number(value.slice(3, 5));
                setTask({
                    ...task,
                    date: new Date(date.getTime() + hours * 60 * 60 * 1000 + minutes * 60 * 1000)
                })
            } catch (err) {
                setTask(task);
            }
        }
    }

    function handleClick(task) {
        if (task.title === "") {
            alert("No task provided!");
            return;
        }

        let newList = [...taskList, task];
        setAllTasks(newList);
        writeUserData("AP3", "Akshat Pandey", newList);

        let todayDate = new Date();
        let taskDate = task.date;
        if (todayDate > taskDate) {
            setOverdueTask([...overdueTasks, task].sort((a, b) => (a.date > b.date) ? 1 : 0));
            setTask({title: "", date: new Date()})
        } else if (todayDate.toDateString() === taskDate.toDateString() && todayDate.getTime() < taskDate.getTime()) {
            setTodayTask([...todayTasks, task].sort((a, b) => (a.date > b.date) ? 1 : 0));
        } else {
            setLaterTask([...laterTasks, task].sort((a, b) => (a.date > b.date) ? 1 : 0))
        }
        setTask({
            title: "",
            date: new Date(new Date().toDateString())
        })
        setDate(new Date(new Date().toDateString()));
        document.querySelector("#time").value = "00:00";

    }


    let functions = [setOverdueTask, setTodayTask, setLaterTask];
    let lists = [overdueTasks, todayTasks, laterTasks];

    async function deleteTask(funcID, id) {
        let alteredList = lists[funcID];
        alteredList = alteredList.filter((val, index) => {
            return id !== index;
        })

        let unAlteredLists = lists.filter((val, index) => {
            return id !== index;
        })

        functions[funcID](alteredList);

        let newList = alteredList.concat(unAlteredLists[0]).concat(unAlteredLists[1]);
        setAllTasks(newList);
        writeUserData("AP3", "Akshat Pandey", newList);

    }

    function handleKeyPress(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
        }
    }


    return (
        <div className="lists">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col col-lg-4 col-md-12 col-sm-12 d-flex justify-content-center">
                        <ToDoList title="Overdue" tasks={overdueTasks} func={deleteTask} id={0}/>
                    </div>
                    <div className="col col-lg-4 col-md-12 col-sm-12 d-flex justify-content-center">
                        <ToDoList title="Today" tasks={todayTasks} func={deleteTask} id={1}/>
                    </div>
                    <div className="col col-lg-4 col-md-12 col-sm-12 d-flex justify-content-center">
                        <ToDoList title="Later" tasks={laterTasks} func={deleteTask} id={2}/>
                    </div>
                </div>
            </div>

            <form className="add-task d-flex justify-content-center">
                <div className="input-group">
                    <span className="input-group-text bg-info" id="taskName">New Task</span>
                    <input type="text" className="form-control" aria-label="Sizing example input" onInput={handleChange}
                           autoFocus={true} aria-describedby="inputGroup-sizing-default" onKeyDown={handleKeyPress}
                           placeholder={"Task name"} id="title" value={task.title}/>
                </div>
                <div className="input-group">
                    <span className="input-group-text bg-info" id="taskName">Deadline</span>
                    <input type={"date"} className="form-control" aria-label="Sizing example input"
                           onInput={handleChange}
                           aria-describedby="inputGroup-sizing-default" id="date"
                           value={task.date.toLocaleDateString()}/>
                    <input type={"time"} className="form-control" aria-label="Sizing example input" min={0} max={23}
                           aria-describedby="inputGroup-sizing-default" placeholder={"Time (hour)"} id="time"
                           onInput={handleChange} onKeyDown={handleKeyPress}/>
                </div>
                <button type="button" className="btn btn-info" onClick={() => (handleClick(task))}>Add</button>
            </form>

        </div>

    );
}

export default ToDo;