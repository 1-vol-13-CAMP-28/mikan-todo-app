import type { Meta, StoryObj } from "@storybook/react";
import MainMenuShortcut from "./MainMenuShortcut";
import { MainMenuShortcutProps } from "./MainMenuShortcut";
import { fn } from "@storybook/test";
import { action } from '@storybook/addon-actions';

export default {
  title: "Mikan Components/MainMenu/MainMenuShortcut",
  component: MainMenuShortcut,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<MainMenuShortcutProps>;

export const MainMenuShortcutExample: StoryObj<MainMenuShortcutProps> = {
  args: {
    description: "shortcut",
    iconUrl: "/image/ui/menu_expand.svg",
    onClick: () => {
      action("onClick")(); // onClick イベントとしてSpyしてもらう
      alert("Hello from MainMenuShortcutExample!");
    }
  }
}