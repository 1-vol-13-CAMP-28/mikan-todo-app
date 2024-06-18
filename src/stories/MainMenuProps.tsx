import { MainMenuShortcutProps } from "./MainMenuShortcutProps";

/**
 * MainMenu のProps
 *
 * @export
 * @typedef {MainMenuProps}
 */

export type MainMenuProps = {
  /**
   * デフォルトでメニューが開いているかどうか
   */
  isOpen: boolean;
  /**
   * メニューの子要素として表示させたいショートカットのリスト
   */
  shortcuts: MainMenuShortcutProps[];
};
