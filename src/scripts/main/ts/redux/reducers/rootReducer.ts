import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { taskReducer, TaskState } from './taskReducer';
import { activeTaskReducer, activeTaskState } from './activeTaskReducer';
import { appReducer, AppState } from './appReducer';
import { notifyReducer, Notify } from './notifyReducer';
import thunk from 'redux-thunk';

export interface RootState {
  tasks: TaskState;
  activeTask: activeTaskState;
  app: AppState;
  notify: Notify;
}

const rootReducer = combineReducers({
  tasks: taskReducer,
  activeTask: activeTaskReducer,
  app: appReducer,
  notify: notifyReducer,
});

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export { store };
