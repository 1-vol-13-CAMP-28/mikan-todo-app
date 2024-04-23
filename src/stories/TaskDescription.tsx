import React from 'react';
import PropTypes from 'prop-types';
import './taskDescription.css';
import { TaskDescriptionProps } from '../app/types/TaskDescriptionProps';
import TimeAgo from 'react-timeago';
import japaneseStrings from 'react-timeago/lib/language-strings/ja'; /* 仮置き: ロケール設定に依存 */
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter';

// react-timeago のフォーマッタ
const formatter = buildFormatter(japaneseStrings);

/**
 * タスクの説明を表示するコンポーネント
 *
 * @param {TaskDescriptionProps} param0 TaskDescriptionProps
 * @param {TaskDescriptionProps} param0.title タスクのタイトル
 * @param {TaskDescriptionProps} param0.description タスクの説明
 * @param {TaskDescriptionProps} param0.registrationDate タスクの登録日
 * @param {TaskDescriptionProps} param0.deadline タスクの期限
 * @param {TaskDescriptionProps} param0.priority タスクの優先度
 * @param {TaskDescriptionProps} param0.taskStatus タスクの完了状態
 * @param {TaskDescriptionProps} param0.mikanQuality タスクに割り当てられた「みかんの質」
 * @param {TaskDescriptionProps} param0....props
 * @returns {React.JSX.Element}
 */
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
              <li><TimeAgo date={registrationDate} formatter={formatter} /> に追加</li>
              : null
          }
          {
            deadline !== null ?
              <li>期限: <TimeAgo date={deadline} formatter={formatter} /></li>
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
  /**
   * タスクのタイトル
   */
  title: PropTypes.string,
  /**
   * タスクの説明
   */
  description: PropTypes.string,
  /**
   * タスクの登録日
   */
  registrationDate: PropTypes.instanceOf(Date),
  /**
   * タスクの期限
   */
  deadline: PropTypes.instanceOf(Date),
  /**
   * タスクの優先度
   */
  priority: PropTypes.number,
  /**
   * タスクの完了状態
   */
  taskStatus: PropTypes.bool,
  /**
   * タスクに割り当てられた「みかんの質」
   */
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
