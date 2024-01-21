import {memo} from "react";
import Image from "next/image";

export const Modal = memo((props) => {
    const closeHandler = props.closeHandler;

    return (
        <div className={`fixed z-10 z-${props.zIndex} flex inset-0 justify-center`} onClick={closeHandler}>
            <div className="flex h-screen flex-col justify-center items-center min-w-1/2">
                <div className="bg-white w-1/1 rounded-xl">
                    <div className="flex flex-row justify-end">
                        <button className="rounded-xl p-2" onClick={closeHandler}>X</button>
                    </div>
                    <div className="">
                        {props.children}
                    </div>
                </div>
            </div>

        </div>
    );
});

export const BuyConfirmationModal = memo((props) => {
    const dismissHandler = props.dismissHandler;
    const acceptHandler = props.buyHandler;
    const item = props.item;
    console.info(item);

    return (
        <Modal zIndex={props.zIndex} closeHandler={dismissHandler}>
            <div className="p-10">
                <div className="w-1/1" style={{width: "100%", height: "6rem", position: "relative"}}>
                    <Image src={item.imagePath} alt={item.displayName} fill sizes="50vw" className={"object-contain"}/>
                </div>
                <div className="flex flex-col justify-center items-center">
                    <div className="flex flex-col justify-center">
                        <p className="text-center">かう？</p>
                        <p className="text-center">{item.displayName}</p>
                        <p className="text-center">{item.price}<span>mp</span></p>
                        <div className="flex flex-row justify-center">
                            <button className="rounded-xl p-2" onClick={(e) => {
                                e.stopPropagation();
                                acceptHandler();
                            }}>Yes
                            </button>
                            <button className="rounded-xl p-2" onClick={(e) => {
                                e.stopPropagation();
                                dismissHandler();
                            }}>No
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
});

