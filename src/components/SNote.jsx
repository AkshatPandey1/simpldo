import React from "react";

function SNote(props) {

    function handleClick(event) {
        let id = event.target.id;

        if (id === "getNote") {
            props.get(props.id);
        } else {
            props.del(props.id);
        }
    }

    return (
        <div className="SNote" style={{height: "250px", width: "400px"}}>
            <h1 className={"note_title"}>{props.title}</h1>
            <p className={"note_content"}>{props.content.slice(0, 50) + '...'}</p>
            <p className={"note_date"}>Last edited: {new Date(props.date).toLocaleString('UK-en')}</p>
            <button type="button" id={"getNote"} className="btn btn-outline-success" onClick={handleClick}>Get Note</button>
            <button type="button" id={"deleteNote"} className="btn btn-outline-danger" onClick={handleClick}>Delete Note</button>
        </div>
    );
}

export default SNote;
