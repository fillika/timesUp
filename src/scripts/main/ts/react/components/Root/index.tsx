import React from 'react';
import Header from 'App/components/Header';
import Timer from 'Scripts/main/ts/react/components/Timer';
import Sidebar from 'App/components/Sidebar';
import { Route } from 'react-router-dom';
import { useStyles } from 'App/components/Timer/hooks/useStyles';

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
                <div>
                  <p>По времени</p>
                  <select name='' id=''>
                    <option selected value=''>Today</option>
                    <option value=''>This week</option>
                    <option value=''>Last week</option>
                    <option value=''>This month</option>
                    <option value='Last month'>Last month</option>
                    <option value=''>This year</option>
                    <option value=''>Last year</option>
                  </select>
                </div>
                <span>Иконка</span>
              </form>

              <div>
                <div>
                  <div>21 Jul 2021</div>
                  <div>03:43:04</div>
                </div>
                <ul>
                  <li>Таск номер 1</li>
                  <li>Таск номер 2</li>
                  <li>Таск номер 3</li>
                </ul>
              </div>
              <div>
                <div>
                  <div>20 Jul 2021</div>
                  <div>03:43:04</div>
                </div>
                <ul>
                  <li>Таск номер 1</li>
                  <li>Таск номер 2</li>
                  <li>Таск номер 3</li>
                </ul>
              </div>
              {/*  */}
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
