import Navigation from "./Navigation";

const Homepage: React.FC = ()=>{
    return (
        <div>
        <Navigation />
        <div className="d-flex justify-content-center align-items-center p-2" style={{height: "80vh"}}>
      <h1 className="shadow p-3">Google OAUTH</h1>
      </div>
        </div>
    )
}

export default Homepage;