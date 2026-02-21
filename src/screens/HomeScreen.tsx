import { useState } from "react"
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from "react-native"
import { useTasks } from "../context/TaskContext"
import TaskItem from "../components/TaskItem"
import AddTaskModal from "../components/AddTaskModal"
import ProgressBar from "../components/ProgressBar"
import { colors } from "../theme/colors"
import { usePremium } from "../context/PremiumContext"
import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { RootStackParamList } from "../types/navigation"

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Home">

export default function HomeScreen() {
    const { tasks, addTask, toggleTask, deleteTask } = useTasks()
    const [modalVisible, setModalVisible] = useState(false)
    const { isPremium, setPremium } = usePremium()
    const navigation = useNavigation<NavigationProp>()

    const totalCount = tasks.length
    const completedCount = tasks.filter(t => t.completed).length
    const activeCount = tasks.filter(t => !t.completed).length

    const handleAddTask = (title: string) => {
        const activeCount = tasks.filter(t => !t.completed).length

        if (!isPremium && activeCount >= 20) {
            Alert.alert(
                "Limit doldu",
                "Free plan ile maksimum 20 aktif görev ekleyebilirsin. Sınırsız görev için Premium’a geç.",
                [
                    { text: "Vazgeç", style: "cancel" },
                    { text: "Premium Ol", onPress: () => navigation.navigate("Premium") },
                ]
            )
            return
        }

        addTask(title)
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bugünün Görevleri</Text>

            <Text style={{ color: "gray", marginBottom: 10 }}>
                {isPremium ? "Premium Aktif" : "Free Kullanıcı"}
            </Text>

            <TouchableOpacity onPress={() => setPremium(!isPremium)}>
                <Text style={{ color: "#fff", marginBottom: 20 }}>
                    Premium Toggle (Test)
                </Text>
            </TouchableOpacity>

            <Text style={styles.counter}>
                {isPremium
                    ? `${activeCount}/${totalCount} aktif`
                    : `${activeCount}/20 aktif`}
            </Text>

            <ProgressBar completed={completedCount} total={totalCount} />

            {tasks.length === 0 && (
                <Text style={styles.empty}>Başlamak için bir görev ekle 🚀</Text>
            )}

            <FlatList
                data={tasks}
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
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.bg,
        padding: 20,
        paddingTop: 60,
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