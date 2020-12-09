import logo from './logo.svg';
import './App.css';
import Pagination from "./paginate"
import { useState } from 'react';
function App() {
  const [currentPage, setCurrentPage] = useState(1)
  const changePageactive = (e) => {
    console.log("element val", e);
    setCurrentPage(e);
  }
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <Pagination
        items={50}
        initialPage={1}
        pageSize={5}
        onChangePage={changePageactive} />

    </div>
  );
}

export default App;
