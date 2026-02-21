import { View, StyleSheet } from "react-native"
import { colors } from "../theme/colors"

type Props = {
    completed: number
    total: number
}

export default function ProgressBar({ completed, total }: Props) {
    const percent = total === 0 ? 0 : completed / total

    return (
        <View style={styles.container}>
            <View style={[styles.fill, { width: `${percent * 100}%` }]} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 6,
        backgroundColor: colors.border,
        borderRadius: 4,
        overflow: "hidden",
        marginBottom: 16,
    },
    fill: {
        height: 6,
        backgroundColor: "#fff",
    },
})