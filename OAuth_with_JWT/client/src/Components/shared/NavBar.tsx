import { useNavigate } from "react-router-dom";
function NavBar(){
    const navigate = useNavigate();

    const handleLogIn = ()=>{
        navigate("/login")
    }

    const handleRegister = ()=>{
        navigate("/register")
    }
    return(
        <>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <div className="container">
        <h1 className="text-white">OAUTH with JWT</h1>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <div className="d-flex">
            <button className="btn btn-outline-light" type="button" onClick={handleLogIn}>Log In</button>
            <button className="btn btn-light" type="button" onClick={handleRegister}>Register</button>
            </div>
        </div>
    </div>
</nav>
</>
    )
}

export default NavBar;