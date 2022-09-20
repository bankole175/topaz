<template>
  <div class="card lg:w-[458px] p-[2.8125rem]">
    <p class="text-center text-[2rem] pt-11">Sign In</p>
    <p class="text-kfGray font-rubik text-center pb-11 mt-3 text-[0.9375rem]">
      Welcome to Kinfolk Venture Capital
    </p>
    <form>
      <TextInput
        label="Email"
        name="loginEmail"
        type="email"
        v-model="form.email"
      />
      <PasswordInput
        label="Password"
        name="loginPassword"
        v-model="form.password"
      />

      <p class="font-rubik float-right mt-[-9px] text-[0.875rem]">
        Forgot Password?
      </p>

      <button
        class="font-rubik w-full bg-black text-white p-[1rem] border-r-2 font-medium my-10 leading-[1.185rem]"
      >
        Sign In
      </button>

      <p class="font-rubik text-center text-[0.9375rem] leading-[1.125rem]">
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

export default defineComponent({
  name: 'LoginComponent',
  components: { PasswordInput, TextInput },

  setup() {
    const form = reactive({
      email: null,
      password: null,
    })

    return { form }
  },
})
</script>
