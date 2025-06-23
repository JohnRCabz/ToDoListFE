<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { useRoute } from 'vue-router'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb'
import { SidebarTrigger } from '@/components/ui/sidebar'
import Separator from '@/components/ui/separator/Separator.vue'
const route = useRoute()
const path = route.path
const auth = useAuthStore()

const getPage = () => {
  if (path.endsWith('profile')) {
    return 'Profile'
  } else if (path.endsWith('tasks')) {
    return 'Tasks'
  } else if (path.endsWith('dashboard')) {
    return 'Dashboard'
  } else {
    return 'Users'
  }
}
</script>

<template>
  <header
    class="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12"
  >
    <div class="flex items-center gap-2 px-4">
      <SidebarTrigger class="-ml-1" />
      <Separator orientation="vertical" class="mr-2 h-4" />
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem class="hidden md:block">
            <BreadcrumbLink href="#">{{
              auth.user?.user_type == 1 ? 'Admin' : 'User'
            }}</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator class="hidden md:block" />
          <BreadcrumbItem>
            <BreadcrumbPage>{{ getPage() }}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  </header>
</template>

<style scoped></style>
