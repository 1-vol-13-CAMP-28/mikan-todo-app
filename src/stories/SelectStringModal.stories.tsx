import type { Meta, StoryObj } from "@storybook/react";
import { SelectStringModal, SelectStringModalProps } from "./SelectStringModal";

export default {
  title: "SelectStringModal Example",
  component: SelectStringModal,
  tags: ["autodocs"],
  argTypes: {
    candidates: {
      description: "選択肢として表示する文字列の配列",
      control: {
        type: "object"
      }
    },
    onSelect: {
      description: "A callback function to call when a candidate is selected",
      action: "selected"
    },
    onDismiss: {
      description: "A callback function to call when the modal is dismissed",
      action: "dismissed"
    }
  },
  parameters: {
    layout: "centered"
  }
} satisfies Meta<SelectStringModalProps>

export const SelectStringModalExample: StoryObj<SelectStringModalProps> = {
  args: {
    candidates: ["🐶 Dogs","🐱 Cats","🐹 Hamsters","🐧 Penguins"],
    onSelect: (item: string) => {
      alert(`You like ${item}!`);
    },
    onDismiss: () => {
      alert("You do not like any of these?!");
    }
  }
}

export const SelectDeadlineModalExample: StoryObj<SelectStringModalProps> = {
  args: {
    candidates: ["⏳15分後", "🕑1時間後", "🌙今夜", "🌅明日", "📅今週末", "👆自分で選ぶ"],
    onSelect: (item: string) => {
      alert(`You selected ${item}!`);
    },
    useFirstLetterAsIcon: true,
  },
}