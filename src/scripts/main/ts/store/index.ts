import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { taskReducer, TaskState } from './taskReducer';
import thunk from 'redux-thunk';

export interface RootState {
  tasks: TaskState
}

const rootReducer = combineReducers({
  tasks: taskReducer,
});

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export { store };
