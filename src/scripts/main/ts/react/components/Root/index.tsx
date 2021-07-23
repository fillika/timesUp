import React from 'react';
import { Route } from 'react-router-dom';
import Header from 'App/components/Header';
import { TaskList } from 'App/components/TaskList';
import Sidebar from 'App/components/Sidebar';
import { useStyles } from 'App/components/TaskList/hooks/useStyles';
import { Report } from 'App/components/Report';

export const Root = () => {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <Sidebar />

      <main className={classes.main}>
        <Route exact path='/'>
          <Header />
          <TaskList />
        </Route>

        <Route path='/reports'>
          <Report />
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
