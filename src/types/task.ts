export type Task = {
	id: string;
	title: string;
	completed: boolean;
	createdAt: string;
	completedAt?: string;
	category?: string;
	reminderDate?: string;
};
