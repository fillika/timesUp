export type TimerState = {
  isOpen: boolean;
  isActive: boolean;
  counter: number;
  end: number;
  time: string;
};

export interface Action {
  type: string;
  payload?: {
    time?: string;
    counter?: number;
    end?: number;
  };
}
