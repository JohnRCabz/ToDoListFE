<script setup lang="ts">
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from '@/components/ui/table'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import AdminSidebar from './AdminSidebar.vue'
import BreadcrumbView from '@/components/custom/BreadcrumbView.vue'
import { reactive, ref, watchEffect } from 'vue'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { useGetUsers } from '@/server/User/User'
import type { User } from '@/types/user'

const currentPage = ref(1)
const { data: result } = useGetUsers(currentPage)

const tableData = reactive<{ table: User[]; hasMore: boolean }>({
  table: [],
  hasMore: false,
})

watchEffect(() => {
  if (result.value?.data) {
    tableData.table = result.value.data
    tableData.hasMore = result.value.next_page_url ? true : false
  }
})
</script>
<template>
  <SidebarProvider>
    <AdminSidebar />
    <SidebarInset>
      <BreadcrumbView />
      <section class="p-4">
        <div class="flex items-center justify-between mb-4">
          <h1 class="text-xl font-semibold">User Table</h1>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>First Name</TableHead>
              <TableHead>Last Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-for="(user, index) in tableData.table" :key="user.id">
              <TableCell class="font-medium">{{ (currentPage - 1) * 10 + index + 1 }}</TableCell>
              <TableCell>{{ user.first_name }}</TableCell>
              <TableCell>{{ user.last_name }}</TableCell>
              <TableCell>{{ user.email }}</TableCell>
              <TableCell>
                <TableCell>
                  <span
                    :class="[
                      'px-2 py-1 rounded-full text-xs font-medium',
                      user.user_type === 1
                        ? 'bg-red-100 text-red-500'
                        : 'bg-blue-100 text-blue-500',
                    ]"
                  >
                    {{ user.user_type === 1 ? 'Admin' : 'User' }}
                  </span>
                </TableCell></TableCell
              >
            </TableRow>
          </TableBody>
        </Table>
        <div
          v-if="Number(tableData.table) < 1"
          class="flex p-10 items-center text-center justify-center"
        >
          <Label> No User Found.</Label>
        </div>
        <div class="flex justify-end gap-2 mt-4">
          <Button variant="outline" size="sm" @click="currentPage--" :disabled="currentPage === 1">
            Previous
          </Button>
          <Button variant="outline" size="sm" @click="currentPage++" :disabled="!tableData.hasMore">
            Next
          </Button>
        </div>
      </section>
    </SidebarInset>
  </SidebarProvider>
</template>

<style scoped></style>
