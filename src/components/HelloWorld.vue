<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div>
      <input
        v-model="newTask"
        @keyup.enter="addTask"
        placeholder="Add a new task"
      />
      <button @click="addTask">Add Task</button>
    </div>
    <ul>
      <li v-for="(task, index) in tasks" :key="index">
        {{ task }}
        <button @click="removeTask(index)">Remove</button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data() {
    return {
      newTask: "",
      tasks: [] as string[],
    };
  },
  methods: {
    addTask() {
      if (this.newTask.trim() !== "") {
        this.tasks.push(this.newTask.trim());
        this.newTask = "";
      }
    },
    removeTask(index: number) {
      this.tasks.splice(index, 1);
    },
  },
});
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
}
button {
  margin-left: 10px;
}
input {
  margin-right: 10px;
}
a {
  color: #42b983;
}
</style>
