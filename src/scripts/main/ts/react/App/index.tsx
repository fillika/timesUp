import React from 'react';
import Header from '../components/Header/Header';
import Main from '../components/Main/Main';
import Sidebar from '../components/Sidebar';

const App: React.FC = () => {
  return (
    <div className='timer'>
      <div className="timer__wrapper">
        <Header />
        <Sidebar />
        <Main />
      </div>
    </div>
  );
};

export default App;
