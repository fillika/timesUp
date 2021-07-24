export type TimerState = {
  isOpen: boolean;
  isActive: boolean;
  counter: number;
  time: string;
};

export interface Action {
  type: string;
  payload?: {
    time?: string;
    counter?: number;
  };
}