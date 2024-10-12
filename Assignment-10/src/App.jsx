import { useState, useEffect } from "react";

function App() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const savedCount = localStorage.getItem("clickCount");

    if (savedCount) {
      setCount(parseInt(savedCount, 0));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("clickCount", count);
  }, [count]);

  const handleClick = () => {
    setCount(count + 1);
  };

  const handleReset = () => {
    setCount(0);
    localStorage.removeItem("clickCount");
  };

  return (
    <div className="container text-center vw-100">
      <div className="row justify-content-center p-5">
        <div className="col-4">
          <div className="card">
            <div className="card-header">
              <h4>Click count: {count}</h4>
            </div>
            <div className="card-body">
              <button
                onClick={handleClick}
                className="btn btn-primary btn-lg m-3"
              >
                Click Me
              </button>
              <button
                onClick={handleReset}
                className="btn btn-danger btn-lg m3"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
