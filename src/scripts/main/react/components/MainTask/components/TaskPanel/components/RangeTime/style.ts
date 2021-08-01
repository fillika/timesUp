import styled from 'styled-components';
import { withTheme } from '@material-ui/core/styles';

export const StyledRangeTime = withTheme(styled('div')`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 0 10px;
  cursor: pointer;

  .total-time {
    font-size: 0.75em;
    color: ${props => props.theme.palette.grey[600]};
    font-weight: bold;
    line-height: 1.1em;
    user-select: none;
  }

  .range-time {
    font-size: 0.75em;
    user-select: none;
    line-height: 1.1em;
  }
`);
