import React from 'react';
import PropTypes from 'prop-types';
import './taskDescription.css';
import { TaskDescriptionProps } from '../app/types/TaskDescriptionProps';

export const TaskDescription = ({ title, description, registrationDate, deadline, priority, taskStatus, mikanQuality, ...props }: TaskDescriptionProps): React.JSX.Element => {
  return (
    <div
      className="taskDescription"
      {...props}
    >
      <h1>{title}</h1>
      <p className='taskDescriptionText'>{description}</p>

      <div className="taskDescriptionFooter">
        <ul className="taskDescriptionFooterItems">
          {
            registrationDate !== null ?
              <li>{registrationDate.toDateString()} に追加</li>
              : null
          }
          {
            deadline !== null ?
              <li>期限: {deadline.toDateString()}</li>
              : null
          }
          {
            priority !== 0 ?
              <li>優先度: {priority}</li>
              : null
          }
          {
            taskStatus !== false ?
              <li>完了</li>
              : <li>未完了</li>
          }
          {
            mikanQuality !== 0 ?
              <li>みかんの質: {mikanQuality}</li>
              : null
          }
        </ul>
      </div>
      <style jsx>{`
        
      `}</style>
    </div>
  );
};

TaskDescription.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  registrationDate: PropTypes.instanceOf(Date),
  deadline: PropTypes.instanceOf(Date),
  priority: PropTypes.number,
  taskStatus: PropTypes.bool,
  mikanQuality: PropTypes.number,
};

TaskDescription.defaultProps = {
  title: "名前のないタスク",
  description: "まだ説明がありません。",
  registrationDate: null,
  deadline: null,
  priority: 0,
  taskStatus: false,
  mikanQuality: 0,
};
