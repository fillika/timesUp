import { RootState } from 'Redux/reducers/rootReducer';

export type DispatchProps = {
  type: string;
  payload?: any;
};

export type GetState = () => RootState;
