import MikanCurrency from "@/app/component/mikan_currency";
import {ShopItemsContainer} from "@/app/component/ShopItemsContainer";
import {furnitureInfo} from "@/app/logic/FurnitureInfo";
import {useContext} from "react";
import {userContext} from "@/app/logic/userContext";

const furniture=[
        new furnitureInfo("しろぬっこ", 10, "nuko_white", "せつめい！"),
        new furnitureInfo("しろぬっこ2", 100, "nuko_white2", "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.")
]

export default function Shop() {
    const user = useContext(userContext);

    const buyItemHandler = (furniture) => {
        if (furniture.price <= user.currencyAmount) {
            user.setCurrencyAmount(user.currencyAmount - furniture.price);
            user.furnitures_inventory.push(furniture.targetComponentId);
            console.log("Buy item: " + furniture.displayName);
        }
    }

    return (
        <>
                <h1>Shop</h1>

                <div className="bg-cover bg-center bg-fixed size-full">
                    <div className="flex flex-col justify-center">
                        <div>
                            <MikanCurrency currencyAmount={user.currencyAmount}/>
                        </div>
                        <ShopItemsContainer furnitures={furniture} buyItemHandler={buyItemHandler}/>
                    </div>
                </div>
        </>
    )
}
