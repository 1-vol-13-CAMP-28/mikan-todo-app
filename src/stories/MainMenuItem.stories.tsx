import type { Meta, StoryObj } from "@storybook/react";
import { MainMenuItem } from "./MainMenuItem";
import { MainMenuItemProps } from "./MainMenuItemProps";
import { action } from '@storybook/addon-actions';

export default {
  title: "Mikan Components/MainMenu/MainMenuItem",
  component: MainMenuItem,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    description: {
      description: "ショートカットの説明"
    },
    onClick: {
      description: "クリックされたときに呼ばれるコールバック関数",
      action: "clicked"
    }
  }
} satisfies Meta<MainMenuItemProps>;

export const MainMenuItemExample: StoryObj<MainMenuItemProps> = {
  args: {
    description: "shortcut",
    onClick: () => {
      action("onClick")(); // onClick イベントとしてSpyしてもらう
      alert("Hello from mainMenuItemExample!");
    }
  }
}