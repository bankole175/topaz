<template>
  <div class="card lg:w-[458px] p-[2.8125rem]">
    <p class="font-playfair text-center text-[2rem] pt-11">Sign In</p>
    <p class="text-kfGray text-center pb-11 mt-3 text-[0.9375rem]">
      Welcome to Kinfolk Venture Capital
    </p>
    <AlertComponent />
    <form @submit.prevent="submit">
      <TextInput
        label="Email"
        name="email"
        type="email"
        v-model:email="form.email"
      />
      <PasswordInput
        label="Password"
        name="password"
        v-model:password="form.password"
      />

      <p class="float-right mt-[-9px] text-[0.875rem]">Forgot Password?</p>

      <button
        class="w-full bg-black text-white p-[1rem] border-r-2 font-medium my-10 leading-[1.185rem]"
      >
        Sign In
      </button>

      <p class="text-center text-[0.9375rem] leading-[1.125rem]">
        <span class="text-kfGray"> Don’t have an account? </span>
        <span class="font-bold">Sign Up</span>
      </p>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import TextInput from '@/components/inputs/TextInput.vue'
import PasswordInput from '@/components/inputs/PasswordInput.vue'
import User from '@/api/User'
import type { LoginT } from '@/types/type'
import AlertComponent from '@/components/Alert.vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'LoginComponent',
  components: { AlertComponent, PasswordInput, TextInput },

  setup() {
    const router = useRouter()
    const form = reactive<LoginT>({
      email: '',
      password: '',
    })

    let isLoading: boolean = false

    const submit = async () => {
      isLoading = true
      try {
        const { errors } = await User.login(form)
        if (errors) {
          console.log(errors, 'errors')
          isLoading = false
          return
        }
        isLoading = false
        router.push({ name: 'allDealflow' })
      } catch (e) {
        console.log(e)
        isLoading = false
      }
    }

    return { form, submit, isLoading }
  },
})
</script>
