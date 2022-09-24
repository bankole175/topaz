<template>
  <div class="card lg:w-[458px] p-[2.8125rem]">
    <p class="font-playfair text-center text-[2rem] pt-11">Sign In</p>
    <p class="text-kfGray text-center pb-11 mt-3 text-[0.9375rem]">
      Welcome to Kinfolk Venture Capital
    </p>
    <AlertComponent v-if="errorMessage" :message="errorMessage" />
    <form @submit.prevent="submit">
      <TextInput
        label="Email"
        name="email"
        type="email"
        v-model:email="form.email"
        @error="getError($event)"
      />
      <PasswordInput
        label="Password"
        name="password"
        v-model:password="form.password"
      />

      <p class="float-right mt-[-9px] text-[0.875rem]">Forgot Password?</p>

      <button
        :disabled="error"
        class="w-full bg-black text-white p-[1rem] border-r-2 font-medium my-10 leading-[1.185rem] disabled:opacity-50"
      >
        <span
          v-if="isLoading"
          class="spinner-border animate-spin inline-block w-5 h-5 border-4 mr-2 rounded-full"
          role="status"
        >
          <span class="sr-only">Loading...</span>
        </span>
        Sign In
      </button>

      <p class="text-center text-[0.9375rem] leading-[1.125rem]">
        <span class="text-kfGray"> Don’t have an account? </span>
        <span class="font-bold">Sign Up</span>
      </p>
    </form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import TextInput from '@/components/inputs/TextInput.vue'
import PasswordInput from '@/components/inputs/PasswordInput.vue'
import User from '@/api/User'
import type { LoginT } from '@/types/type'
import AlertComponent from '@/components/Alert.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const error = ref<boolean>(true)
const form = reactive<LoginT>({
  email: '',
  password: '',
})

let isLoading = ref<boolean>(false)
let errorMessage = ref<string>()

const getError = (errorStatus: boolean) => {
  error.value = errorStatus
}
const submit = async () => {
  isLoading.value = true
  try {
    const { errors } = await User.login(form)
    if (errors) {
      errorMessage.value = errors.data.message
      isLoading.value = false
      return
    }
    await router.push({ name: 'allDealflow' })
    isLoading.value = false
    errorMessage.value = undefined
  } catch (e) {
    console.log(e)
    isLoading.value = false
  }
}
</script>
