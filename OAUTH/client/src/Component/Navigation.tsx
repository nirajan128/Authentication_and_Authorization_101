import { loginWithGoogle } from "../Utilities/Api";
function Navigation(){
    return(
        <>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <div className="container">
        <h1 className="text-white">OAUTH</h1>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <div className="d-flex">
            <button className="btn btn-outline-light" type="button" onClick={loginWithGoogle}>Log In</button>
            </div>
        </div>
    </div>
</nav>
</>
    )
}

export default Navigation;