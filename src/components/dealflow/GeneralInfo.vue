<template>
  <div v-if="company" class="flex justify-between mt-10 overflow-x-auto">
    <div class="lg:basis-1/5 mr-4">
      <img
        :src="getFile(props.company.logo)"
        :alt="`${props.company.company_name} logo`"
        class="md:w-[157.5x] md:h-[157.5px] rounded-full mb-3"
      />
      <p class="text-center md:text-left md:pl-5 text-[15] md:text-[22px]">
        {{ props.company.company_name }}
      </p>
    </div>
    <div class="lg:basis-4/5">
      <div class="bg-kfLightGray p-5 rounded-[2px] mb-10">
        <p class="text-[15px]">{{ props.company.company_summary }}</p>
      </div>
      <div class="lg:flex gap-11">
        <div class="lg:basis-1/2">
          <TextInput
            label="Funding Amount"
            disabled
            :value="formData.fundingAmount"
          />
        </div>
        <div class="lg:basis-1/2">
          <TextInput
            label="Current Pipeline Stage"
            disabled
            :value="formData.currentPipelineStage"
          />
        </div>
      </div>

      <div class="lg:flex gap-11">
        <div class="lg:basis-1/2">
          <TextInput label="Industry" disabled :value="formData.industry" />
        </div>
        <div class="lg:basis-1/2">
          <TextInput
            label="Expected Date of Close"
            disabled
            :value="formData.dateOfClose"
          />
        </div>
      </div>

      <div class="lg:flex gap-11">
        <div class="lg:basis-1/2">
          <TextInput
            label="Business Model"
            disabled
            :value="formData.businessModel"
          />
        </div>
        <div class="lg:basis-1/2">
          <TextInput
            label="Funding Round'"
            disabled
            :value="formData.fundingRound"
          />
        </div>
      </div>

      <div class="lg:flex gap-11">
        <div class="lg:basis-1/2">
          <TextInput
            :label="'Funding Amount'"
            disabled
            :value="formData.fundingAmount"
          />
        </div>
        <div class="lg:basis-1/2">
          <TextInput
            label="Year Founded"
            disabled
            :value="formData.yearFounded"
          />
        </div>
      </div>

      <div class="lg:flex gap-11">
        <div class="lg:basis-1/2">
          <TextInput label="Location" disabled :value="formData.location" />
        </div>
        <div class="lg:basis-1/2"></div>
      </div>
      <div class="lg:flex gap-11">
        <div class="lg:basis-1/2">
          <TextInput label="Website" disabled :value="formData.website" />
        </div>
        <div class="lg:basis-1/2"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { formattedDate, getFile } from '@/utils/utils'
import TextInput from '@/components/inputs/TextInput.vue'
import { reactive } from 'vue'
import type { CompanyT } from '@/types/type'

interface IProps {
  company: CompanyT
}

const props = defineProps<IProps>()

const formData = reactive({
  fundingAmount: `${props.company.min_amount} to ${props.company.max_amount}`,
  currentPipelineStage: `${props.company.current_stage}`,
  industry: `${props.company.industry_type}`,
  dateOfClose: `${formattedDate(props.company.created_at)}`,
  businessModel: `${props.company.business_model}`,
  fundingRound: `${props.company.funding_round}`,
  yearFounded: `${props.company.year_founded}`,
  fundingType: `${props.company.funding_type}`,
  location: `${props.company.address.city} ${props.company.address.country}`,
  website: `${props.company.website}`,
})
</script>

<style scoped></style>
