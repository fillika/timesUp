import React from 'react';

import { useHistory, useRouteMatch, useParams } from 'react-router-dom';
import { time as timeUtil } from 'Utils/Time';
import { StyledTableRow, StyledTableCell } from './style';

export const BodyRow: React.FC<{ name: string; time: number }> = ({ name, time }) => {
  const history = useHistory();
  let { path } = useRouteMatch();

  const getMore = () => history.push(`${path}/${name}`);

  return (
    <>
      <StyledTableRow>
        <StyledTableCell onClick={getMore} styleWidth={90}>
          {name}
        </StyledTableCell>
        <StyledTableCell styleWidth={10} justifyContent='center'>
          {timeUtil.countTotalTime(time)}
        </StyledTableCell>
      </StyledTableRow>
    </>
  );
};
