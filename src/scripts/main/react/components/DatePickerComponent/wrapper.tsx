import React, { useState } from 'react';
import { DatePickerComponent } from '.';
import { ModalComponent } from 'App/components/Modal';

export const DatePickerWrapper = () => {
  const [isOpened, setIsOpened] = useState(false);

  const handleOpen = () => setIsOpened(true);
  const handleClose = () => setIsOpened(false);

  return (
    <div>
      <div>
        <button onClick={handleOpen}>Show date</button>
      </div>
      <ModalComponent open={isOpened} handleClose={handleClose}>
        <DatePickerComponent start='13:11' stop='14:27' handleClose={handleClose} />
      </ModalComponent>
    </div>
  );
};
