import type { Meta, StoryObj } from "@storybook/react";
import { TaskDescription } from "./TaskDescription";
import React from 'react';
import { LanguageContext } from "./LanguageContext";

export default { // meta
  title: "Mikan Components/TaskDescription",
  component: TaskDescription,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: "fullscreen",
  },
  args: {
    title: "これはタスクのテスト",
    description: "説明が入ります",
    registrationDate: new Date(2024, 1, 1),
    deadline: new Date(2024, 6, 1),
    priority: 0,
    taskStatus: false,
    mikanQuality: 0,
  }
} satisfies Meta<typeof TaskDescription>;

/**
 * タスクの例
 */
export const TaskExample: StoryObj<typeof TaskDescription> = {
  decorators: [
    (Story) => (
      <LanguageContext.Provider>
        <Story />
      </LanguageContext.Provider>
    )],
  args: {
    title: "TEST TASK",
    description:
      "ここにタスクの説明が入ります。タスクとは何か、どのようなことを行うのか、などを記載します。日付や担当者なども記載すると良いでしょう。期限や進捗状況も記載すると、よりわかりやすくなります。しかし、あまりにも長い説明は逆効果です。簡潔にまとめることを心がけましょう。ところで、この説明はどこまで表示されるのでしょうか？", // AIががんばった
    registrationDate: new Date(2021, 1, 1),
    deadline: new Date(2021, 1, 3),
    priority: 1,
    taskStatus: false,
    mikanQuality: 0,
  },
};
