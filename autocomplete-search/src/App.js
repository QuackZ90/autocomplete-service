import './App.css';
import SearchPage from './pages/SearchPage';
import CodeSearchPage from './pages/CodeSearchPage';
import HomePage from './pages/HomePage';
import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
} from 'react-router-dom';

function App() {

  console.log(process.env);

  const CustomNavLink = ({ children, ...props }) => (
    <span>
      <NavLink activeClassName="active" {...props}>
        {children}
      </NavLink>
      </span>
  );

  
  return (
    <BrowserRouter>
    <header className='page-header'>
        <h1>Git Hub Search</h1>
    </header>
      <div className='nav-bar'>
        <h4>Search by:</h4>
        <nav>
            {/* <span> */}
              <CustomNavLink className='nav-link' to="/">Home</CustomNavLink>
            {/* </span>
            <span> */}
              <CustomNavLink className='nav-link' to="/code">Code</CustomNavLink>
            {/* </span>
            <span> */}
              <CustomNavLink className='nav-link' to="/commits">Commits</CustomNavLink>
            {/* </span>
            <span> */}
              <CustomNavLink className='nav-link' to="/issues">Issues</CustomNavLink>
            {/* </span>
            <span> */}
              <CustomNavLink className='nav-link' to="/labels">Labels</CustomNavLink>
            {/* </span>
            <span> */}
              <CustomNavLink className='nav-link' to="/repositories">Repositories</CustomNavLink>
            {/* </span>
            <span> */}
              <CustomNavLink className='nav-link' to="/topics">Topics</CustomNavLink>
            {/* </span>
            <span> */}
              <CustomNavLink className='nav-link' to="/users">Users</CustomNavLink>
            {/* </span> */}
        </nav>
      </div>
      <div>
        <Routes>
          <Route path = "/code" element={<CodeSearchPage />}></Route>
          <Route path = "/:id" element={<SearchPage />}></Route>
          <Route path = "/" element={<HomePage />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
