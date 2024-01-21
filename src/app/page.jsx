"use client";
import HomeImage from './component/KotatuRoomBackground'
import BackgroundSrc from './public/image/HomeImage.png'
import KotatuSrc from './public/image/Kotatu.png'
import MikanCurrency from "@/app/component/mikan_currency";
import {useState} from "react";
import Shop from "@/app/component/Shop";
import UserProvider from "@/app/logic/userProvider";
import {MikanTasks} from "@/app/mikanTasks";

export default function Home() {
    const [currencyAmount, setCurrencyAmount] = useState(100);
    const [furnitures, setFurnitures] = useState([]);

    return (
        <main className="size-full">
            <UserProvider user={{
                currencyAmount: currencyAmount,
                setCurrencyAmount: setCurrencyAmount,
                furnitures_inventory: furnitures
            }}>
                {/*<Shop/>*/}
                <div className="bg-cover bg-center bg-fixed size-full">
                    <div className="absolute top-5 left-5 z-10">
                        <MikanCurrency currencyAmount={currencyAmount}/>
                    </div>
                    <HomeImage backgroundsrc={BackgroundSrc} kotatusrc={KotatuSrc}/>
                </div>
                <div id="task-canvas" className="absolute top-0 left-0">
                    <MikanTasks tasks={
                        [
                            {
                                id: "0",
                                text: "タスク1",
                                visual: "normal",
                                done: false
                            },
                            {
                                id: "1",
                                text: "タスク2",
                                visual: "bad",
                                deadline: "2024-01-20",
                                done: false
                            },
                            {
                                id: "2",
                                text: "タスク2",
                                visual: "important",
                                done: false
                            }
                        ]
                    }/>
                </div>
            </UserProvider>
        </main>
    );
}