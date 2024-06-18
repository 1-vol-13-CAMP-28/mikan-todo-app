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
    layout: "fullscreen",
  },
} satisfies Meta<MainMenuProps>;

export const MainMenuExample: StoryObj<MainMenuProps> = {
  args: {
    isOpen: true,
    shortcuts: [
      {
        description: "hi",
        iconUrl: "/image/ui/menu_expand.svg",
        onClick: () => {
          action("onClick")();
          console.log("Shortcut 1 clicked");
        }
      }
    ]
  }
}