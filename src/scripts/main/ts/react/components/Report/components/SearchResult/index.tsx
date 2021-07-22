import React from 'react';
import { useStyles } from './hooks/useStyles';
import styled from 'styled-components';

const List = styled.div`
  background-color: red;
  padding-top: 20px;
  display: block;
`

export const SearchResult = () => {
  const classes = useStyles();

  return (
    <List>
      <div>
        <div>
          <div>21 Jul 2021</div>
          <div>03:43:04</div>
        </div>
        <ul>
          <li>Таск номер 1</li>
          <li>Таск номер 2</li>
          <li>Таск номер 3</li>
        </ul>
      </div>
      
      <div>
        <div>
          <div>20 Jul 2021</div>
          <div>03:43:04</div>
        </div>
        <ul>
          <li>Таск номер 1</li>
          <li>Таск номер 2</li>
          <li>Таск номер 3</li>
        </ul>
      </div>
    </List>
  );
};
