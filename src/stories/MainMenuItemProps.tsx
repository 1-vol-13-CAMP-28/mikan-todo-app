/**
 * MainMenu のショートカットのProps
 *
 * @export
 * @typedef {MainMenuItemProps}
 */

export type MainMenuItemProps = {
  
  /**
   * ショートカットの説明
   *
   * @type {string}
   */
  description: string;
  
  /**
   * ショートカットがクリックされたときの処理
   *
   * @type {() => void}
   */
  onClick: () => void;

  children: React.ReactNode;
};
