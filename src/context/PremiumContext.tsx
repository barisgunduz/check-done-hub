import React, { createContext, useContext, useState, useEffect } from "react"
import { loadPremium, savePremium } from "../services/storage"

type PremiumContextType = {
    isPremium: boolean
    setPremium: (value: boolean) => void
}

const PremiumContext = createContext<PremiumContextType | undefined>(undefined)

export const PremiumProvider = ({ children }: { children: React.ReactNode }) => {
    const [isPremium, setIsPremium] = useState(false)
    useEffect(() => {
        loadPremium().then(setIsPremium)
    }, [])

    const setPremium = (value: boolean) => {
        setIsPremium(value)
        savePremium(value)
    }

    return (
        <PremiumContext.Provider value={{ isPremium, setPremium }}>
            {children}
        </PremiumContext.Provider>
    )
}

export const usePremium = () => {
    const ctx = useContext(PremiumContext)
    if (!ctx) throw new Error("usePremium must be used within PremiumProvider")
    return ctx
}