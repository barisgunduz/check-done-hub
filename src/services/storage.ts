import AsyncStorage from "@react-native-async-storage/async-storage";
import { Task } from "../types/task";

const TASK_KEY = "TASKS";
const PREMIUM_KEY = "PREMIUM_STATUS";

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
