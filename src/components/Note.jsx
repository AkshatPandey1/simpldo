import React, {useState} from "react";


function BigNote(props) {
    let [noteContent, setNote] = useState({
        title: props.title,
        content: props.content,
        lastEdit: new Date().getTime(),
    });

    function handleChange(event) {
        let {value, id} = event.target;
        console.log(value);

        if (id === "note_title") {
            setNote({
                ...noteContent,
                title: value,
                lastEdit: new Date().getTime()
            });
        } else {
            setNote({
                ...noteContent,
                content: value,
                lastEdit: new Date().getTime()
            });
        }
    }

    function handleClick(){
        props.addNote(noteContent);
        setNote({
            title: "Note Title",
            content: "Type content here",
            lastEdit: new Date().getTime()
        });
    }


    return (
        <div className="note">
            <input type={"text"} className={"note_title"} id={"note_title"} onInput={handleChange}
                   value={noteContent.title} spellCheck={false}/>
            <textarea className={"note_content"} id={"note_content"} onInput={handleChange}
                      value={noteContent.content} spellCheck={false}/>
            <button type="button" className="btn btn-outline-primary" onClick={handleClick}>Add Note</button>
        </div>
    );
}

export default BigNote;
