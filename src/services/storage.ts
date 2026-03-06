import AsyncStorage from "@react-native-async-storage/async-storage";
import { Task } from "../types/task";
import { Habit, HabitCompletionMap } from "../types/habit";

const TASK_KEY = "TASKS";
const PREMIUM_KEY = "PREMIUM_STATUS";
const HABIT_KEY = "HABITS";
const HABIT_COMPLETION_KEY = "HABIT_COMPLETIONS";

export const loadTasks = async (): Promise<Task[]> => {
	const data = await AsyncStorage.getItem(TASK_KEY);
	return data ? JSON.parse(data) : [];
};

export const saveTasks = async (tasks: Task[]) => {
	await AsyncStorage.setItem(TASK_KEY, JSON.stringify(tasks));
};

export const loadPremium = async (): Promise<boolean> => {
	const data = await AsyncStorage.getItem(PREMIUM_KEY);
	return data === "true";
};

export const savePremium = async (value: boolean) => {
	await AsyncStorage.setItem(PREMIUM_KEY, value ? "true" : "false");
};

export const loadHabits = async (): Promise<Habit[]> => {
	const data = await AsyncStorage.getItem(HABIT_KEY);
	return data ? JSON.parse(data) : [];
};

export const saveHabits = async (habits: Habit[]) => {
	await AsyncStorage.setItem(HABIT_KEY, JSON.stringify(habits));
};

export const loadHabitCompletions = async (): Promise<HabitCompletionMap> => {
	const data = await AsyncStorage.getItem(HABIT_COMPLETION_KEY);
	return data ? JSON.parse(data) : {};
};

export const saveHabitCompletions = async (map: HabitCompletionMap) => {
	await AsyncStorage.setItem(HABIT_COMPLETION_KEY, JSON.stringify(map));
};
