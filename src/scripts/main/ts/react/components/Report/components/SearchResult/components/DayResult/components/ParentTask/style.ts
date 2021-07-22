import styled from 'styled-components';

export const StyledParentTask = styled.div`
  height: 3.15em;
  display: flex;
  align-items: center;
  padding-left: 20px;
  background-size: 100% 1px;
  background-image: linear-gradient(#282c35, #282c35);
  background-repeat: no-repeat;
  background-position: center bottom;
  padding-right: 20px;

  .name {
    width: 100%;
  }

  .timeRange {
    padding: 5px;
    font-size: 0.8em;
    user-select: none;
    margin-right: 10px;
    border-radius: 20px;

    &:hover {
      cursor: pointer;
      background-color: #bdbdbd;
    }
  }

  .totalTime {
    font-size: 0.8em;
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
