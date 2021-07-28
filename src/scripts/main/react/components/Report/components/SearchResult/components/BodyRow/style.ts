import styled from 'styled-components';
import { withTheme } from '@material-ui/core/styles';

type StyleCell = {
  styleWidth: number;
  justifyContent?: string;
  direction?: string;
  minWidth?: number;
};

export const StyledTableCell = styled.div<StyleCell>`
  min-width: ${props => props.minWidth || 90}px;
  font-size: 0.95em;
  height: 2.5em;
  display: flex;
  align-items: center;
  width: ${props => props.styleWidth}%;
  cursor: pointer;
  padding: 10px 15px;
  justify-content: ${props => props.justifyContent || 'flex-start'};
  flex-direction: ${props => props.direction || 'row'};
`;

export const StyledDate = styled.div`
  font-size: 0.79em;
  color: #ccc;
`;

export const StyledTableRow = withTheme(styled('div')`
  width: 100%;
  display: flex;
  border-bottom: 1px solid ${props => props.theme.palette.grey[300]};

  &:hover {
    background-color: ${props => props.theme.palette.grey[100]};
  }
`);
