<template>
  <div
    class="p-6 max-w-5xl mx-auto bg-gray-100 rounded-xl shadow-md space-y-4 mt-20"
  >
    <h1 class="text-2xl font-bold text-center">To-Do-List</h1>
    <div class="flex space-x-4">
      <!-- Left Column: Add Task Form -->
      <div class="w-2/5">
        <div class="bg-white p-4 rounded-lg shadow-md">
          <h2 class="text-xl font-semibold mb-4">Add New Task</h2>
          <form @submit.prevent="addTask" class="flex flex-col space-y-2">
            <label for="task-title" class="font-bold text-sm text-left"
              >Task Title</label
            >
            <input
              id="task-title"
              v-model="newTaskTitle"
              placeholder="Add a new task title"
              class="p-2 border rounded"
              :class="{ 'border-red-500': titleError }"
            />
            <span v-if="titleError" class="text-red-500 text-sm">{{
              titleError
            }}</span>

            <label for="task-description" class="font-bold text-sm text-left"
              >Task Description</label
            >
            <input
              id="task-description"
              v-model="newTaskDescription"
              placeholder="Add a new task description"
              class="p-2 border rounded"
              :class="{ 'border-red-500': descriptionError }"
            />
            <span v-if="descriptionError" class="text-red-500 text-sm">{{
              descriptionError
            }}</span>

            <label for="task-status" class="font-bold text-sm text-left"
              >Task Status</label
            >
            <select
              id="task-status"
              v-model="newTaskStatus"
              class="p-2 border rounded"
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
            </select>

            <label for="task-date" class="font-bold text-sm text-left"
              >Target Date</label
            >
            <input
              id="task-date"
              v-model="newTaskTargetDate"
              type="date"
              class="p-2 border rounded"
              :class="{ 'border-red-500': dateError }"
            />
            <span v-if="dateError" class="text-red-500 text-sm">{{
              dateError
            }}</span>

            <button
              type="submit"
              class="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Add Task
            </button>
          </form>
        </div>
        <div class="flex justify-end mt-4 items-center space-x-2">
          <button
            @click="toggleSort"
            class="bg-gray-500 text-white px-4 py-2 rounded"
          >
            {{ autoSort ? "Disable" : "Enable" }} Smart Sort
          </button>
          <div class="relative group">
            <i class="fas fa-info-circle text-gray-500 cursor-pointer"></i>
            <div
              class="absolute bottom-full mb-2 w-48 p-2 bg-gray-700 text-white text-sm rounded hidden group-hover:block"
            >
              Toggle Smart Sort to automatically sort tasks by their due dates.
            </div>
          </div>
        </div>
      </div>
      <!-- Right Column: Task List -->
      <div class="w-3/5">
        <div class="bg-white p-4 rounded-lg shadow-md">
          <h2 class="text-xl font-semibold mb-4">Task List</h2>
          <ul class="space-y-2">
            <li
              v-if="displayedTasks.length === 0"
              class="text-center text-green-500 font-bold"
            >
              Congratulations! You're all cleared.
            </li>
            <li
              v-for="task in displayedTasks"
              :key="task.id"
              :class="{
                'bg-red-100': isOverdue(task) && task.status !== 'Finished',
                'bg-green-100': task.status === 'Finished',
                'bg-gray-100': !isOverdue(task) && task.status !== 'Finished',
              }"
              class="p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border-t-4 border-gray-300"
            >
              <div class="flex justify-between items-center">
                <span
                  :class="{ 'line-through': task.status === 'Finished' }"
                  class="font-semibold text-lg"
                >
                  {{ task.title }}
                  <i
                    v-if="task.status === 'Finished' && !isOverdue(task)"
                    class="fas fa-star text-yellow-500 ml-2"
                  ></i>
                </span>
                <div class="flex space-x-2">
                  <button
                    v-if="task.status === 'Pending'"
                    @click="setInProgress(task)"
                    class="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 transition-colors duration-300"
                  >
                    In Progress
                  </button>
                  <button
                    v-if="task.status === 'In Progress'"
                    @click="completeTask(task)"
                    class="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 transition-colors duration-300"
                  >
                    Complete
                  </button>
                  <button
                    @click="confirmRemoveTask(task)"
                    class="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition-colors duration-300"
                  >
                    <i class="fas fa-trash-alt"></i>
                  </button>
                </div>
              </div>
              <hr class="w-full my-2 border-t border-gray-300" />
              <div class="text-left w-full">
                <p class="text-sm text-gray-600">
                  <strong>Description:</strong> {{ task.description }}
                </p>
                <p class="text-sm font-medium">Status: {{ task.status }}</p>
                <p v-if="task.targetdate" class="text-sm font-medium">
                  <strong>Due:</strong> {{ task.targetdate }}
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axiosInstance from "../axiosInstance";

