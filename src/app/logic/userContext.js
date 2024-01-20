import { createContext } from "react";

export const userContext = createContext({
    currencyAmount: 0,
    setCurrencyAmount: () => {},
    furnitures_inventory: []
});