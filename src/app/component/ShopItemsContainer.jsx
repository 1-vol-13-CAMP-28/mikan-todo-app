import Image from "next/image";
import {useContext} from "react";
import {userContext} from "@/app/logic/userContext";

function ShopItem(props) {
    const user = useContext(userContext);
    const item = props.item;

    const onClickHandler = () => {
        props.buyItemHandler(item);
    }

    return (
        <div className={`
        border-amber-100
        p-1
        m-4
        rounded-xl
        w-2/3
        max-w-40
        flex
        flex-col
        flex-wrap
        content-center
        ${item.price > user.currencyAmount ? "bg-amber-50" : "bg-amber-200"}
        `}
        onClick={onClickHandler}>
            <div className="w-1/1" style={{width: "100%", height: "6rem", position: "relative"}}>
                <Image src={item.imagePath} alt={item.displayName} fill sizes="50vw" className={"object-contain"}/>
            </div>
            <p className="text-center">{item.displayName}</p>
            <hr/>
            <p className="text-center text-gray-800 text-sm">{item.description}</p>
            <p className="
            text-center
            p-2
            ">{item.price}<span>mp</span></p>
        </div>
    )
}

export function ShopItemsContainer(props) {
    let furnitures = props.furnitures;
    return (
        <div className="flex flex-row flex-grow flex-wrap justify-center">
            {furnitures.map((furniture) => {
                return (
                    <ShopItem key={furniture.targetComponentId} item={furniture} buyItemHandler={props.buyItemHandler}/>
                )
            })}
        </div>
    )
}