import type { Meta, StoryObj } from "@storybook/react";
import { TipButton } from "./TipButton";
import { action } from '@storybook/addon-actions';


export default {
  title: "Mikan Components/Button/TipButton",
  component: TipButton,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof TipButton>;

export const TipButtonExample: StoryObj<typeof TipButton> = {
  args: {
    defaultTipButtonState: {
      title: "Push me!",
      stateDescription: "Off",
      color: "#eee",
    },
    onClick: (_, setTipButtonState) => {
      action("onClick")();
      setTipButtonState({
        title: "Clicked!",
        stateDescription: "On",
        color: "#aaa",
      });
    },
  }
}