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
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum necessitatibus at ipsam vel adipisci aliquid
            perspiciatis molestias nemo eaque illum, incidunt blanditiis consequatur ab ipsum eum, minima sunt. Nam
            similique velit numquam incidunt ut dolore, est quos vel animi aperiam, assumenda atque. Incidunt
            repellendus ab reiciendis, quae, deleniti reprehenderit dolorem eveniet quisquam alias rerum, dolores ea
            voluptas ratione deserunt consequatur fugit aperiam consectetur exercitationem illum. Expedita quas nisi
            commodi consectetur et quam exercitationem error blanditiis accusantium quod at, nihil necessitatibus aut.
            Adipisci omnis facere nihil a quo natus. Excepturi modi eaque praesentium aut dolores cupiditate ipsa odit
            quam exercitationem vitae?
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
