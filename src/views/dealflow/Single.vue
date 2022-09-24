<template>
  <div>
    <div class="sm:flex justify-between items-center">
      <p class="font-playfair text-[2rem] mb-2 sm:mb-0">Dealflow</p>
      <div class="flex mb-3 sm:mb-0">
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
      <div class="md:flex justify-between mt-8 md:mt-5">
        <div class="flex gap-3">
          <p
            @click="setCurrentHeader('generalInfo')"
            class="cursor-pointer text-kfGray"
            :class="{
              'border-b-2 border-black font-medium text-black':
                tab === 'generalInfo',
            }"
          >
            General Info
          </p>
          <p
            @click="setCurrentHeader('riskScoreCard')"
            class="cursor-pointer text-kfGray"
            :class="{
              'border-b-2 border-black font-medium text-black':
                tab === 'riskScoreCard',
            }"
          >
            Risk Scorecard
          </p>
        </div>
        <div class="flex items-center gap-5 mt-5 lg:mt-0">
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
      <GeneralInfo v-if="tab === 'generalInfo'" :company="company" />
      <RiskScoreCard
        v-if="tab === 'riskScoreCard'"
        :riskScoreData="riskScoreData"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import Company from '@/api/Company'
import { onMounted, ref } from 'vue'
import type { CompanyT } from '@/types/type'
import { formattedDate, getFile } from '@/utils/utils'
import GeneralInfo from '@/components/dealflow/GeneralInfo.vue'
import RiskScoreCard from '@/components/dealflow/RiskScoreCard.vue'

const route = useRoute()
const router = useRouter()
const id = route.params.id
const company = ref<CompanyT>()
const riskScoreData = ref()
const tab = ref<string>('generalInfo')

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

const setCurrentHeader = (currentTab: string) => {
  tab.value = currentTab
}
const getCompanyRiskScoreCard = async () => {
  try {
    const { data, errors } = await Company.getCompanyRiskScoreCard(id)
    if (errors) {
      if (errors.status === 401) await router.push('/login')
      return
    }
    riskScoreData.value = data
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
