import MikanCurrency from "@/app/component/mikan_currency";
import {ShopShowCase} from "@/app/component/ShopShowCase";
import {furnitureInfo} from "@/app/logic/FurnitureInfo";
import {useContext, useState} from "react";
import {userContext} from "@/app/logic/userContext";
import {BuyConfirmationModal, Modal} from "@/app/component/Modal";

const furniture=[
        new furnitureInfo("しろぬっこ", 10, "nuko_white", "せつめい！"),
        new furnitureInfo("しろぬっこ2", 30, "nuko_white2", "せつめい！"),
        new furnitureInfo("しろぬっこ3", 50, "nuko_white3", "せつめい！"),
        new furnitureInfo("しろぬっこ4", 100, "nuko_white4", "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."),
        new furnitureInfo("しろぬっこ5", 10000, "nuko_white5", "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."),
        new furnitureInfo("水玉こたつ（青）", 100, "kotatu_blue_mizutama", "せつめい!"),
        new furnitureInfo("水玉こたつ（明るい青）", 100, "kotatu_blue_mizutama_light", "せつめい!"),
        new furnitureInfo("水玉こたつ（明るい黄）", 100, "kotatu_yellow_mizutama_light", "せつめい!"),
        new furnitureInfo("水玉こたつ（明るい緑）", 100, "kotatu_green_mizutama_light", "せつめい!"),
        new furnitureInfo("水玉こたつ（明るい赤）", 100, "kotatu_red_mizutama_light", "せつめい!"),
        new furnitureInfo("シャープこたつ（青）", 100, "kotatu_sharp_blue", "せつめい!"),
        new furnitureInfo("シャープこたつ（黄色）", 100, "kotatu_sharp_yellow", "せつめい!"),
        new furnitureInfo("シャープこたつ（オレンジ）", 100, "kotatu_sharp_orange", "せつめい!"),
        new furnitureInfo("シャープこたつ（ピンク）", 100, "kotatu_sharp_pink", "せつめい!"),
        new furnitureInfo("シャープこたつ（赤）", 100, "kotatu_sharp_red", "せつめい!"),
        new furnitureInfo("宇宙柄こたつ", 100, "kotatu_space", "せつめい!"),
        new furnitureInfo("ボーダー柄こたつ(赤)", 100, "kotatu_red_border", "せつめい!"),
        new furnitureInfo("桜ふすま(昼)", 100, "husuma_sakura_day", "せつめい!"),
        new furnitureInfo("桜ふすま(夜)", 100, "husuma_sakura_night", "せつめい!"),
        new furnitureInfo("宇宙柄ふすま", 100, "husuma_space", "せつめい!")
    ]

export default function Shop() {
    const user = useContext(userContext);
    const [isBuyWindowOpen, setIsBuyWindowOpen] = useState(false);
    const [buyingItem, setBuyingItem] = useState(null);

    const setBuyingItemLocal = (furniture) => {
        setBuyingItem(furniture);
    }

    const buyItemConfirmation = (furniture) => {
        setBuyingItemLocal(furniture);
        setIsBuyWindowOpen(true);
    }

    const buyItemHandler = () => {
        const furniture = buyingItem;
        if (furniture.price <= user.currencyAmount) {
            user.setCurrencyAmount(user.currencyAmount - furniture.price);
            user.furnitures_inventory.push(furniture.targetComponentId);
            console.log("Buy item: " + furniture.displayName);
        }
    }

    return (
        <>
            {isBuyWindowOpen ?
                <BuyConfirmationModal zIndex="50"
                                      dismissHandler={() => {setIsBuyWindowOpen(false)}}
                                      item={buyingItem}
                                      buyHandler={() => {buyItemHandler(); setIsBuyWindowOpen(false);}}/>
                : null}
                <h1 className="text-4xl text-center mt-4 mb-4">Shop</h1>

                <div className="bg-cover bg-center bg-fixed size-full">
                    <div className="flex flex-col justify-center">
                        <div>
                            <MikanCurrency currencyAmount={user.currencyAmount}/>
                        </div>
                        <ShopShowCase furnitures={furniture} buyItemHandler={buyItemConfirmation}/>
                    </div>
                </div>
        </>
    )
}
