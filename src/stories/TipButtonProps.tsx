import { TipButtonState } from "./TipButton";

/**
 * TipButton の props
 *
 * @export
 * @typedef {TipButtonProps}
 */

export type TipButtonProps = {
  
  /**
   * TipButton の初期状態
   *
   * @type {TipButtonState}
   */
  defaultTipButtonState: TipButtonState;
  /**
   * TipButton をクリックしたときの処理
   * @param currentTipButtonState 現在の TipButton の状態
   * @param setTipButtonState     setTipButtonState 関数
   * @returns 
   */
  onClick: (currentTipButtonState: TipButtonState, setTipButtonState: Function) => void;
};
