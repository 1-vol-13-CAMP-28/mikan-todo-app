import type { Meta, StoryObj } from "@storybook/react";
import { ToggleableTipButton } from "./ToggleableTipButton";
import { ToggleableTipButtonProps } from "../app/types/ToggleableTipButtonProps";
import { action } from "@storybook/addon-actions";

export default {
  title: "Mikan Components/Button/ToggleableTipButton",
  component: ToggleableTipButton,
  tags: ["autodocs"],
  args: {
    onClick: () => {
      action("onClick")();
    }
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