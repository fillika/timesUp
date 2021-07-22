import styled from 'styled-components';
import { StyledTask } from '../ParentTask/style';

export const StyledChildTask = styled(StyledTask)`
  background-color: #f5f5f5;
  background-image: linear-gradient(#9e9e9e, #9e9e9e);
  padding-left: calc(2em + 10px + 20px);
`;