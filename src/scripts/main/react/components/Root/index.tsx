import React from 'react';
import { Route } from 'react-router-dom';
import Header from 'App/components/Header';
import { TaskList } from 'App/components/TaskList';
import Sidebar from 'App/components/Sidebar';
import { useStyles } from 'App/components/TaskList/hooks/useStyles';
import { Report } from 'App/components/Report';
import { Timer } from 'App/components/Timer';
import { DatePickerComponent } from 'App/components/DatePickerComponent';

export const Root = () => {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <Sidebar />
      <Timer />

      <main className={classes.main}>
        <Route exact path='/'>
          <Header />
          <TaskList />
        </Route>

        <Route path='/reports' component={Report} />

        <Route path='/news'>
          <div>
            <DatePickerComponent date={new Date(1625148383189)} />
          </div>
        </Route>

        <Route path='/profile'>
          <div>Profile</div>
        </Route>
      </main>
    </div>
  );
};
