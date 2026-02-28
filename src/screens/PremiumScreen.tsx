import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { colors } from "../theme/colors"
import { usePremium } from "../context/PremiumContext"
import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { RootStackParamList } from "../types/navigation"

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Premium">

export default function PremiumScreen() {
    const { setPremium } = usePremium()
    const navigation = useNavigation<NavigationProp>()

    return (
        <SafeAreaView style={styles.container} edges={["left", "right", "bottom"]}>
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

            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    setPremium(true) // test
                    navigation.goBack()
                }}
            >
                <Text style={styles.buttonText}>Premium’a Geç</Text>
            </TouchableOpacity>

            <Text style={styles.small}>
                İstediğin zaman iptal edebilirsin.
            </Text>

            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={styles.cancel}>Şimdilik değil</Text>
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
        marginBottom: 30,
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
})