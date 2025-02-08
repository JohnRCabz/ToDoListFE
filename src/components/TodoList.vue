<template>
  <div
    class="hello p-6 max-w-lg mx-auto bg-white rounded-xl shadow-md space-y-4"
  >
    <h1 class="text-2xl font-bold text-center">Welcome to a todolist app</h1>
    <form @submit.prevent="addTask" class="flex space-x-2">
      <input
        v-model="newTask"
        placeholder="Add a new task"
        class="flex-grow p-2 border rounded"
      />
      <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">
        Add Task
      </button>
    </form>
    <ul class="space-y-2">
      <li
        v-for="(task, index) in tasks"
        :key="index"
        class="flex justify-between items-center p-2 bg-gray-100 rounded"
      >
        <span :class="{ 'line-through': task.status === 'completed' }">{{
          task.name
        }}</span>
        <div class="space-x-2">
          <button
            v-if="task.status === 'pending'"
            @click="setInProgress(index)"
            class="bg-yellow-500 text-white px-2 py-1 rounded"
          >
            In Progress
          </button>
          <button
            v-if="task.status === 'inprogress'"
            @click="completeTask(index)"
            class="bg-green-500 text-white px-2 py-1 rounded"
          >
            Complete
          </button>
          <button
            @click="confirmRemoveTask(index)"
            class="bg-red-500 text-white px-2 py-1 rounded"
          >
            Remove
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axiosInstance from "../axiosInstance";

interface Task {
  id?: number;
  name: string;
  status: "pending" | "inprogress" | "completed";
}

export default defineComponent({
  name: "HelloWorld",
  data() {
    return {
      newTask: "",
      tasks: [] as Task[],
    };
  },
  methods: {
    async addTask() {
      if (this.newTask.trim() !== "") {
        const task = { name: this.newTask.trim(), status: "pending" };
        try {
          const response = await axiosInstance.post("/tasks", task);
          this.tasks.push(response.data);
          this.newTask = "";
        } catch (error) {
          console.error("Error adding task:", error);
        }
      }
    },
    async setInProgress(index: number) {
      const task = this.tasks[index];
      task.status = "inprogress";
      try {
        await axiosInstance.put(`/tasks/${task.id}`, task);
      } catch (error) {
        console.error("Error updating task:", error);
      }
    },
    async completeTask(index: number) {
      const task = this.tasks[index];
      task.status = "completed";
      try {
        await axiosInstance.put(`/tasks/${task.id}`, task);
      } catch (error) {
        console.error("Error updating task:", error);
      }
    },
    async confirmRemoveTask(index: number) {
      if (window.confirm("Are you sure you want to remove this task?")) {
        this.removeTask(index);
      }
    },
    async removeTask(index: number) {
      const task = this.tasks[index];
      try {
        await axiosInstance.delete(`/tasks/${task.id}`);
        this.tasks.splice(index, 1);
      } catch (error) {
        console.error("Error removing task:", error);
      }
    },
  },
});
</script>

<style scoped>
/* You can add additional scoped styles here if needed */
.line-through {
  text-decoration: line-through;
}
</style>
