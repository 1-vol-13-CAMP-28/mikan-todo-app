import { TipButtonState } from "../../stories/TipButton";

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
};
