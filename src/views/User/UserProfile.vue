<script setup lang="ts">
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import UserSidebar from './UserSidebar.vue'
import UserAccountDetail from '@/components/custom/UserAccountDetail.vue'
</script>

<template>
  <SidebarProvider>
    <UserSidebar />
    <SidebarInset> <UserAccountDetail /></SidebarInset>
  </SidebarProvider>
</template>

<style scoped></style>
