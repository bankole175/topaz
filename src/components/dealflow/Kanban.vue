<template>
  <div
    class="bg-kfLightGray w-[250px] kanban-height px-3"
    v-if="props.kanbanRecord"
  >
    <p class="uppercase text-[0.9375rem] pt-3">
      {{ props.kanbanRecord.label }}
    </p>
    <div
      class="my-[12px]"
      v-for="company in props.kanbanRecord.companies"
      :key="company.id"
    >
      <div class="bg-white w-[226px] h-[104px] rounded-[2px]">
        <div
          class="float-right text-white text-[10px] p-1 pl-5 kanban-status"
          :class="`${
            company.stage_status === 'Approved'
              ? 'bg-[#40B540]'
              : company.stage_status === 'Processing'
              ? 'bg-[#B5B540]'
              : 'bg-[#F45252]'
          }`"
        >
          <p>{{ company.stage_status }}</p>
        </div>
        <div class="p-2">
          <div class="flex items-start mt-4">
            <img
              :src="getFile(company.logo)"
              alt=""
              class="w-[36px] h-[36px] rounded-full"
            />
            <div class="ml-3">
              <router-link
                :to="{ name: 'singleDealflow', params: { id: company.id } }"
                class="text-[13px]"
                >{{ company.company_name }}</router-link
              >
              <p class="text-kfGray text-[11px]">
                Submitted {{ formattedDate(company.created_at) }}
              </p>
            </div>
          </div>
          <div class="flex justify-between mt-2">
            <p class="bg-kfLightGray text-kfGray text-[13px] p-1">
              {{ company.business_model }}
            </p>
            <p class="bg-kfLightGray text-kfGray p-1 text-[13px]">
              ${{ company.min_amount }} to ${{ company.max_amount }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getFile, formattedDate } from '@/utils/utils'
import type { KanbanRecordT } from '@/types/type'

interface IProps {
  kanbanRecord: KanbanRecordT
}
const props = defineProps<IProps>()
</script>

<style scoped>
@media screen and (min-width: 1000px) {
  .kanban-height {
    height: calc(100vh - 355px);
  }
}

@media screen and (max-width: 1000px) {
  .kanban-height {
    height: 100vh;
  }
}

.kanban-status {
  border-radius: 0 2px 0 24px;
}
</style>
