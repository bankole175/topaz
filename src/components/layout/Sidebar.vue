<template>
  <div class="fixed w-[276px] bg-black top-0 bottom-0">
    <div class="flex justify-center border-b-[0.4px]">
      <div class="my-16">
        <img src="/src/assets/logo.svg" alt="logo" class="w-[80px] mb-5 ml-8" />
        <p class="font-playfair text-[0.9375rem] text-white text-center">
          Kinfolk Venture Capital
        </p>
      </div>
    </div>
    <div class="bg-white p-3">
      <router-link :to="{ name: 'allDealflow' }" class="flex items-center">
        <img src="/src/assets/icons/docs.svg" class="mr-3" alt="" />
        <p class="">Dealflow</p>
      </router-link>
    </div>
    <div class="absolute bottom-3 left-10">
      <div @click="logout" class="flex items-center cursor-pointer">
        <img src="/src/assets/icons/logout.svg" alt="" class="mr-3" />
        <p class="text-[#F45252]">Logout</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
const logout = () => {
  localStorage.removeItem('oauth')
  router.push('/login')
}
</script>

<style scoped></style>
