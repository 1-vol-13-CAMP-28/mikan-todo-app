import PropTypes from "prop-types";
import "./mainMenuItem.css";
import { MainMenuItemProps } from "./MainMenuItemProps";

/**
 * MainMenu のショートカットが実行する関数をラップする
 *
 * @param {() => void} onClick
 * @returns {void) => () => void}
 */
const OnClickHandler = (onClick: () => void) => {
  return () => {
    onClick();
  }
}

/**
 * MainMenu に使うショートカットのボタン
 *
 * @param {MainMenuItem} param0 ショートカットに与えるProps
 * @param {string} param0.description    ショートカットの説明
 * @param {() => void} param0.onClick    クリック時のコールバック関数
 * @returns {React.JSX.Element}
 */
export const MainMenuItem = ({ description, onClick, children}: MainMenuItemProps): React.JSX.Element => {
  return <button className="mainMenuItem mainMenuItemWithIcon" onClick={OnClickHandler(onClick)} aria-description={description}>
    {children}
  </button>
}

MainMenuItem.PropTypes = {
  /**
   * ショートカットの説明
   */
  description: PropTypes.string,
  /**
   * クリック時のコールバック関数
   */
  onClick: PropTypes.func
}

MainMenuItem.defaultProps = {
  description: "ショートカット",
  onClick: () => { }
};

export default MainMenuItem;