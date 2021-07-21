import React from 'react';
import Header from 'App/components/Header';
import Timer from 'Scripts/main/ts/react/components/Timer';
import Sidebar from 'App/components/Sidebar';
import { Route } from 'react-router-dom';
import { useStyles } from '../Timer/hooks/useStyles';

export const Root = () => {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <Sidebar />

      <main className={classes.main}>
        <Route exact path='/'>
          <Header />
          <Timer />
        </Route>

        <Route path='/reports'>
          <div>
            <div>
              <form>
                <input type='text' placeholder='Text task name' defaultValue='Hello' />
                <span>Иконка</span>
              </form>

            </div>
          </div>
        </Route>

        <Route path='/news'>
          <div>News</div>
        </Route>

        <Route path='/profile'>
          <div>Profile</div>
        </Route>
      </main>
    </div>
  );
};
