import React from 'react';
import {
  Link,
  Route,
  Routes,
  useLocation,
  BrowserRouter,
} from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import About from './pages/About';
import Editor from './pages/editor';
import Demo from './pages/demo/richtext';

// 路由菜单组件
const AppMenu: React.FC = () => {
  const location = useLocation();

  const menuItems = [
    { path: '/', label: '首页' },
    { path: '/demo', label: '演示' },
    { path: '/editor', label: '编辑器' },
    { path: '/about', label: '关于' },
  ];

  return (
    <nav className="app-menu">
      <h2 className="text-red-500">菜单导航</h2>
      <ul>
        {menuItems.map(item => (
          <li key={item.path}>
            <Link
              to={item.path}
              className={`menu-link ${location.pathname === item.path ? 'active' : ''}`}>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <div className="main-content">
          <AppMenu />
          <div className="content-area">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/demo" element={<Demo />} />
              <Route path="/editor" element={<Editor />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
