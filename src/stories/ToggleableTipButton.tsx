import React, { useState } from "react";
import { TipButton } from "./TipButton";
import { TipButtonState } from "./TipButton";
import PropTypes from 'prop-types';

/**
 * ToggleableTipButton の props
 *
 * @export
 * @typedef {ToggleableTipButtonProps}
 */
export type ToggleableTipButtonProps = {
  enabledState: TipButtonState;
  disabledState: TipButtonState;
  isEnabledDefault: boolean;

  onClick: (isEnabled: boolean, setIsEnabled: Function) => void;
}

/**
 * ON/OFFを切り替えられるボタンの例
 * タスクの設定で利用します
 *
 * @param {ToggleableTipButtonProps} param0 この props  
 * @param {TipButtonState} param0.enabledState ON のときのボタンの状態
 * @param {TipButtonState} param0.disabledState OFF のときのボタンの状態
 * @param {boolean} param0.isEnabledDefault ボタンが最初 ON か OFF か (true なら ON)
 * @param {(isEnabled: boolean, setIsEnabled: Function) => void} param0.onClick ボタンがクリックされたときに発動する関数、setIsEnabled でボタンの状態を変更できる
 * @returns {React.JSX.Element}
 */
export const ToggleableTipButton = ({ enabledState, disabledState, isEnabledDefault, onClick }: ToggleableTipButtonProps): React.JSX.Element => {
  const [isEnabled, setIsEnabled] = useState(isEnabledDefault);
  const getTipButtonState = () => isEnabled ? enabledState : disabledState;

  const handleClick = (_currentTipButtonState: TipButtonState, setTipButtonState: Function): void => {
    if (onClick) {
      onClick(isEnabled, setIsEnabled);
    }
    setIsEnabled(!isEnabled);
    setTipButtonState(getTipButtonState());
  }

  return <TipButton defaultTipButtonState={getTipButtonState()} onClick={handleClick}/>
}

export default ToggleableTipButton;

ToggleableTipButton.propTypes = {
  /**
   * ON のときのボタンの状態
   * */
  enabledState: PropTypes.shape({
    title: PropTypes.string.isRequired,
    stateDescription: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
  }).isRequired,
  /**
   * OFF のときのボタンの状態
   * */
  disabledState: PropTypes.shape({
    title: PropTypes.string.isRequired,
    stateDescription: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
  }).isRequired,
  /**
   * ボタンが最初 ON か OFF か (true なら ON)
   * */
  isEnabledDefault: PropTypes.bool.isRequired,
  /**
   * ボタンがクリックされたときに発動する関数、setIsEnabled でボタンの状態を変更できる
   * */
  onClick: PropTypes.func.isRequired,
}