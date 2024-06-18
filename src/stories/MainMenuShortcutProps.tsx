/**
 * MainMenu のショートカットのProps
 *
 * @export
 * @typedef {MainMenuShortcutProps}
 */

export type MainMenuShortcutProps = {
  
  /**
   * ショートカットの説明
   *
   * @type {string}
   */
  description: string;
  
  /**
   * ショートカットのアイコンのURL
   *
   * @type {string}
   */
  iconUrl: string;
  
  /**
   * ショートカットがクリックされたときの処理
   *
   * @type {() => void}
   */
  onClick: () => void;
};
