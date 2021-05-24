import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Main from '../components/Main';
import Sidebar from '../components/Sidebar';

const App: React.FC = () => {
  return (
    <div>
      <Header />
      <Sidebar />
      <Main />
      <Footer />
    </div>
  );
};

export default App;
