<template>
  <div>
    <div class="flex justify-between items-center mb-10">
      <p class="font-playfair text-[2rem]">Dealflow</p>
      <button class="btn-outline-dark">
        <img
          src="/src/assets/icons/filter.svg"
          alt="filter icon"
          class="mr-3"
        />
        Filter
      </button>
    </div>
    <div class="flex mb-8 whitespace-nowrap overflow-x-auto overflow-y-hidden">
      <p class="text-[#40B540]">
        Approved Deals
        <span class="rounded bg-[#F1F9F1] text-[13px] ml-3 p-2 mb-3">
          {{ getStatusCount('approved') }}
        </span>
      </p>
      <p class="text-[#B5B540] mx-10">
        Processed Deals
        <span class="rounded bg-[#F8F8E8] text-[13px] ml-3 p-2 mb-3">
          {{ getStatusCount('processed') }}
        </span>
      </p>
      <p class="text-[#F45252]">
        Rejected Deals
        <span class="rounded bg-[#F8ECEC] text-[13px] ml-3 p-2 mb-3">
          {{ getStatusCount('rejected') }}
        </span>
      </p>
    </div>
    <div class="flex gap-4 overflow-x-auto">
      <div v-for="(data, index) in kananRecords" :key="index">
        <KanbanComponent :kanbanRecord="data" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Company from '@/api/Company'
import { onMounted, ref } from 'vue'
import type { CompanyT, KanbanRecordT } from '@/types/type'
import KanbanComponent from '@/components/dealflow/Kanban.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const stages = [
  'onboarding',
  'stage 1',
  'stage 2',
  'stage 3',
  'stage 4',
  'stage 5',
  'stage 6',
  'stage 7',
  'stage 8',
  'stage 9',
]
let kananRecords = ref<KanbanRecordT[]>([])
let companyData = ref<CompanyT[]>()

const getCompanies = async () => {
  try {
    const { data } = await Company.getCompanies()
    companyData.value = data
    prepareKanbanBoard(data)
  } catch (error: any) {
    if (error.response.status === 401) await router.push('/login')
  }
}

const prepareKanbanBoard = (companyData: CompanyT[]) => {
  stages.forEach((stage) => {
    const selectedStageCompanies = companyData.filter(
      (company) => company.current_stage.toLowerCase() === stage,
    )
    kananRecords.value.push({
      label: stage,
      companies: selectedStageCompanies,
    })
  })
}

const getStatusCount = (status: string) => {
  const filteredValue: CompanyT[] | undefined = companyData.value?.filter(
    (company) => company.stage_status.toLowerCase() === status,
  )
  return filteredValue ? filteredValue.length : 0
}

onMounted(() => {
  getCompanies()
})
</script>
