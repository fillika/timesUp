import React, { useState } from 'react';
import IsLogged from 'App/components/isLogged';
import Greetings from 'App/components/Greetings';

const App: React.FC = () => {
  const [isLoggin, setLogin] = useState(false);
  return (
    <div className='timer'>
      {isLoggin ? <IsLogged /> : <Greetings />}
    </div>
  );
};

export default App;
