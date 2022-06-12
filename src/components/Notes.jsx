import React, {useState, useEffect} from "react";
import BigNote from "./Note"
import SNote from "./SNote";
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

function writeUsersNotes(username, notes) {
    const db = getDatabase(app);
    set(ref(db, 'users/' + username + '/note_list'), notes);
}

function Notes(props) {
    let [allNotes, setAllNotes] = useState([]);

    useEffect(() => {
        const db = ref(getDatabase());
        get(child(db, `users/${props.uname}/note_list`)).then((snapshot) => {
            if (snapshot.exists()) {
                setAllNotes(snapshot.val());
            } else {
                console.log("Hello there");
            }
        }).catch((err) => {
            console.log(err);
        })
    }, []);

    function getNote(id) {
        let note = allNotes[id];
        document.querySelector(".note .note_title").value = note.title;
        document.querySelector(".note .note_content").value = note.content;
    }

    function addNote(note) {
        setAllNotes([note, ...allNotes]);
        writeUsersNotes(props.uname, [note, ...allNotes]);
    }

    function deleteNote(id) {
        let newNotes = allNotes.filter((val, index) => {
            return id !== index;
        })
        setAllNotes(newNotes);
        writeUsersNotes(props.uname, newNotes);
    }

    return (
        <div className="notes">
            <h1>Notes</h1>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col col-lg-8 col-md-12 col-sm-12 d-flex justify-content-center">
                        <BigNote title="Note Title" content="Type content here" addNote={addNote}/>
                    </div>
                    <div className="col col-lg-4 col-md-12 col-sm-12 d-flex justify-content-center">
                        <div className="allNotes">
                            {allNotes.length > 0 ? (allNotes.map((val, index) => {
                                return (
                                    <SNote id={index} title={val.title} content={val.content} date={val.lastEdit}
                                           del={deleteNote} get={getNote}/>
                                )
                            })) : (<h1>No added notes</h1>)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Notes;
