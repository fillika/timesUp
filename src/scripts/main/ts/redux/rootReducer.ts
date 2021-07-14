import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { taskReducer, TaskState } from './taskReducer';
import { activeTaskReducer, activeTaskState } from './activeTask';
import { appReducer, AppState } from './app';
import { notifyReducer, Notyfy } from './notification';
import thunk from 'redux-thunk';

export interface RootState {
  tasks: TaskState;
  activeTask: activeTaskState;
  app: AppState;
  notification: Notyfy;
}

const rootReducer = combineReducers({
  tasks: taskReducer,
  activeTask: activeTaskReducer,
  app: appReducer,
  notification: notifyReducer,
});

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export { store };
