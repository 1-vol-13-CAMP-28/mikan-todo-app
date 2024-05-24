import type { Meta, StoryObj } from "@storybook/react";
import { SelectStringModal } from "./SelectStringModal";
import { SelectStringModalProps } from "../app/types/SelectStringModalProps";

export default {
  title: "Mikan Components/DropDown/SelectStringModal",
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
      description: "選択肢がひとつ選択されたときに呼ばれるコールバック関数 (引数: 選択された文字列)",
      action: "selected"
    },
    onDismiss: {
      description: "選択肢を選ばずにモーダルを閉じたときに呼ばれるコールバック関数",
      action: "dismissed"
    },
    useFirstLetterAsIcon: {
      description: "選択肢の先頭文字をアイコンとして表示する (onSelect のコールバック関数に渡される引数は変えない)",
      control: {
        type: "boolean"
      }
    }
  },
  parameters: {
    layout: "centered"
  }
} satisfies Meta<SelectStringModalProps>

/**
 * モーダル内で選択肢を表示するコンポーネントの例
 */
export const SelectStringModalExample: StoryObj<SelectStringModalProps> = {
  args: {
    candidates: ["Dogs🐶", "Cats🐱", "Hamsters🐹","Penguins🐧"],
    onSelect: (item: string) => {
      alert(`You like ${item}!`);
    },
    onDismiss: () => {
      alert("You do not like any of these?!");
    }
  }
}

/**
 * 期限選択に応用する例
 */

export const SelectDeadlineModalExample: StoryObj<SelectStringModalProps> = {
  args: {
    candidates: ["⏳15分後", "🕑1時間後", "🌙今夜", "🌅明日", "📅今週末", "👆自分で選ぶ"],
    onSelect: (item: string) => {
      alert(`You selected ${item}!`);
    },
    useFirstLetterAsIcon: true,
  },
}