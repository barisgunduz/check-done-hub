import { useState, useRef, useEffect } from "react"
import {
    Modal,
    View,
    TextInput,
    TouchableOpacity,
    Text,
    StyleSheet,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
} from "react-native"
import { colors } from "../theme/colors"
import { DEFAULT_CATEGORIES } from "../constants/categories"

type Props = {
    visible: boolean
    onClose: () => void
    onAdd: (title: string, category?: string) => void
}

export default function AddTaskModal({ visible, onClose, onAdd }: Props) {
    const [title, setTitle] = useState("")
    const [selectedCategory, setSelectedCategory] = useState<string | undefined>()
    const inputRef = useRef<TextInput>(null)

    useEffect(() => {
        if (visible) {
            const timer = setTimeout(() => {
                inputRef.current?.focus()
            }, 100)
            return () => clearTimeout(timer)
        }
    }, [visible])

    const handleAdd = () => {
        if (!title.trim()) return
        onAdd(title.trim(), selectedCategory)
        setTitle("")
        setSelectedCategory(undefined)
        onClose()
    }

    return (
        <Modal visible={visible} animationType="slide" transparent>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : undefined}
                style={styles.overlay}
            >
                <View style={styles.modal}>
                    <ScrollView
                        keyboardShouldPersistTaps="handled"
                        contentContainerStyle={{ paddingBottom: 20 }}
                    >
                        <TextInput
                            ref={inputRef}
                            placeholder="Yeni görev"
                            placeholderTextColor={colors.subtext}
                            value={title}
                            onChangeText={setTitle}
                            style={styles.input}
                            returnKeyType="done"
                            onSubmitEditing={handleAdd}
                            blurOnSubmit={false}
                        />

                        <View style={styles.categoryRow}>
                            {DEFAULT_CATEGORIES.map(cat => (
                                <TouchableOpacity
                                    key={cat}
                                    style={[
                                        styles.categoryBtn,
                                        selectedCategory === cat && styles.categoryBtnActive,
                                    ]}
                                    onPress={() => setSelectedCategory(cat)}
                                >
                                    <Text
                                        style={[
                                            styles.categoryText,
                                            selectedCategory === cat && styles.categoryTextActive,
                                        ]}
                                    >
                                        {cat}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                        <TouchableOpacity style={styles.button} onPress={handleAdd}>
                            <Text style={{ color: "#000" }}>Ekle</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={onClose}>
                            <Text style={styles.cancel}>Vazgeç</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
            </KeyboardAvoidingView>
        </Modal>
    )
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.6)",
        justifyContent: "flex-end",
    },
    modal: {
        backgroundColor: colors.card,
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        maxHeight: "80%",
    },
    input: {
        backgroundColor: colors.bg,
        color: colors.text,
        padding: 14,
        borderRadius: 12,
        marginBottom: 12,
    },
    button: {
        backgroundColor: "#fff",
        padding: 14,
        borderRadius: 12,
        alignItems: "center",
        marginBottom: 10,
    },
    cancel: {
        color: colors.subtext,
        textAlign: "center",
    },
    categoryRow: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginBottom: 12,
    },
    categoryBtn: {
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 10,
        paddingVertical: 6,
        paddingHorizontal: 10,
        marginRight: 8,
        marginBottom: 8,
    },
    categoryBtnActive: {
        backgroundColor: "#fff",
        borderColor: "#fff",
    },
    categoryText: {
        color: colors.text,
        fontSize: 13,
    },
    categoryTextActive: {
        color: "#000",
    },
})