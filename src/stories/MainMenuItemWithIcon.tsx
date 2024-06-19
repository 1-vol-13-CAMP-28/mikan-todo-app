import Image from "next/image";
import PropTypes from "prop-types";
import "./mainMenuItem.css";
import "./mainMenuItemWithIcon.css";
import { MainMenuItemWithIconProps } from "./MainMenuItemWithIconProps";

import MainMenuItem from "./MainMenuItem";

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
 * @param {MainMenuItemWithIconProps} param0 ショートカットに与えるProps
 * @param {string} param0.description    ショートカットの説明
 * @param {string} param0.iconUrl        アイコンのURL
 * @param {() => void} param0.onClick    クリック時のコールバック関数
 * @returns {React.JSX.Element}
 */
export const MainMenuItemWithIcon = ({ description, iconUrl, onClick }: MainMenuItemWithIconProps): React.JSX.Element => {
  return <MainMenuItem description={description} onClick={onClick}>
    <Image src={iconUrl} alt={description} width={32} height={32} />
  </MainMenuItem>

  // return <button className="mainMenuItem mainMenuItemWithIcon" onClick={OnClickHandler(onClick)}>
  //   <Image src={iconUrl} alt={description} width={32} height={32} />
  // </button>
}

MainMenuItemWithIcon.PropTypes = {
  /**
   * ショートカットの説明
   */
  description: PropTypes.string,
  /**
   * ショートカットのアイコンの URL
   */
  iconUrl: PropTypes.string,
  /**
   * クリック時のコールバック関数
   */
  onClick: PropTypes.func
}

MainMenuItemWithIcon.defaultProps = {
  description: "ショートカット",
  iconUrl: "/image/ui/MainMenuBar.svg",
  onClick: () => { }
};

export default MainMenuItemWithIcon;