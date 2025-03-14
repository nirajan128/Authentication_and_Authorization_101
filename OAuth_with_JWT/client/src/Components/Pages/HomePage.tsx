import NavBar from "../shared/NavBar";

function HomePage() {
  return (
    <div>
      <NavBar />
      <div className="d-flex justify-content-center align-items-center p-2">
      <h1>Google and JWT Authentication</h1>
      </div>
    </div>
  );
}

export default HomePage;