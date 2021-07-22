import React from 'react';
import styled from 'styled-components';
import { useStyles } from './hooks/useStyles';

const StyledListHead = styled.div`
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

const StyledParentTask = styled.div`
  height: 3.15em;
  display: flex;
  align-items: center;
  padding-left: 30px;
`;

const StyledParentChild = styled.div`
  height: 3.15em;
  display: flex;
  align-items: center;
  padding-left: calc(2em + 10px + 30px);
  background-size: 100% 1px;
  background-color: #f5f5f5;
  background-image: linear-gradient(#9e9e9e, #9e9e9e);
  background-repeat: no-repeat;
  background-position: center bottom;
`;

const StyledCounter = styled.div`
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

export const SearchResult = () => {
  const classes = useStyles();

  return (
    <div>
      <div>
        <StyledListHead>
          <div className='date'>21 Jul 2021</div>
          <div className='totalTime'>03:43:04</div>
        </StyledListHead>

        <ul>
          <li>
            <StyledParentTask>
              <StyledCounter>2</StyledCounter>
              <div>Name</div>
            </StyledParentTask>

            <StyledParentChild>Name</StyledParentChild>
            <StyledParentChild>Name</StyledParentChild>
            <StyledParentChild>Name</StyledParentChild>
          </li>
        </ul>
      </div>
    </div>
  );
};
