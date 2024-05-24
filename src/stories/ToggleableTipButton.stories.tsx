import type { Meta, StoryObj } from "@storybook/react";
import { ToggleableTipButton } from "./ToggleableTipButton";
import { ToggleableTipButtonProps } from "../app/types/ToggleableTipButtonProps";
import { fn } from '@storybook/test';

export default {
  title: "Mikan Components/Button/ToggleableTipButton",
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