import type { Meta, StoryObj } from "@storybook/react";
import { TipButton } from "./TipButton";
import { fn } from '@storybook/test';

export default {
  title: "TipButton",
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
      fn();
      setTipButtonState({
        title: "Clicked!",
        stateDescription: "On",
        color: "#aaa",
      });
    },
  }
}