import type { Meta, StoryObj } from "@storybook/react";
import MainMenu from "./MainMenu";
import { MainMenuProps } from "./MainMenuProps";
import { action } from '@storybook/addon-actions';

export default {
  title: "Mikan Components/MainMenu/MainMenu",
  component: MainMenu,
  tags: ["autodocs"],
  args: {
  },
  parameters: {
    layout: "centered",
  },
  argTypes: {
    isOpen: {
      description: "デフォルトでメニューが開いているかどうか"
    },
    shortcuts: {
      description: "メニューの子要素として表示させたいショートカットのリスト"
    },
    orientation: {
      description: "メニューの向き (horizontal: ヨコ, vertical: タテ)"
    }
  }
} satisfies Meta<MainMenuProps>;

/**
 * MainMenu のサンプル
 * */
export const MainMenuExample: StoryObj<MainMenuProps> = {
  args: {
    isOpen: true,
    shortcuts: [
      {
        description: "hi",
        iconUrl: "/image/ui/menu_expand.svg",
        onClick: () => {
          action("onClick")();
          alert("Shortcut 1");
          console.log("Shortcut 1 clicked");
        }
      },
      {
        description: "hi",
        iconUrl: "/image/ui/menu_collapse.svg",
        onClick: () => {
          action("onClick")();
          alert("Shortcut 2");
          console.log("Shortcut 2 clicked");
        }
      }
    ]
  }
}