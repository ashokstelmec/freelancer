import React, { useState } from 'react';
import Dashboard from './dashboard';
import MyProject from './myProject';
import Lists from './list';
import TaskLists from './taskLists';
import Message from './message';
import Feedback from './feedback';
import Header from './header';
import "./navbar.css";

const Navbar = () => {
  const [activeComponent, setActiveComponent] = useState('dashboard');

  const renderComponent = () => {
    switch (activeComponent) {
      case 'dashboard':
        return <Dashboard />;
      case 'my-projects':
        return <MyProject />;
      case 'lists':
        return <Lists />;
      case 'taskLists':
        return <TaskLists />;
      case 'message':
        return <Message />;
      case 'feedback':
        return <Feedback />;
      default:
        return <Dashboard />;
    }
  };
                    
  return (
    <div>
        <Header />
        <nav className="sub-navbar">
            <div>
                <ul className="nav justify-content-start" id="navbar" style={{ marginLeft: "-1.4rem" }}>
                    <li className="nav-item">
                    <button
                        className={`nav-link ${activeComponent === 'dashboard' ? 'active-link' : ''}`}
                        onClick={() => setActiveComponent('dashboard')}
                    >
                        Dashboard
                    </button>
                    </li>
                    <li className="nav-item">
                    <button
                        className={`nav-link ${activeComponent === 'my-projects' ? 'active-link' : ''}`}
                        onClick={() => setActiveComponent('my-projects')}
                    >
                        My Projects
                    </button>
                    </li>
                    <li className="nav-item">
                    <button
                        className={`nav-link ${activeComponent === 'lists' ? 'active-link' : ''}`}
                        onClick={() => setActiveComponent('lists')}
                    >
                        Lists
                    </button>
                    </li>
                    <li className="nav-item">
                    <button
                        className={`nav-link ${activeComponent === 'taskLists' ? 'active-link' : ''}`}
                        onClick={() => setActiveComponent('taskLists')}
                    >
                        Tasklists
                    </button>
                    </li>
                    <li className="nav-item">
                    <button
                        className={`nav-link ${activeComponent === 'message' ? 'active-link' : ''}`}
                        onClick={() => setActiveComponent('message')}
                    >
                        Inbox
                    </button>
                    </li>
                    <li className="nav-item">
                    <button
                        className={`nav-link ${activeComponent === 'feedback' ? 'active-link' : ''}`}
                        onClick={() => setActiveComponent('feedback')}
                    >
                        Feedback
                    </button>
                    </li>
                </ul>
            </div>
        </nav>

      <div className="content mt-3">
        {renderComponent()}
      </div>
    </div>
  );
};

export default Navbar;
