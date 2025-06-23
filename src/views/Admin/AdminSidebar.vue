<script setup lang="ts">
import type { SidebarProps } from '@/components/ui/sidebar'

import NavMain from '@/components/NavMain.vue'
import NavUser from '@/components/NavUser.vue'
import { Sidebar, SidebarContent, SidebarHeader, SidebarRail } from '@/components/ui/sidebar'

import { ClipboardList, LayoutDashboard, User } from 'lucide-vue-next'

const props = withDefaults(defineProps<SidebarProps>(), {
  collapsible: 'icon',
})

import { useRoute } from 'vue-router'

const route = useRoute()
const path = route.path

const data = {
  user: {
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
  navMain: [
    {
      title: 'Dashboard',
      url: '/admin/dashboard',
      icon: LayoutDashboard,
      isActive: path.includes('dashboard') ? true : false,
    },
    {
      title: 'Users',
      url: '/admin/users',
      icon: User,
      isActive: path.includes('users') ? true : false,
    },
    {
      title: 'Tasks',
      url: '/admin/tasks',
      icon: ClipboardList,
      isActive: path.includes('tasks') ? true : false,
    },
  ],
}
</script>

<template>
  <Sidebar v-bind="props">
    <SidebarHeader>
      <NavUser :user="data.user" />
    </SidebarHeader>
    <SidebarContent>
      <NavMain :items="data.navMain" />
    </SidebarContent>
    <SidebarRail />
  </Sidebar>
</template>
