<template>
  <div class="sm:flex justify-between py-8 sm:py-14">
    <div>
      <div class="relative">
        <input
          type="text"
          placeholder="Search"
          class="h-[41px] bg-kfLightGray rounded-[4px] pl-16 p-4 mb-5"
        />
        <img
          src="/src/assets/icons/search.svg"
          class="absolute top-3 left-8"
          alt="search icon"
        />
      </div>
    </div>
    <div class="flex items-center">
      <div
        class="flex justify-center items-center rounded-full bg-kfLightGray w-[41px] h-[41px] mr-6 cursor-pointer"
      >
        <img src="/src/assets/icons/notification.svg" alt="" />
      </div>
      <div
        class="flex justify-center items-center rounded-full bg-kfLightGray w-[41px] h-[41px] mr-5 cursor-pointer"
      >
        <img src="/src/assets/icons/user.svg" alt="" />
      </div>
      <p>{{ user?.first_name }} {{ user?.last_name }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { LoginResponseT, UserT } from '@/types/type'

let user = ref<UserT>()

const getUserData = () => {
  const loginResponse: LoginResponseT = JSON.parse(
    localStorage.getItem('oauth')!,
  )
  user.value = loginResponse.data
}

onMounted(() => {
  getUserData()
})
</script>
