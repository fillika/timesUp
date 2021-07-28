import React from 'react';
import { useSelector } from 'react-redux';
import { useRouteMatch, Switch, Route, Link } from 'react-router-dom';
import { BodyRow } from '../BodyRow/index';
import { RootState } from 'Redux/reducers/rootReducer';
import { MoreInfoAboutTask } from './../MoreInfoAboutTask/index';

export const TotalResultTable = () => {
  let { path } = useRouteMatch();
  const { sortedTaskList } = useSelector((state: RootState) => state.reportReducer);

  return (
    <div>
      <Switch>
        <Route path={path} exact>
          {Object.keys(sortedTaskList).map(key => {
            const { total, name } = sortedTaskList[key];
            return <BodyRow pathName={key} name={name} time={total} key={key} />;
          })}
        </Route>

        <Route path={`${path}/:name`} exact>
          <MoreInfoAboutTask />
        </Route>
      </Switch>
    </div>
  );
};
