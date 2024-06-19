/**
 * MainMenu のショートカットのProps
 *
 * @export
 * @typedef {MainMenuItemWithIconProps}
 */

export type MainMenuItemWithIconProps = {
  
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
