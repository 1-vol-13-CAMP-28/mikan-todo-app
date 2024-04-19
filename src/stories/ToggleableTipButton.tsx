import React, { useState } from "react";
import { TipButton } from "./TipButton";
import { TipButtonState } from "./TipButton";

export type ToggleableTipButtonProps = {
  enabledState: TipButtonState;
  disabledState: TipButtonState;
  isEnabledDefault: boolean;

  onClick: (isEnabled: boolean, setIsEnabled: Function) => void;
}

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