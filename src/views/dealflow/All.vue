<template>
  <div>
    <div class="flex justify-between items-center mb-10">
      <p class="font-playfair text-[2rem]">Dealflow</p>
      <button class="btn-outline-dark">
        <img
          src="../../assets/icons/filter.svg"
          alt="filter icon"
          class="mr-3"
        />
        Filter
      </button>
    </div>
    <div class="flex mb-8">
      <p class="text-[#40B540]">
        Approved Deals
        <span class="rounded bg-[#F1F9F1] text-[13px] ml-3 p-2 mb-3">40</span>
      </p>
      <p class="text-[#B5B540] mx-10">
        Processed Deals
        <span class="rounded bg-[#F8F8E8] text-[13px] ml-3 p-2 mb-3">40</span>
      </p>
      <p class="text-[#F45252]">
        Rejected Deals
        <span class="rounded bg-[#F8ECEC] text-[13px] ml-3 p-2 mb-3">40</span>
      </p>
    </div>
    <div class="flex gap-4 overflow-x-auto">
      <div v-for="(data, index) in kananRecords" :key="index">
        <KanbanComponent :data="data" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Company from '@/api/Company'
import { defineComponent, onMounted, ref } from 'vue'
import type { CompanyT } from '@/types/type'
import KanbanComponent from '@/components/Kanban.vue'
import router from '@/router'
import { useRouter } from 'vue-router'

export default defineComponent({
  components: { KanbanComponent },
  setup() {
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
    let kananRecords = ref<{ label: string; companies: CompanyT[] }[]>([])

    const getCompanies = async () => {
      try {
        const { data, errors } = await Company.getCompanies()
        if (errors) {
          console.log(errors, 'errors')
          if (errors.status === 401) await router.push('/login')
          return
        }
        prepareKanbanBoard(data)
      } catch (e) {
        console.log(e)
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

    onMounted(() => {
      getCompanies()
    })

    return { kananRecords }
  },
})
</script>
