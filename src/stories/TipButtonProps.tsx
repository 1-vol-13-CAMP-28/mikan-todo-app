import { TipButtonState } from "./TipButton";

/**
 * TipButton の props
 *
 * @export
 * @typedef {TipButtonProps}
 */

export type TipButtonProps = {
  defaultTipButtonState: TipButtonState;
  onClick: (currentTipButtonState: TipButtonState, setTipButtonState: Function) => void;
};
