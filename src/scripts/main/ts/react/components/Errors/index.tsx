import React from 'react';

export const Notifications: React.FC = () => {
  return (
    <div className="notifications">
      <div className="notifications__wrapper">
        <div className="notifications__item notifications__item--success">Успех! Вы молодец</div>
        <div className="notifications__item notifications__item--warning">Будьте осторожны! Скоро мы закрываемся</div>
        <div className="notifications__item notifications__item--error">Ошибка. Приносим свои извиненения</div>
      </div>
    </div>
  )
}
