<template>
  <div class="mb-5">
    <label for="email" class="text-kfGray text-[0.875rem]">{{
      props.label
    }}</label>
    <div class="relative">
      <input
        :type="input.type"
        class="form-control"
        v-bind="$attrs"
        @input="$emit(`update:${$attrs.name}`, $event.target.value)"
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

<script setup lang="ts">
import { defineProps, reactive } from 'vue'

interface IProps {
  label: string
}

const props = defineProps<IProps>()

const input = reactive({
  type: 'password',
})

const updateInputType = () => {
  input.type = input.type === 'password' ? 'text' : 'password'
}
</script>
