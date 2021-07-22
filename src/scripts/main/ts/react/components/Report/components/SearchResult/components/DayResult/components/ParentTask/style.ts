import styled from 'styled-components';

export const StyledTask = styled.div`
  height: 2.9em;
  display: flex;
  align-items: center;
  padding-left: 20px;
  background-size: 100% 1px;
  background-repeat: no-repeat;
  background-position: center bottom;
  padding-right: 20px;
  font-size: 0.9em;

  .name {
    width: 100%;
  }

  .timeRange {
    padding: 5px;
    font-size: 0.8em;
    user-select: none;
    margin-right: 10px;
    border-radius: 20px;
  }

  .totalTime {
    font-size: 0.8em;
  }
`;

export const StyledParentTask = styled(StyledTask)`
  padding-left: 20px;
  background-image: linear-gradient(#282c35, #282c35);

  .timeRange {
    &:hover {
      cursor: pointer;
      background-color: #bdbdbd;
    }
  }
`;

export const StyledCounter = styled.div`
  width: 2em;
  border: 1px solid #6a5acd;
  cursor: pointer;
  height: 2em;
  display: flex;
  min-width: 2em;
  min-height: 2em;
  align-items: center;
  user-select: none;
  margin-right: 10px;
  border-radius: 50%;
  justify-content: center;
`;
