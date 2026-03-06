export type Habit = {
	id: string
	title: string
	createdAt: string
}

export type HabitCompletionMap = {
	[habitId: string]: {
		[date: string]: boolean
	}
}
