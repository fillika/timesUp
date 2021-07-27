import React from 'react';
import TableContainer from '@material-ui/core/TableContainer';
import { StyledSearchResult } from './style';
import { useHistory, useRouteMatch, Switch, Route } from 'react-router-dom';
import { TotalResultTable } from './components/TotalResultTable/index';
import { MoreResultTable } from './components/MoreResultTable/index';

export const SearchResult = () => {
  const history = useHistory();
  let { path, url } = useRouteMatch();

  return (
    <StyledSearchResult>
      <TableContainer>
        <Switch>
          // TODO -Настроить правильное переключение между таблицами, возможно более правильным роутингом внутри
          <Route path={path} exact component={TotalResultTable} />
          <Route path={`${path}/:name`} component={MoreResultTable} />
        </Switch>
      </TableContainer>
    </StyledSearchResult>
  );
};
