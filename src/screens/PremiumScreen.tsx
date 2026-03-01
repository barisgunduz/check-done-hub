import { View, Text, TouchableOpacity, StyleSheet, TextInput, Alert } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { colors } from "../theme/colors"
import { usePremium } from "../context/PremiumContext"
import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { RootStackParamList } from "../types/navigation"
import { useState, useMemo } from "react"

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Premium">

const PROMO_CODE = "CHECKDONE30"

export default function PremiumScreen() {
    const {
        isPremium,
        setPremium,
        premiumStartedAt,
        setPremiumStartedAt,
        resetPremium, // DEV
    } = usePremium()

    const navigation = useNavigation<NavigationProp>()
    const [code, setCode] = useState("")

    // 📅 Tarih hesaplama
    const { startDate, expiryDate, remainingDays } = useMemo(() => {
        if (!premiumStartedAt) {
            return {
                startDate: null,
                expiryDate: null,
                remainingDays: null,
            }
        }

        const start = new Date(premiumStartedAt)
        const expiry = new Date(start)
        expiry.setDate(expiry.getDate() + 30)

        const today = new Date()
        const diffTime = expiry.getTime() - today.getTime()
        const diffDays = Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)))

        return {
            startDate: start.toLocaleDateString(),
            expiryDate: expiry.toLocaleDateString(),
            remainingDays: diffDays,
        }
    }, [premiumStartedAt])

    const handleUpgrade = () => {
        const now = new Date().toISOString()
        setPremium(true)
        setPremiumStartedAt(now)
        navigation.goBack()
    }

    const handlePromo = () => {
        if (code.trim().toUpperCase() === PROMO_CODE) {
            const now = new Date().toISOString()
            setPremium(true)
            setPremiumStartedAt(now)
            Alert.alert("Tebrikler 🎉", "1 ay ücretsiz Premium kazandın!")
            setCode("")
            navigation.goBack()
        } else {
            Alert.alert("Geçersiz kod", "Bu promo kodu geçerli değil.")
        }
    }

    return (
        <SafeAreaView style={styles.container} edges={["left", "right", "bottom"]}>
            {!isPremium ? (
                <>
                    <Text style={styles.title}>Daha Fazlasını Yap</Text>
                    <Text style={styles.subtitle}>
                        Sınırsız görev ekle, hatırlatıcıları kullan ve tamamen reklamsız odaklan.
                    </Text>

                    <View style={styles.card}>
                        <Text style={styles.cardTitle}>Premium ile:</Text>
                        <Text style={styles.feature}>✓ Sınırsız görev</Text>
                        <Text style={styles.feature}>✓ Reklamsız kullanım</Text>
                        <Text style={styles.feature}>✓ Hatırlatıcılar</Text>
                        <Text style={styles.feature}>✓ Kategoriler</Text>
                    </View>

                    <View style={styles.priceBox}>
                        <Text style={styles.price}>₺49</Text>
                        <Text style={styles.period}>/ ay</Text>
                    </View>

                    <TouchableOpacity style={styles.button} onPress={handleUpgrade}>
                        <Text style={styles.buttonText}>Premium’a Geç</Text>
                    </TouchableOpacity>

                    {/* 🎁 PROMO CODE */}
                    <View style={styles.promoBox}>
                        <Text style={styles.promoTitle}>Promo Kod</Text>
                        <View style={styles.promoRow}>
                            <TextInput
                                value={code}
                                onChangeText={setCode}
                                placeholder="Kodu gir"
                                placeholderTextColor={colors.subtext}
                                style={styles.promoInput}
                            />
                            <TouchableOpacity style={styles.promoButton} onPress={handlePromo}>
                                <Text style={styles.promoButtonText}>Kullan</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <Text style={styles.small}>
                        İstediğin zaman iptal edebilirsin.
                    </Text>
                </>
            ) : (
                <>
                    <Text style={styles.title}>Premium Aktif 🎉</Text>

                    <View style={styles.card}>
                        <Text style={styles.cardTitle}>Üyelik Bilgisi</Text>

                        <Text style={styles.feature}>Başlangıç: {startDate}</Text>
                        <Text style={styles.feature}>Yenileme: {expiryDate}</Text>
                        <Text style={styles.feature}>Kalan gün: {remainingDays}</Text>
                    </View>

                    <View style={styles.card}>
                        <Text style={styles.cardTitle}>Premium Avantajları</Text>
                        <Text style={styles.feature}>✓ Sınırsız görev</Text>
                        <Text style={styles.feature}>✓ Hatırlatıcılar</Text>
                        <Text style={styles.feature}>✓ Kategoriler</Text>
                        <Text style={styles.feature}>✓ Geçmiş görev arşivi</Text>
                    </View>

                    {/* DEV RESET */}
                    <TouchableOpacity
                        style={styles.devButton}
                        onPress={() => {
                            resetPremium()
                            navigation.goBack()
                        }}
                    >
                        <Text style={styles.devButtonText}>Premium’u Sıfırla (DEV)</Text>
                    </TouchableOpacity>
                </>
            )}

            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={styles.cancel}>Geri dön</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.bg,
        padding: 16,
    },
    title: {
        color: colors.text,
        fontSize: 30,
        fontWeight: "bold",
        marginBottom: 8,
    },
    subtitle: {
        color: colors.subtext,
        marginBottom: 24,
        fontSize: 15,
    },
    card: {
        backgroundColor: colors.card,
        borderRadius: 18,
        padding: 20,
        marginBottom: 20,
    },
    cardTitle: {
        color: colors.text,
        fontSize: 16,
        marginBottom: 12,
        fontWeight: "600",
    },
    feature: {
        color: colors.text,
        marginBottom: 8,
        fontSize: 15,
    },
    priceBox: {
        flexDirection: "row",
        alignItems: "flex-end",
        justifyContent: "center",
        marginBottom: 20,
    },
    price: {
        color: colors.text,
        fontSize: 36,
        fontWeight: "bold",
    },
    period: {
        color: colors.subtext,
        fontSize: 16,
        marginBottom: 4,
        marginLeft: 4,
    },
    button: {
        backgroundColor: "#fff",
        padding: 18,
        borderRadius: 16,
        alignItems: "center",
        marginBottom: 16,
    },
    buttonText: {
        color: "#000",
        fontWeight: "bold",
        fontSize: 16,
    },
    small: {
        color: colors.subtext,
        textAlign: "center",
        marginTop: 12,
        fontSize: 12,
    },
    cancel: {
        color: colors.subtext,
        textAlign: "center",
        marginTop: 20,
    },
    promoBox: {
        marginTop: 10,
    },
    promoTitle: {
        color: colors.subtext,
        marginBottom: 6,
    },
    promoRow: {
        flexDirection: "row",
    },
    promoInput: {
        flex: 1,
        backgroundColor: colors.card,
        color: colors.text,
        borderRadius: 12,
        paddingHorizontal: 12,
        marginRight: 8,
    },
    promoButton: {
        backgroundColor: "#fff",
        paddingHorizontal: 16,
        justifyContent: "center",
        borderRadius: 12,
    },
    promoButtonText: {
        color: "#000",
        fontWeight: "600",
    },
    devButton: {
        backgroundColor: "#ff453a",
        padding: 14,
        borderRadius: 12,
        alignItems: "center",
    },
    devButtonText: {
        color: "#fff",
        fontWeight: "bold",
    },
})