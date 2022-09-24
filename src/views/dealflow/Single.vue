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
      <GeneralInfo class="hidden none" :company="company" />
      <div class="my-5">
        <div class="overflow-x-auto">
          <table
            class="table overflow-x-auto whitespace-nowrap border-[1px] border-[#E5E6E6]"
          >
            <thead class="border-b-[1px] h-[70px]">
              <tr>
                <th class="border-r-[1px] w-full">
                  <p class="font-medium text-[15px]">Risks</p>
                  <p class="text-[13px] text-kfGray">
                    Ratings 1 [Low] to 5 [High]
                  </p>
                </th>
                <th
                  v-for="(title, index) in tableHeader"
                  :key="index"
                  class="text-left relative align-bottom bg-[#F4F5F5] w-full"
                >
                  <p
                    v-if="index === 2"
                    class="absolute font-medium left-20 text-[13px] bottom-8 z-[1]"
                  >
                    Ratings
                  </p>
                  <p class="border-t-2 border-white px-5">
                    {{ getHeaderName(title) }}
                  </p>
                </th>
                <th
                  class="font-medium text-[13px] px-5 bg-[#F4F5F5] border-l-[1px] w-full"
                >
                  Avg Score
                </th>
              </tr>
            </thead>
            <tbody
              v-for="(data, index) in companyRiskScoreCard"
              :key="index"
              class="border-b-[1px] border-[#E5E6E6]"
            >
              <tr>
                <td
                  class="py-5 px-3 font-medium uppercase underline text-[12px]"
                >
                  {{ data.label }}
                </td>
                <td
                  class="border-x-[1px] border-[#E5E6E6]"
                  v-for="item in tableHeader"
                  :key="item"
                ></td>
              </tr>
              <template v-if="index !== 10">
                <tr
                  v-for="(risk, index) in data.riskScore"
                  :key="index"
                  class="py-4"
                >
                  <td class="px-3 text-[14px] text-kfGray">{{ risk.type }}</td>
                  <td
                    v-for="(label, index) in tableHeader"
                    :key="index"
                    class="text-end text-[14px] text-kfGray border-x-[1px] border-[#E5E6E6] pr-3"
                  >
                    {{ risk[label] }}
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import Company from '@/api/Company'
import { onMounted, ref } from 'vue'
import type { CompanyT } from '@/types/type'
import { formattedDate, getFile } from '@/utils/utils'
import GeneralInfo from '@/components/GeneralInfo.vue'

const route = useRoute()
const router = useRouter()
const id = route.params.id
const company = ref<CompanyT>()
const companyRiskScoreCard = ref()
const tableHeader = ref()
const riskScoreCardCategory = [
  'Product & Tech Risks',
  'Market Risks',
  'Management Risks',
  'Other Risks',
]

const getCompanyData = async () => {
  try {
    const { data, errors } = await Company.getCompany(id)
    if (errors) {
      if (errors.status === 401) await router.push('/login')
      return
    }
    company.value = data
  } catch (e) {
    console.log(e)
  }
}

const getHeaderName = (label: string) => {
  return label.slice(0, -6)
}

const getCompanyRiskScoreCard = async () => {
  try {
    const riskScoreCardRecord: any[] = []
    const { data, errors } = await Company.getCompanyRiskScoreCard(id)
    if (errors) {
      if (errors.status === 401) await router.push('/login')
      return
    }
    const label = Object.keys(data[0])
    tableHeader.value = label.filter((lab) => lab.includes('score'))
    // const jane = tableHeader[0].slice(0, -6)
    // console.log(jane, 'police')
    riskScoreCardCategory.forEach((category) => {
      const riskScoreCardData = data.filter(
        (risk: { category: string }) => risk.category === category,
      )
      riskScoreCardRecord.push({
        label: category,
        riskScore: riskScoreCardData,
      })
    })
    companyRiskScoreCard.value = riskScoreCardRecord
    console.log(companyRiskScoreCard.value, 'poppo')
    // company.value = data
  } catch (e) {
    console.log(e)
  }
}

onMounted(() => {
  getCompanyData()
  getCompanyRiskScoreCard()
})
</script>

<style scoped></style>
