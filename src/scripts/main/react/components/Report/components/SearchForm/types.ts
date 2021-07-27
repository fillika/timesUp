export type DayVariable = 'Today' | 'This week' | 'Last week' | 'This month' | 'Last month' | 'This year' | 'Last year';
export type InitialValues = {
  name: string;
  date: DayVariable;
};