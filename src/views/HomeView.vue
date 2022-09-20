<template>
  <div class="bg-black h-screen relative overflow-hidden">
    <div
      class="circle-sprite max-w-[836px] w-full max-h-[736px] h-full bg-[transparent] absolute border-solid border-[#e6e9e9] border-[1px] border-opacity-25 rounded-full top-[-530px] right-[-110px] lg:right-[310px] md:top-[-390px]"
    ></div>
    <div
      class="square-sprite lg:max-w-[470px] max-w-[350px] w-full lg:max-h-[470px] max-h-[350px] h-full bg-[transparent] absolute border-solid border-[#e6e9e9] border-[1px] border-opacity-25 transform rotate-[55deg] left-[300px] lg:bottom-[-350px] bottom-[-120px]"
    ></div>
    <div
      class="h-full justify-center items-center flex max-w-[1400px] sm:p-[40px] 2xl:p-[0] mx-auto"
    >
      <div
        class="lg:w-full lg:flex lg:flex-row lg:justify-between lg:items-center"
      >
        <div class="lg:w-[50]">
          <img src="src/assets/logo.svg" alt="kinfolk logo" class="mb-8" />
          <h6 class="text-white text-[1.75rem]">Kinfolk Venture Capital</h6>
          <p class="text-kfGray font-rubik">
            Your investment insights managed in one place.
          </p>
        </div>
        <div class="lg:w-[50]">
          <LoginComponent />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import LoginComponent from '@/components/Login.vue'
export default {
  components: { LoginComponent },
}
</script>
