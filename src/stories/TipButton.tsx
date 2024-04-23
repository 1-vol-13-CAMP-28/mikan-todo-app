import React, { useState } from "react";
import Image from "next/image";
import "./tipButton.css";

/**
 * TipButton の props
 *
 * @export
 * @typedef {TipButtonProps}
 */
export type TipButtonProps = {
  defaultTipButtonState: TipButtonState;
  onClick: (currentTipButtonState: TipButtonState, setTipButtonState: Function) => void;
}

/**
 * TipButton の表示状態
 *
 * @export
 * @typedef {TipButtonState}
 */
export type TipButtonState = {
  /**
   * ボタンのタイトル(注意: ボタンの役割を表す説明文であり、文字のサイズは小さい)
   */
  title: string;
  /**
   * ボタンの現在の状態を説明する文字列 (文字のサイズはタイトルより大きい)
   */
  stateDescription: string;
  color: string;
  iconSrc?: string;
  iconAlt?: string;
}

/**
 * タイトルとその状態を表示するボタン
 *
 * @param {TipButtonProps} param0 TipButton の props
 * @param {TipButtonState} param0.defaultTipButtonState ボタンの初期状態
 * @param {(currentTipButtonState: TipButtonState, setTipButtonState: Function) => void} param0.onClick クリック時に実行されるコールバック関数
 * @returns {React.JSX.Element}
 */
export const TipButton = ({ defaultTipButtonState, onClick }: TipButtonProps): React.JSX.Element => {
  const [tipButtonState, setTipButtonState] = useState<TipButtonState>(defaultTipButtonState);
  const handleClick = () => {
    onClick(tipButtonState, setTipButtonState);
  }
  
  return (
    <div className="tipButton" style={{
      '--themeColor': tipButtonState.color,
    } as React.CSSProperties}>
      <button className="tipButtonBody"
        onClick={handleClick}
      >
        {
          (!tipButtonState.iconSrc) ?
            null :
            <Image src={tipButtonState.iconSrc} alt={tipButtonState.iconAlt} width={32} height={32} />
        }
        <div className="tipButtonTextWrapper">
          <span className="tipButtonStateDescription">{tipButtonState.stateDescription}
            </span>
          <span className="tipButtonTitle">{tipButtonState.title}</span>
        </div>
      </button>
    </div>
  )
}