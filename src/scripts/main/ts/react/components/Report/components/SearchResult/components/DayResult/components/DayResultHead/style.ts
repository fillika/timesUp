import styled from 'styled-components';

export const StyledListHead = styled.div`
  height: 50px;
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  align-items: center;

  .date {
    color: #6a5acd;
    height: 40px;
    display: flex;
    padding: 0 10px;
    align-items: center;
    justify-content: space-between;
  }

  .totalTime {
    color: #282c35;
    font-size: 0.8em;
    margin-right: 20px;
  }
`;
