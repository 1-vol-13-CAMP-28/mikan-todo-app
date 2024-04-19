import type { Meta, StoryObj } from "@storybook/react";
import { ToggleableTipButton, ToggleableTipButtonProps } from "./ToggleableTipButton";
import { fn } from '@storybook/test';

export default {
  title: "ToggleableTipButton",
  component: ToggleableTipButton,
  tags: ["autodocs"],
  args: {
    onClick: fn()
  },
  parameters: {
    layout: "centered",
  },
} satisfies Meta<ToggleableTipButtonProps>;

export const ToggleableTipButtonExample: StoryObj<ToggleableTipButtonProps> = {
  args: {
    enabledState: {
      title: "Click me to turn off!",
      stateDescription: "Enabled",
      color: "#eee",
    },
    disabledState: {
      title: "Click me to turn on!",
      stateDescription: "Disabled",
      color: "#aaa",
    },
    isEnabledDefault: true,
  }
}