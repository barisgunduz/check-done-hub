import React, { useEffect, useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, Linking } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { colors } from "../theme/colors"
import { usePremium } from "../context/PremiumContext"
import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { RootStackParamList } from "../types/navigation"
import * as Notifications from "expo-notifications"

type NavigationProp = NativeStackNavigationProp<RootStackParamList>

export default function SettingsScreen() {
    const { isPremium, setPremium } = usePremium()
    const navigation = useNavigation<NavigationProp>()

    const [notificationStatus, setNotificationStatus] = useState<
        "granted" | "denied" | "undetermined"
    >("undetermined")

    // 🔔 Bildirim izin durumunu çek
    useEffect(() => {
        const getStatus = async () => {
            const settings = await Notifications.getPermissionsAsync()
            setNotificationStatus(settings.status)
        }

        getStatus()
    }, [])

    const openSystemSettings = () => {
        Linking.openSettings()
    }

    return (
        <SafeAreaView style={styles.container} edges={["left", "right", "bottom"]}>
            <Text style={styles.title}>Ayarlar</Text>

            {/* PREMIUM */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Premium</Text>

                <View style={styles.row}>
                    <Text style={styles.label}>Durum</Text>
                    <Text style={styles.value}>
                        {isPremium ? "Aktif" : "Free"}
                    </Text>
                </View>

                {!isPremium && (
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => navigation.navigate("Premium")}
                    >
                        <Text style={styles.buttonText}>Premium’a geç</Text>
                    </TouchableOpacity>
                )}

                {/* DEV TEST BUTONU */}
                {isPremium && (
                    <TouchableOpacity
                        style={styles.devButton}
                        onPress={() => setPremium(false)}
                    >
                        <Text style={styles.devButtonText}>
                            Premium sıfırla (DEV)
                        </Text>
                    </TouchableOpacity>
                )}
            </View>

            {/* BİLDİRİMLER */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Bildirimler</Text>

                <View style={styles.row}>
                    <Text style={styles.label}>Durum</Text>
                    <Text style={styles.value}>
                        {notificationStatus === "granted"
                            ? "Açık"
                            : notificationStatus === "denied"
                                ? "Kapalı"
                                : "Bilinmiyor"}
                    </Text>
                </View>

                {notificationStatus !== "granted" && (
                    <TouchableOpacity
                        style={styles.buttonSecondary}
                        onPress={openSystemSettings}
                    >
                        <Text style={styles.buttonSecondaryText}>
                            Ayarlar’a git
                        </Text>
                    </TouchableOpacity>
                )}
            </View>

            {/* UYGULAMA */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Uygulama</Text>

                <View style={styles.row}>
                    <Text style={styles.label}>Versiyon</Text>
                    <Text style={styles.value}>v1.8</Text>
                </View>

                <TouchableOpacity style={styles.buttonSecondary}>
                    <Text style={styles.buttonSecondaryText}>
                        Dil: Türkçe
                    </Text>
                </TouchableOpacity>
            </View>
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
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 20,
    },
    section: {
        marginBottom: 24,
        backgroundColor: colors.card,
        padding: 16,
        borderRadius: 16,
    },
    sectionTitle: {
        color: colors.text,
        fontSize: 14,
        fontWeight: "600",
        marginBottom: 12,
        textTransform: "uppercase",
        letterSpacing: 1,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 12,
    },
    label: {
        color: colors.subtext,
        fontSize: 14,
    },
    value: {
        color: colors.text,
        fontSize: 14,
        fontWeight: "500",
    },
    button: {
        backgroundColor: "#fff",
        paddingVertical: 12,
        borderRadius: 12,
        alignItems: "center",
        marginBottom: 10,
    },
    buttonText: {
        color: "#000",
        fontWeight: "600",
    },
    devButton: {
        paddingVertical: 10,
        alignItems: "center",
    },
    devButtonText: {
        color: "#ff453a",
        fontSize: 13,
    },
    buttonSecondary: {
        borderWidth: 1,
        borderColor: colors.border,
        paddingVertical: 12,
        borderRadius: 12,
        alignItems: "center",
    },
    buttonSecondaryText: {
        color: colors.text,
        fontWeight: "500",
    },
})