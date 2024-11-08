

export default function Login() {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4 shadow" style={{ width: '300px', backgroundColor: '#007bff' }}>
        <h2 className="text-center text-white mb-4">Login</h2>
        <form>
          <div className="mb-3">
            <input type="text" className="form-control" placeholder="Username" required />
          </div>
          <div className="mb-3">
            <input type="password" className="form-control" placeholder="Password" required />
          </div>
          <button type="submit" className="btn btn-dark w-100">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
