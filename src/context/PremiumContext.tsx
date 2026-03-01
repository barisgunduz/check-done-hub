import React, { createContext, useContext, useState, useEffect } from "react"
import { loadPremium, savePremium } from "../services/storage"
import AsyncStorage from "@react-native-async-storage/async-storage"

type PremiumContextType = {
    isPremium: boolean
    setPremium: (value: boolean) => void
    premiumStartedAt: string | null
    setPremiumStartedAt: (date: string | null) => void
    resetPremium: () => void
}

const PREMIUM_DATE_KEY = "PREMIUM_STARTED_AT"

const PremiumContext = createContext<PremiumContextType | undefined>(undefined)

export const PremiumProvider = ({ children }: { children: React.ReactNode }) => {
    const [isPremium, setIsPremium] = useState(false)
    const [premiumStartedAt, setPremiumStartedAtState] = useState<string | null>(null)

    // 🔄 İlk yükleme
    useEffect(() => {
        const load = async () => {
            const premiumStatus = await loadPremium()
            const startDate = await AsyncStorage.getItem(PREMIUM_DATE_KEY)

            if (premiumStatus && startDate) {
                const start = new Date(startDate)
                const expiry = new Date(start)
                expiry.setDate(expiry.getDate() + 30)

                if (new Date() > expiry) {
                    // ⛔ Süre dolmuş → otomatik düşür
                    setIsPremium(false)
                    setPremiumStartedAtState(null)
                    await savePremium(false)
                    await AsyncStorage.removeItem(PREMIUM_DATE_KEY)
                } else {
                    setIsPremium(true)
                    setPremiumStartedAtState(startDate)
                }
            } else {
                setIsPremium(premiumStatus)
                setPremiumStartedAtState(startDate)
            }
        }

        load()
    }, [])

    const setPremium = (value: boolean) => {
        setIsPremium(value)
        savePremium(value)
    }

    const setPremiumStartedAt = async (date: string | null) => {
        setPremiumStartedAtState(date)

        if (date) {
            await AsyncStorage.setItem(PREMIUM_DATE_KEY, date)
        } else {
            await AsyncStorage.removeItem(PREMIUM_DATE_KEY)
        }
    }

    const resetPremium = async () => {
        setIsPremium(false)
        setPremiumStartedAtState(null)
        await savePremium(false)
        await AsyncStorage.removeItem(PREMIUM_DATE_KEY)
    }

    return (
        <PremiumContext.Provider
            value={{
                isPremium,
                setPremium,
                premiumStartedAt,
                setPremiumStartedAt,
                resetPremium,
            }}
        >
            {children}
        </PremiumContext.Provider>
    )
}

export const usePremium = () => {
    const ctx = useContext(PremiumContext)
    if (!ctx) throw new Error("usePremium must be used within PremiumProvider")
    return ctx
}