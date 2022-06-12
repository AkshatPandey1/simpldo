import React, {useState} from "react";

function Login(props) {

    let [user, setUser] = useState({
        username: "",
        name: ""
    });


    function handleChange(event) {
        let {id, value} = event.target;

        if (id === "username") {
            setUser({
                ...user,
                username: value
            })
        } else {
            setUser({
                ...user,
                name: value
            })
        }
    }


    return (
        <div className="login">

            <div className="sidenav">
                <div className="login-main-text">
                    <h2>Application <br/> Login Page</h2>
                </div>
            </div>
            <div className="main">
                <div className="col-md-12 col-sm-12 justify-content-center">
                    <div className="login-form">
                        <form>
                            <div className="form-group">
                                <label>User Name</label>
                                <input type="text" id={"username"} className="form-control" placeholder="User Name"
                                       onInput={handleChange} value={user.username}/>
                            </div>

                            <br/>
                            <button type="submit" className="btn btn-outline-dark" onClick={() => props.func(user)}>
                                View Profile
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;