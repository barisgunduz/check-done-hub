import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { Task } from "../types/task"
import { colors } from "../theme/colors"
import { Ionicons } from "@expo/vector-icons"

type Props = {
    task: Task
    onToggle: () => void
    onDelete: () => void
}

export default function TaskItem({ task, onToggle, onDelete }: Props) {
    return (
        <View style={styles.card}>
            <TouchableOpacity onPress={onToggle} style={styles.left}>
                <View style={[styles.checkbox, task.completed && styles.checked]}>
                    {task.completed && (
                        <Ionicons name="checkmark" size={16} color="#000" />
                    )}
                </View>

                <Text style={[styles.title, task.completed && styles.done]}>
                    {task.title}
                </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={onDelete} style={styles.deleteBtn}>
                <Ionicons name="trash-outline" size={20} color="#ff453a" />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.card,
        padding: 16,
        borderRadius: 16,
        marginBottom: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    left: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
    },
    checkbox: {
        width: 22,
        height: 22,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: colors.border,
        marginRight: 12,
        alignItems: "center",
        justifyContent: "center",
    },
    checked: {
        backgroundColor: "#30D158", // yeşil
        borderColor: "#30D158",
    },
    title: {
        color: colors.text,
        fontSize: 16,
        flexShrink: 1,
    },
    done: {
        textDecorationLine: "line-through",
        color: colors.subtext,
    },
    deleteBtn: {
        paddingLeft: 10,
    },
})