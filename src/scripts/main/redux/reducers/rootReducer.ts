import thunk from 'redux-thunk';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { taskReducer } from './taskReducer';
import { activeTaskReducer, activeTaskState } from './activeTaskReducer';
import { appReducer, AppState } from './appReducer';
import { notifyReducer, Notify } from './notifyReducer';
import { timerReducer } from './timerReducer';
import { TimerState } from './timerReducer/types';
import { TaskState } from './taskReducer/types';
import { reportReducer } from './reportReducer/index';
import { ReportState } from 'Redux/reducers/reportReducer/types';

export interface RootState {
  tasks: TaskState;
  activeTask: activeTaskState;
  app: AppState;
  notify: Notify;
  reportReducer: ReportState;
  timer: TimerState;
}

const rootReducer = combineReducers({
  tasks: taskReducer,
  activeTask: activeTaskReducer,
  app: appReducer,
  notify: notifyReducer,
  reportReducer: reportReducer,
  timer: timerReducer
});

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export { store };
