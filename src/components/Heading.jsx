import React, {useState} from "react";
function Heading(props) {

    function getDate() {
        return (new Date().toLocaleTimeString('en-US', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric'
        }))
    }

    let [date, setDate] = useState(getDate());
    setInterval(() => setDate(getDate()), 1000);

    return (
        <div className="heading">
            <h1>Hello {props.name}!</h1>
            <p>{date}</p>
        </div>
    );
}

export default Heading;