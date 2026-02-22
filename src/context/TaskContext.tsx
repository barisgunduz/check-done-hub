import React, { createContext, useContext, useEffect, useState } from "react"
import { Task } from "../types/task"
import { loadTasks, saveTasks } from "../services/storage"
import { v4 as uuidv4 } from "uuid"
import { usePremium } from "./PremiumContext"

type TaskContextType = {
    tasks: Task[]
    addTask: (title: string, category?: string) => void
    toggleTask: (id: string) => void
    deleteTask: (id: string) => void
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

    const addTask = (title: string, category?: string) => {
        const activeCount = tasks.filter(t => !t.completed).length

        const newTask: Task = {
            id: uuidv4(),
            title,
            completed: false,
            createdAt: new Date().toISOString(),
            category,
        }

        setTasks(prev => [newTask, ...prev])
    }

    const toggleTask = (id: string) => {
        setTasks(prev =>
            prev.map(t =>
                t.id === id
                    ? {
                        ...t,
                        completed: !t.completed,
                        completedAt: !t.completed ? new Date().toISOString() : undefined,
                    }
                    : t
            )
        )
    }

    const deleteTask = (id: string) => {
        setTasks(prev => prev.filter(t => t.id !== id))
    }

    const activeCount = tasks.filter(t => !t.completed).length

    return (
        <TaskContext.Provider
            value={{ tasks, addTask, toggleTask, deleteTask }}
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