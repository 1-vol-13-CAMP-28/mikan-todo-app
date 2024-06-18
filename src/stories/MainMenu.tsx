import React, { useState } from "react";
import MainMenuShortcut from "./MainMenuShortcut";
import "./mainMenu.css";
import { MainMenuProps } from "./MainMenuProps";


export const MainMenuButton = ({ isOpen, shortcuts }: MainMenuProps): React.JSX.Element => {
  const menuExpandIconUrl = "/image/ui/menu_expand.svg" // メニューが閉じているとき
  const menuCollapseIconUrl = "/image/ui/menu_collapse.svg" // メニューが開いているとき

  const [isMenuOpen, setIsMenuOpen] = useState(isOpen);
  const handleClick = () => {
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <div className="mainMenuWrapper">
      <div className="mainMenuPrimaryButton">
        <MainMenuShortcut
          iconUrl={isMenuOpen ? menuCollapseIconUrl : menuExpandIconUrl}
          description={isMenuOpen ? "Close" : "Open"}
          key="MainMenuToggle" onClick={handleClick} />
      </div>
      {isMenuOpen ?
        <div className="mainMenuShortcutButtonWrapper">
          {
            shortcuts.map((shortcut, index) => (
              <MainMenuShortcut iconUrl={shortcut.iconUrl} description={shortcut.description} key={index} onClick={shortcut.onClick} />
            ))
          }
        </div>
        :
        <></>
    }
    </div>
  )
}

export default MainMenuButton; /* これ忘れてしばらく引っかかったので、忘れないこと */