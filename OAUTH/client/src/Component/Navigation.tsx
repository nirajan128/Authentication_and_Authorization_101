import { loginWithGoogle } from "../Utilities/Api";
function Navigation(){
    return(
        <>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
    <div className="container">
        <a className="navbar-brand" href="#">
            <img src="logo.png" alt="Logo" width="40" height="40" className="d-inline-block align-text-top" />
            MyWebsite
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <div className="d-flex">
            <button className="btn btn-outline-light" type="button" onClick={loginWithGoogle}>Log In WIth google</button>
            
            </div>
        </div>
    </div>
</nav>
</>
    )
}

export default Navigation;