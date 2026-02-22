import { useState, useRef, useEffect } from "react"
import {
    Modal,
    View,
    TextInput,
    TouchableOpacity,
    Text,
    StyleSheet,
} from "react-native"
import { colors } from "../theme/colors"

type Props = {
    visible: boolean
    onClose: () => void
    onAdd: (title: string) => void
}

export default function AddTaskModal({ visible, onClose, onAdd }: Props) {
    const [title, setTitle] = useState("")
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
        onAdd(title.trim())
        setTitle("")
        onClose()
    }

    return (
        <Modal visible={visible} animationType="slide" transparent>
            <View style={styles.overlay}>
                <View style={styles.modal}>
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

                    <TouchableOpacity style={styles.button} onPress={handleAdd}>
                        <Text style={{ color: "#000" }}>Ekle</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={onClose}>
                        <Text style={styles.cancel}>Vazgeç</Text>
                    </TouchableOpacity>
                </View>
            </View>
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
})