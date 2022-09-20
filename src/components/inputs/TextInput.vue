<template>
  <div class="mb-5">
    <label for="email" class="font-rubik text-kfGray mb-5 text-[0.875rem]">{{
      label
    }}</label>
    <input
      :type="type"
      class="form-control"
      v-bind="$attrs"
      @input="handleChange"
    />

    <p v-if="input.error[$attrs.name]" class="font-rubik text-danger-500 mt-1">
      {{ input.error[$attrs.name] }}
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, useAttrs } from 'vue'

export default defineComponent({
  name: 'TextInput',
  props: {
    error: Object,
    label: {
      required: true,
      type: String,
    },
    type: { type: String, default: 'text' },
  },

  setup(props, context) {
    const attrs = useAttrs()
    const input = reactive<{ error: any }>({
      error: {},
    })

    // note: this validation can be extended to support maxlength, minlength e.t.c but because this task did not need it that is why it was nt implemented
    const handleChange = (event: Event) => {
      const value = (event.target as HTMLInputElement).value
      context.emit('input', value)

      if (
        !new RegExp(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        ).test(value) &&
        props.type === 'email'
      ) {
        input.error[attrs.name as keyof typeof input.error] =
          'Enter a valid email address'
      } else {
        input.error[attrs.name as keyof typeof input.error] = null
      }
    }

    return { handleChange, input }
  },
})
</script>
