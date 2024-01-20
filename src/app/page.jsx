"use client";
import HomeImage from './component/KotatuRoomBackground'
import BackgroundSrc from './public/image/HomeImage.png'
import KotatuSrc from './public/image/Kotatu.png'
import MikanCurrency from "@/app/component/mikan_currency";
import {useState} from "react";
import Shop from "@/app/component/Shop";
import UserProvider from "@/app/logic/userProvider";

export default function Home() {
    const [currencyAmount, setCurrencyAmount] = useState(100);
    const [furnitures, setFurnitures] = useState([]);

    return (
        <main className="size-full">
            <UserProvider user={{
                currencyAmount: currencyAmount,
                setCurrencyAmount: setCurrencyAmount,
                furnitures_inventory: furnitures}}
            >
                {/*<Shop/>*/}
                <div className="bg-cover bg-center bg-fixed size-full">
                    <div className="absolute top-5 left-5 z-10">
                        <MikanCurrency currencyAmount={currencyAmount}/>
                    </div>
                    <HomeImage backgroundsrc={BackgroundSrc} kotatusrc={KotatuSrc}/>
                </div>
            </UserProvider>
        </main>
    )
}
