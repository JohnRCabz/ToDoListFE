<script setup lang="ts">
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import UserSidebar from '../User/UserSidebar.vue'
import TaskTable from './TaskTable.vue'
import { useAuthStore } from '@/stores/auth'
import AdminSidebar from '../Admin/AdminSidebar.vue'

const auth = useAuthStore()
</script>

<template>
  <SidebarProvider>
    <AdminSidebar v-if="auth.user?.user_type == 1" />
    <UserSidebar v-else />
    <SidebarInset> <TaskTable /></SidebarInset>
  </SidebarProvider>
</template>

<style scoped></style>
