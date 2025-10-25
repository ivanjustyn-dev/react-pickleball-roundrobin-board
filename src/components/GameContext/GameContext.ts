import { createContext, useContext } from "react";
import type { GameContextType } from "../types";



export const GameContext = createContext<GameContextType | undefined>(undefined);


export const useGameContext = () => {
    const context = useContext(GameContext);
    if (context === undefined) {
        throw new Error('useGame must be used within an GameContextProvider');
    }
    return context;
}