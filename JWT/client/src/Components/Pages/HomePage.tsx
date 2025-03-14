import NavBar from "../shared/NavBar";

function HomePage() {
  return (
    <div>
      <NavBar />
      <div className="d-flex justify-content-center align-items-center p-2" style={{height: "80vh"}}>
      <h1 className="shadow p-3">JWT AUTH</h1>
      </div>
    </div>
  );
}

export default HomePage;