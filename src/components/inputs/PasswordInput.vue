<template>
  <div class="mb-5">
    <label for="email" class="font-rubik text-kfGray text-[0.875rem]">{{
      label
    }}</label>
    <div class="relative">
      <input
        :type="input.type"
        class="form-control"
        v-bind="$attrs"
        @input="$emit('input', $event.target.value)"
      />
      <div class="absolute right-4 top-3" @click="updateInputType">
        <img
          v-if="input.type === 'password'"
          src="src/assets/icons/eye.svg"
          class="w-6 cursor-pointer"
          alt=""
        />
        <img
          v-if="input.type === 'text'"
          src="src/assets/icons/eye-slash.svg"
          class="w-6 cursor-pointer"
          alt=""
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'

export default defineComponent({
  name: 'PasswordInput',
  props: {
    label: {
      required: true,
      type: String,
    },
  },

  setup() {
    const input = reactive({
      type: 'password',
    })

    const updateInputType = () => {
      input.type = input.type === 'password' ? 'text' : 'password'
    }

    return { input, updateInputType }
  },
})
</script>
