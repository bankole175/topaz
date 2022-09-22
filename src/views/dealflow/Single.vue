<template>
  <div>
    <div class="flex justify-between items-center">
      <p class="font-playfair text-[2rem]">Dealflow</p>
      <div class="flex">
        <button class="btn-outline-dark mr-5">
          <img src="/src/assets/icons/tag.svg" alt="filter icon" class="mr-3" />
          Create tag
        </button>
        <button class="btn-outline-dark">
          <img src="/src/assets/icons/add.svg" alt="filter icon" class="mr-3" />
          Add to list
        </button>
      </div>
    </div>
    <div v-if="company">
      <div class="flex items-center gap-3">
        <router-link
          :to="{ name: 'allDealflow' }"
          class="text-kfGray text-[13px]"
          >Dealflow</router-link
        >
        <img src="/src/assets/icons/arrow-right.svg" alt="icon" />
        <p class="text-[13px] font-medium">{{ company?.company_name }}</p>
      </div>
      <div class="flex justify-between mt-5">
        <div class="flex gap-3">
          <p>General Info</p>
          <p class="text-kfGray">Risk Scorecard</p>
        </div>
        <div class="flex items-center gap-5">
          <div>
            <p class="text-[11px]">
              Created by {{ company.deal_lead.first_name }}
            </p>
            <p class="text-[11px]">{{ formattedDate(company.created_at) }}</p>
          </div>
          <img
            :src="getFile(company.logo)"
            alt=""
            class="w-[36px] h-[36px] rounded-full"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useRoute } from 'vue-router'
import Company from '@/api/Company'
import { onMounted, ref } from 'vue'
import type { CompanyT } from '@/types/type'
import { formattedDate, getFile } from '@/utils/utils'

export default {
  name: 'SingleDealflow',
  setup() {
    const route = useRoute()
    const id = route.params.id
    const company = ref<CompanyT>()

    const getCompanyData = async () => {
      try {
        const { data, errors } = await Company.getCompany(id)
        if (errors) {
          console.log(errors, 'errors')
          return
        }
        company.value = data
      } catch (e) {
        console.log(e)
      }
    }

    onMounted(() => {
      getCompanyData()
    })

    return { company, formattedDate, getFile }
  },
}
</script>

<style scoped></style>
