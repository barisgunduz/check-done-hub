import React, { createContext, useContext, useEffect, useState } from "react"
import { Task } from "../types/task"
import { loadTasks, saveTasks } from "../services/storage"
import { v4 as uuidv4 } from "uuid"
import { usePremium } from "./PremiumContext"

type TaskContextType = {
    tasks: Task[]
    addTask: (title: string) => void
    toggleTask: (id: string) => void
    deleteTask: (id: string) => void
    limitReached: boolean
}

const TaskContext = createContext<TaskContextType | undefined>(undefined)

export const TaskProvider = ({ children }: { children: React.ReactNode }) => {
    const [tasks, setTasks] = useState<Task[]>([])
    const { isPremium } = usePremium()

    useEffect(() => {
        loadTasks().then(setTasks)
    }, [])

    useEffect(() => {
        saveTasks(tasks)
    }, [tasks])

    const addTask = (title: string) => {
        const activeCount = tasks.filter(t => !t.completed).length

        const newTask: Task = {
            id: uuidv4(),
            title,
            completed: false,
            createdAt: new Date().toISOString(),
        }

        setTasks(prev => [newTask, ...prev])
    }

    const toggleTask = (id: string) => {
        setTasks(prev =>
            prev.map(t => (t.id === id ? { ...t, completed: !t.completed } : t))
        )
    }

    const deleteTask = (id: string) => {
        setTasks(prev => prev.filter(t => t.id !== id))
    }

    const activeCount = tasks.filter(t => !t.completed).length
    const limitReached = !isPremium && activeCount >= 20

    return (
        <TaskContext.Provider
            value={{ tasks, addTask, toggleTask, deleteTask, limitReached }}
        >
            {children}
        </TaskContext.Provider>
    )
}

export const useTasks = () => {
    const ctx = useContext(TaskContext)
    if (!ctx) throw new Error("useTasks must be used within TaskProvider")
    return ctx
}