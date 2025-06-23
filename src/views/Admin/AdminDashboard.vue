<script setup lang="ts">
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import AdminSidebar from './AdminSidebar.vue'
import AdminDashboardDetail from './AdminDashboardDetail.vue'
</script>
<template>
  <SidebarProvider>
    <AdminSidebar />
    <SidebarInset> <AdminDashboardDetail /></SidebarInset>
  </SidebarProvider>
</template>

<style scoped></style>
