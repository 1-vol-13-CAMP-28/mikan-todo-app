import React, { useState } from "react";
import MainMenuItemWithIcon from "./MainMenuItemWithIcon";
import "./mainMenu.css";
import { MainMenuProps } from "./MainMenuProps";
import MainMenuItem from "./MainMenuItem";
import Image from "next/image";

/**
 * MainMenu そのもの
 *
 * @param {MainMenuProps} param0  メニューのProps
 * @param {boolean} param0.isOpen デフォルトでメニューが開いているかどうか
 * @param {{}} param0.shortcuts   メニューの子要素として表示させたいショートカットのリスト
 * @returns {React.JSX.Element}
 */
export const MainMenu = ({ isOpen, shortcuts }: MainMenuProps): React.JSX.Element => {
  const menuExpandIconUrl = "/image/ui/menu_expand.svg" // メニューが閉じているとき
  const menuCollapseIconUrl = "/image/ui/menu_collapse.svg" // メニューが開いているとき

  const [isMenuOpen, setIsMenuOpen] = useState(isOpen);
  const handleClick = () => {
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <div className={`mainMenuWrapper ${isMenuOpen ? 'mainMenuOpenAnimation' : 'mainMenuCloseAnimation'}`}>
      <div className="mainMenuPrimaryButton">
        {/* <MainMenuItem
          description={isMenuOpen ? "Close Menu" : "Open Menu"}
          key="MainMenuToggle" onClick={handleClick}>
          <Image src={isMenuOpen ? menuCollapseIconUrl : menuExpandIconUrl} alt={isMenuOpen ? "Close" : "Open"} />
        </MainMenuItem> */}
        <MainMenuItemWithIcon
          iconUrl={isMenuOpen ? menuCollapseIconUrl : menuExpandIconUrl}
          description={isMenuOpen ? "Close" : "Open"}
          key="MainMenuToggle" onClick={handleClick} />
      </div>
      {isMenuOpen ?
        <div className="mainMenuItemButtonWrapper">
          {
            shortcuts.map((shortcut, index) => (
              <MainMenuItemWithIcon iconUrl={shortcut.iconUrl} description={shortcut.description} key={index} onClick={shortcut.onClick} />
            ))
          }
        </div>
        :
        <></>
      }
    </div>
  )
}

export default MainMenu; /* これ忘れてしばらく引っかかったので、忘れないこと */