import type { Meta, StoryObj } from "@storybook/react";
import { DropDownModal, DropDownModalProps } from "./DropDownModal";

export default {
  title: "DropDownModal",
  component: DropDownModal,
  tags: ["autodocs"],
  parameters: {
    layout: "centered"
  }
} satisfies Meta<DropDownModalProps<any>>;

/**
 * DropDownModal のサンプル
 */
export const DropDownModalExmaple: StoryObj<DropDownModalProps<Number>> = {
  args: {
    candidates: new Map([
      [1, <p>1st</p>],
      [2, <p>2nd</p>],
      [3, <p>3rd</p>],
    ]),
    onSelect: (index: number) => {
      console.info(`${index} was selected`);
    },
    onDismiss: () => {
    }
  }
}