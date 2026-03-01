import { useState, useMemo } from "react"
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useTasks } from "../context/TaskContext"
import TaskItem from "../components/TaskItem"
import AddTaskModal from "../components/AddTaskModal"
import ProgressBar from "../components/ProgressBar"
import { colors } from "../theme/colors"
import { usePremium } from "../context/PremiumContext"
import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { RootStackParamList } from "../types/navigation"

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Main">

export default function HomeScreen() {
    const { tasks, addTask, toggleTask, deleteTask } = useTasks()
    const [modalVisible, setModalVisible] = useState(false)
    const { isPremium } = usePremium()
    const navigation = useNavigation<NavigationProp>()

    // Premium auto-hide
    const visibleTasks = useMemo(() => {
        if (!isPremium) return tasks

        const today = new Date().toISOString().split("T")[0]

        return tasks.filter(task => {
            if (!task.completed) return true

            const completedDate = task.completedAt?.split("T")[0]
            return completedDate === today
        })
    }, [tasks, isPremium])

    const totalCount = visibleTasks.length
    const completedCount = visibleTasks.filter(t => t.completed).length
    const activeCount = tasks.filter(t => !t.completed).length

    const handleAddTask = (
        title: string,
        category?: string,
        reminderDate?: string
    ) => {
        const totalCount = tasks.length

        if (!isPremium && totalCount >= 20) {
            Alert.alert(
                "Limit doldu",
                totalCount > 20
                    ? "20’den fazla görevin var. Yeni görev eklemek için bazılarını sil veya Premium’a geç."
                    : "Free plan ile maksimum 20 görev ekleyebilirsin. Sınırsız görev için Premium’a geç.",
                [
                    { text: "Tamam", style: "cancel" },
                    { text: "Premium Ol", onPress: () => navigation.navigate("Premium") },
                ]
            )
            return
        }

        addTask(title, category, reminderDate)
    }

    return (
        <SafeAreaView style={styles.container} edges={["left", "right", "bottom"]}>
            <Text style={styles.title}>Bugünün Görevleri</Text>

            <Text style={styles.counter}>
                {isPremium ? `${totalCount} görev` : `${totalCount}/20 görev`}
            </Text>

            <ProgressBar completed={completedCount} total={totalCount} />

            {tasks.length === 0 && (
                <Text style={styles.empty}>Başlamak için bir görev ekle 🚀</Text>
            )}

            <FlatList
                data={visibleTasks}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <TaskItem
                        task={item}
                        onToggle={() => toggleTask(item.id)}
                        onDelete={() => deleteTask(item.id)}
                    />
                )}
            />

            <TouchableOpacity style={styles.fab} onPress={() => setModalVisible(true)}>
                <Text style={styles.fabText}>+</Text>
            </TouchableOpacity>

            <AddTaskModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                onAdd={handleAddTask}
            />
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
        marginBottom: 4,
    },
    counter: {
        color: colors.subtext,
        marginBottom: 6,
    },
    empty: {
        color: colors.subtext,
        marginTop: 40,
        textAlign: "center",
    },
    fab: {
        position: "absolute",
        right: 20,
        bottom: 40,
        backgroundColor: "#fff",
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center",
    },
    fabText: {
        fontSize: 28,
        color: "#000",
    },
})