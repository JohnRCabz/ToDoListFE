<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useGetUserTaskStats } from '@/server/User/User'
import { reactive, watch } from 'vue'
import BreadcrumbView from '@/components/custom/BreadcrumbView.vue'

const { data: result } = useGetUserTaskStats()

const formData = reactive({
  low_prio_task_count: 0,
  mid_prio_task_count: 0,
  high_prio_task_count: 0,
  pending_tasks: 0,
  completed_tasks: 0,
})

watch(result, (newResult) => {
  if (newResult) {
    formData.low_prio_task_count = newResult.data.low_prio_task_count
    formData.mid_prio_task_count = newResult.data.mid_prio_task_count
    formData.high_prio_task_count = newResult.data.high_prio_task_count
    formData.pending_tasks = newResult.data.pending_tasks
    formData.completed_tasks = newResult.data.completed_tasks
  }
})
</script>
<template>
  <BreadcrumbView />
  <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 m-10">
    <Card x-chunk="dashboard-01-chunk-0">
      <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle class="text-sm font-medium">Low Priority Tasks</CardTitle>
        <DollarSign class="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div class="text-2xl font-bold">{{ formData.low_prio_task_count }}</div>
        <!-- <p class="text-xs text-muted-foreground">+20.1% from last month</p> -->
      </CardContent>
    </Card>

    <Card x-chunk="dashboard-01-chunk-1">
      <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle class="text-sm font-medium">Medium Priority Tasks</CardTitle>
        <DollarSign class="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div class="text-2xl font-bold">{{ formData.mid_prio_task_count }}</div>
      </CardContent>
    </Card>

    <Card x-chunk="dashboard-01-chunk-2">
      <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle class="text-sm font-medium">High Priority Tasks</CardTitle>
        <DollarSign class="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div class="text-2xl font-bold">{{ formData.high_prio_task_count }}</div>
      </CardContent>
    </Card>

    <Card x-chunk="dashboard-01-chunk-2">
      <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle class="text-sm font-medium">Pending Tasks</CardTitle>
        <DollarSign class="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div class="text-2xl font-bold">{{ formData.pending_tasks }}</div>
      </CardContent>
    </Card>
    <Card x-chunk="dashboard-01-chunk-2">
      <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle class="text-sm font-medium">Completed Tasks</CardTitle>
        <DollarSign class="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div class="text-2xl font-bold">{{ formData.completed_tasks }}</div>
      </CardContent>
    </Card>
  </div>
</template>

<style lang="scss" scoped></style>
