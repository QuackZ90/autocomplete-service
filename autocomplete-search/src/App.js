import logo from './logo.svg';
import './App.css';
import SearchPage from './pages/SearchPage';
import CodeSearchPage from './pages/CodeSearchPage';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
    <header className='page-header'>
        <h1>Git Hub Search</h1>
    </header>
      <div className='nav-bar'>
        <h4>Search by:</h4>
        <nav>
            <span>
              <Link className='nav-link' to="/">Home</Link>
            </span>
            <span>
              <Link className='nav-link' to="/code">Code</Link>
            </span>
            <span>
              <Link className='nav-link' to="/commits">Commits</Link>
            </span>
            <span>
              <Link className='nav-link' to="/issues">Issues</Link>
            </span>
            <span>
              <Link className='nav-link' to="/labels">Labels</Link>
            </span>
            <span>
              <Link className='nav-link' to="/repositories">Repositories</Link>
            </span>
            <span>
              <Link className='nav-link' to="/topics">Topics</Link>
            </span>
            <span>
              <Link className='nav-link' to="/users">Users</Link>
            </span>
        </nav>
      </div>
      <div>
        <Routes>
          <Route path = "/code" element={<CodeSearchPage />}></Route>
          <Route path = "/:id" element={<SearchPage />}>
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
