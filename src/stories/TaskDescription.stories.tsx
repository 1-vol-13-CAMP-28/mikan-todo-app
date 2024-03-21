import type { Meta, StoryObj } from "@storybook/react";
import { TaskDescription } from "./TaskDescription";

export default { // meta
  title: "TaskDescription",
  component: TaskDescription,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: "fullscreen",
  },
  args: {
    title: "Task title",
    description: "Task description here",
    registrationDate: new Date(2000, 1, 1),
    deadline: new Date(2000, 1, 1),
    priority: 0,
    taskStatus: false,
    mikanQuality: 0,
  }
}  satisfies Meta<typeof TaskDescription>;

type Story = StoryObj<typeof TaskDescription>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const TaskExample: Story = {
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
