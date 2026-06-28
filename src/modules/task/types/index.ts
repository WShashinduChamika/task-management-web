export type TaskPriority = "Low" | "Medium" | "High";
export type TaskStatus = "Open" | "In Progress" | "Testing" | "Done";

export interface UserRef {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  priority: TaskPriority;
  status: TaskStatus;
  dueDate?: string;
  createdBy: UserRef;
  assignedTo?: UserRef;
  createdAt: string;
  updatedAt: string;
}

export interface TaskFilter {
  title?: string;
  priority?: TaskPriority | "";
  status?: TaskStatus | "";
}
