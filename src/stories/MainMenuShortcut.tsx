import Image from "next/image";
import PropTypes from "prop-types";
import "./mainMenuShortcut.css";
import { MainMenuShortcutProps } from "./MainMenuShortcutProps";

const OnClickHandler = (onClick: () => void) => {
  return () => {
    onClick();
  }
}

export const MainMenuShortcut = ({ description, iconUrl, onClick }: MainMenuShortcutProps): React.JSX.Element => {
  return <button className="mainMenuShortcut" onClick={OnClickHandler(onClick)}>
           <Image src={iconUrl} alt={description} width={32} height={32} />
          </button>
}

MainMenuShortcut.PropTypes = {
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

MainMenuShortcut.defaultProps = {
  description: "ショートカット",
  iconUrl: "/image/MainMenuBar.svg",
  onClick: () => {}
};


export default MainMenuShortcut;