import React from 'react';

const Header: React.FC = () => {
  return (
    <header>
      <input type='text' placeholder='name' value='Проект номер 1' />

      <div>
        <button>Start/Stop</button>
      </div>
    </header>
  );
};

export default Header;
