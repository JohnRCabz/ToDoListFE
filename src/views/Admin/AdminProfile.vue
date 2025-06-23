<script setup lang="ts">
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import UserAccountDetail from '@/components/custom/UserAccountDetail.vue'
import AdminSidebar from './AdminSidebar.vue'
</script>

<template>
  <SidebarProvider>
    <AdminSidebar />
    <SidebarInset> <UserAccountDetail /></SidebarInset>
  </SidebarProvider>
</template>

<style scoped></style>
