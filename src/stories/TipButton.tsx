import React, { useCallback, useState } from "react";
import Image from "next/image";

import "./tipButton.css";

export type TipButtonProps = {
  defaultTipButtonState: TipButtonState;
  onClick: (currentTipButtonState: TipButtonState, setTipButtonState: Function) => void;
}

export type TipButtonState = {
  title: string;
  stateDescription: string;
  color: string;
  iconSrc?: string;
  iconAlt?: string;
}

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