import type { Meta, StoryObj } from "@storybook/react";
import MainMenuItemWithIcon from "./MainMenuItemWithIcon";
import { MainMenuItemWithIconProps } from "./MainMenuItemWithIconProps";
import { action } from '@storybook/addon-actions';

export default {
  title: "Mikan Components/MainMenu/mainMenuItemWithIcon",
  component: MainMenuItemWithIcon,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    description: {
      description: "ショートカットの説明"
    },
    iconUrl: {
      description: "ショートカットのアイコンのURL"
    },
    onClick: {
      description: "クリックされたときに呼ばれるコールバック関数",
      action: "clicked"
    }
  }
} satisfies Meta<MainMenuItemWithIconProps>;

export const MainMenuItemWithIconExample: StoryObj<MainMenuItemWithIconProps> = {
  args: {
    description: "shortcut",
    iconUrl: "/image/ui/menu_expand.svg",
    onClick: () => {
      action("onClick")(); // onClick イベントとしてSpyしてもらう
      alert("Hello from mainMenuItemExample!");
    }
  }
}