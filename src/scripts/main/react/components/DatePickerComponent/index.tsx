import React, { useState } from 'react';

export const DatePickerComponent: React.FC<{ date?: Date }> = ({ date = new Date() }) => {
  const [startDate, setStartDate] = useState(date);

  return <div>Date picker</div>;
};
