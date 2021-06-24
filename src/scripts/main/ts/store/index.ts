import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { taskReducer, TaskState } from './taskReducer';
import { activeTaskReducer, activeTaskState } from './activeTask';
import { appReducer, AppState } from './app';
import thunk from 'redux-thunk';

export interface RootState {
  tasks: TaskState;
  activeTask: activeTaskState;
  app: AppState;
}

const rootReducer = combineReducers({
  tasks: taskReducer,
  activeTask: activeTaskReducer,
  app: appReducer
});

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export { store };
