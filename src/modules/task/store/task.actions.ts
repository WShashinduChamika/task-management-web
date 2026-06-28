import type {
  CreateTaskDto,
  TaskFilter,
  TaskPriority,
  TaskStatus,
} from "../types";
import { createTaskApi } from "../api/task.api";
import { getApiErrorMessage } from "../../../utils/get-api-error-message";
import {
  taskFilterStore,
  taskCreateFormLoadingStore,
  taskCreateFormPanelOpenStore,
  taskCreateErrorStore,
  tasksDataStore,
  taskSearchStore,
} from "./task.store";

export const setTaskFilterAction = (filter: TaskFilter): void => {
  taskFilterStore.value = filter;
};

export const setTaskSearchAction = (query: string): void => {
  taskSearchStore.value = query;
};

export const openTaskCreateFormPanelAction = (): void => {
  taskCreateFormPanelOpenStore.value = true;
};

export const closeTaskCreateFormPanelAction = (): void => {
  taskCreateFormPanelOpenStore.value = false;
};

export const createTaskAction = async (
  dto: CreateTaskDto,
): Promise<boolean> => {
  taskCreateFormLoadingStore.value = true;
  taskCreateErrorStore.value = null;

  try {
    const { data: response } = await createTaskApi(dto);
    const task = response.data;

    const currentTasks = tasksDataStore.value || [];
    tasksDataStore.value = [...currentTasks, task];

    closeTaskCreateFormPanelAction();

    return true;
  } catch (error: any) {
    taskCreateErrorStore.value = getApiErrorMessage(
      error,
      "Unable to create task",
    );
    return false;
  } finally {
    taskCreateFormLoadingStore.value = false;
  }
};

export const seedDummyTasksAction = (): void => {
  tasksDataStore.value = [
    {
      id: "1",
      title: "Design new dashboard layout",
      description: "Create wireframes and mockups for the new admin dashboard.",
      priority: "High" as TaskPriority,
      status: "In Progress" as TaskStatus,
      dueDate: "2026-07-05",
      createdBy: {
        id: "u1",
        firstName: "Alice",
        lastName: "Smith",
        email: "alice@example.com",
      },
      createdAt: "2026-06-20T08:00:00Z",
      updatedAt: "2026-06-25T10:00:00Z",
    },
    {
      id: "2",
      title: "Implement authentication module",
      description: "Build login, register and JWT token refresh flows.",
      priority: "High" as TaskPriority,
      status: "Done" as TaskStatus,
      dueDate: "2026-06-28",
      createdBy: {
        id: "u1",
        firstName: "Alice",
        lastName: "Smith",
        email: "alice@example.com",
      },
      createdAt: "2026-06-15T09:00:00Z",
      updatedAt: "2026-06-27T16:00:00Z",
    },
    {
      id: "3",
      title: "Write unit tests for API layer",
      description: "Cover all service functions with Jest unit tests.",
      priority: "Medium" as TaskPriority,
      status: "Open" as TaskStatus,
      dueDate: "2026-07-10",
      createdBy: {
        id: "u2",
        firstName: "Bob",
        lastName: "Jones",
        email: "bob@example.com",
      },
      createdAt: "2026-06-22T11:00:00Z",
      updatedAt: "2026-06-22T11:00:00Z",
    },
    {
      id: "4",
      title: "Set up CI/CD pipeline",
      description:
        "Configure GitHub Actions for automated testing and deployment.",
      priority: "Medium" as TaskPriority,
      status: "Testing" as TaskStatus,
      dueDate: "2026-07-08",
      createdBy: {
        id: "u3",
        firstName: "Carol",
        lastName: "White",
        email: "carol@example.com",
      },
      createdAt: "2026-06-18T14:00:00Z",
      updatedAt: "2026-06-26T09:00:00Z",
    },
    {
      id: "5",
      title: "Migrate database schema",
      description:
        "Apply pending Mongoose schema migrations to staging environment.",
      priority: "Low" as TaskPriority,
      status: "Open" as TaskStatus,
      dueDate: "2026-07-15",
      createdBy: {
        id: "u2",
        firstName: "Bob",
        lastName: "Jones",
        email: "bob@example.com",
      },
      createdAt: "2026-06-23T07:00:00Z",
      updatedAt: "2026-06-23T07:00:00Z",
    },
    {
      id: "6",
      title: "Performance audit",
      description:
        "Run Lighthouse audits and address critical performance issues.",
      priority: "Low" as TaskPriority,
      status: "Open" as TaskStatus,
      dueDate: "2026-07-20",
      createdBy: {
        id: "u1",
        firstName: "Alice",
        lastName: "Smith",
        email: "alice@example.com",
      },
      createdAt: "2026-06-26T13:00:00Z",
      updatedAt: "2026-06-26T13:00:00Z",
    },
  ];
};