interface Task {
  id?: number;
  title: string;
  description: string;
  status: string;
  targetdate?: string;
}

export default defineComponent({
  name: "HelloWorld",
  data() {
    return {
      newTaskTitle: "",
      newTaskDescription: "",
      newTaskStatus: "Pending",
      newTaskTargetDate: "",
      tasks: [] as Task[],
      autoSort: true,
      titleError: "",
      descriptionError: "",
      dateError: "",
    };
  },
  async created() {
    try {
      const response = await axiosInstance.get("/tasks");
      if (response.status === 200) {
        this.tasks = response.data;
      } else {
        console.error("Error fetching tasks:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  },
  computed: {
    sortedTasks(): Task[] {
      return this.tasks.slice().sort((a, b) => {
        if (!a.targetdate) return 1;
        if (!b.targetdate) return -1;
        return (
          new Date(a.targetdate).getTime() - new Date(b.targetdate).getTime()
        );
      });
    },
    displayedTasks(): Task[] {
      return this.autoSort ? this.sortedTasks : this.tasks;
    },
  },
  methods: {
    toggleSort() {
      this.autoSort = !this.autoSort;
    },
    isOverdue(task: Task): boolean {
      if (task.status === "Finished" || !task.targetdate) return false;
      const today = new Date().setHours(0, 0, 0, 0);
      const targetDate = new Date(task.targetdate).getTime();
      return targetDate < today;
    },
    async addTask() {
      this.titleError = "";
      this.descriptionError = "";
      this.dateError = "";

      if (this.newTaskTitle.trim() === "") {
        this.titleError = "Title is required.";
      }
      if (this.newTaskDescription.trim() === "") {
        this.descriptionError = "Description is required.";
      }
      if (this.newTaskTargetDate.trim() === "") {
        this.dateError = "Date is required.";
      } else if (
        new Date(this.newTaskTargetDate).getTime() <
        new Date().setHours(0, 0, 0, 0)
      ) {
        this.dateError = "Date cannot be in the past.";
      }

      if (!this.titleError && !this.descriptionError && !this.dateError) {
        const task = {
          title: this.newTaskTitle.trim(),
          description: this.newTaskDescription.trim(),
          status: this.newTaskStatus,
          targetdate: this.newTaskTargetDate,
        };
        try {
          const response = await axiosInstance.post("/tasks", task);
          if (response.status === 201) {
            this.tasks.push(response.data);
            this.newTaskTitle = "";
            this.newTaskDescription = "";
            this.newTaskStatus = "Pending";
            this.newTaskTargetDate = "";
          } else {
            console.error("Error adding task:", response.statusText);
          }
        } catch (error) {
          console.error("Error adding task:", error);
        }
      }
    },
    async setInProgress(task: Task) {
      task.status = "In Progress";
      try {
        const response = await axiosInstance.put(`/tasks/${task.id}`, task);
        if (response.status !== 200) {
          console.error("Error updating task:", response.statusText);
        }
      } catch (error) {
        console.error("Error updating task:", error);
      }
    },
    async completeTask(task: Task) {
      task.status = "Finished";
      try {
        const response = await axiosInstance.put(`/tasks/${task.id}`, task);
        if (response.status !== 200) {
          console.error("Error updating task:", response.statusText);
        }
      } catch (error) {
        console.error("Error updating task:", error);
      }
    },
    async confirmRemoveTask(task: Task) {
      if (window.confirm("Are you sure you want to remove this task?")) {
        this.removeTask(task);
      }
    },
    async removeTask(task: Task) {
      try {
        const response = await axiosInstance.delete(`/tasks/${task.id}`);
        if (response.status === 200) {
          this.tasks = this.tasks.filter((t) => t.id !== task.id);
        } else {
          console.error("Error removing task:", response.statusText);
        }
      } catch (error) {
        console.error("Error removing task:", error);
      }
    },
  },
});
</script>

<style scoped>
.line-through {
  text-decoration: line-through;
}
.bg-red-100 {
  background-color: #fee2e2;
}
.border-red-500 {
  border-color: #f56565;
}
</style>
