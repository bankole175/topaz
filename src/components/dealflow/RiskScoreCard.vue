<template>
  <div class="my-5">
    <div class="overflow-x-auto">
      <table
        class="table overflow-x-auto whitespace-nowrap border-[1px] border-[#E5E6E6]"
      >
        <thead class="border-b-[1px] h-[70px]">
          <tr>
            <th class="border-r-[1px] w-full">
              <p class="font-medium text-[15px]">Risks</p>
              <p class="text-[13px] text-kfGray">Ratings 1 [Low] to 5 [High]</p>
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
              <p class="border-t-2 border-white px-5 capitalize">
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
            <td class="py-5 px-3 font-medium uppercase underline text-[12px]">
              <div class="flex items-center">
                {{ data.label }}
                <span
                  v-if="!categoryVisibility[index]"
                  @click="clearRiskScoreToHide(index)"
                  class="ml-3 cursor-pointer"
                >
                  <img src="/src/assets/icons/arrow-up.svg" alt="" />
                </span>
                <span
                  v-if="categoryVisibility[index]"
                  class="ml-3 cursor-pointer"
                  @click="setRiskScoreToHide(index)"
                >
                  <img src="/src/assets/icons/arrow-down.svg" alt="" />
                </span>
              </div>
            </td>
            <td
              class="border-x-[1px] border-[#E5E6E6]"
              v-for="item in tableHeader"
              :key="item"
            ></td>
          </tr>
          <template v-if="riskScoreToHide[index]">
            <tr v-for="(risk, index) in data.riskScore" :key="index">
              <td class="risk-score-cell text-left px-3 text-kfGray">
                {{ risk.type }}
              </td>
              <td
                v-for="(label, index) in tableHeader"
                :key="index"
                class="risk-score-cell text-kfGray"
              >
                {{ risk[label] }}
              </td>
              <td class="risk-score-cell text-kfGray capitalize">
                {{ getUserData(risk) }}
              </td>
            </tr>
          </template>
        </tbody>
        <tbody class="border-b-[1px] border-[#E5E6E6] bg-[#F4F5F5]">
          <tr>
            <td class="font-medium risk-score-cell opacity-[0.6] text-center">
              Total Perceived Risk Score
            </td>
            <td
              v-for="(label, index) in tableHeader"
              :key="index"
              class="risk-score-cell text-kfGray"
            >
              {{ totalPerceivedRiskScore[label] }}
            </td>
            <td class="risk-score-cell opacity-[0.6]">
              {{ totalPerceivedRiskAverage }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

const companyRiskScoreCard = ref()
const tableHeader = ref()
const riskScoreToHide = ref()
const categoryVisibility = ref()
const totalPerceivedRiskAverage = ref()
const totalPerceivedRiskScore = ref<any>({})
const riskScoreCardCategory = [
  'Product & Tech Risks',
  'Market Risks',
  'Management Risks',
  'Other Risks',
]
const getHeaderName = (label: string) => {
  return label.slice(0, -6)
}

interface IProps {
  riskScoreData: any[]
}

const props = defineProps<IProps>()

const setRiskScoreToHide = (selectedIndex: number) => {
  riskScoreToHide.value[selectedIndex] = false
  categoryVisibility.value[selectedIndex] = false
}

const clearRiskScoreToHide = (selectedIndex: number) => {
  riskScoreToHide.value[selectedIndex] = true
  categoryVisibility.value[selectedIndex] = true
}

const getUserData = (risk: any) => {
  const scores: number[] = []
  tableHeader.value.forEach((label: string) => {
    scores.push(risk[label])
  })
  const total = scores.reduce((a, b) => a + b, 0)
  return Number((total / tableHeader.value.length).toFixed(0))
}

const prepareTotalPerceivedRiskScore = () => {
  const totalScoreArray: number[] = []
  const label = Object.keys(props.riskScoreData[0])
  tableHeader.value = label.filter((lab) => lab.includes('score'))
  tableHeader.value.forEach((label: string) => {
    const scores: Array<number> = []
    props.riskScoreData.forEach((item: { [x: string]: number }) => {
      scores.push(item[label])
    })
    const userTotal = scores.reduce((a, b) => a + b, 0)
    totalScoreArray.push(userTotal)
    totalPerceivedRiskScore.value[label] = userTotal
  })
  const total = totalScoreArray.reduce((a, b) => a + b, 0)
  totalPerceivedRiskAverage.value = Number(
    (total / tableHeader.value.length).toFixed(0),
  )
}

const prepareRiskScoreCardRecord = () => {
  const riskScoreCardRecord: any[] = []

  let categoryObject: any = {}
  riskScoreCardCategory.forEach((category, index) => {
    categoryObject[index] = true
    const riskScoreCardData = props.riskScoreData.filter(
      (risk: { category: string }) => risk.category === category,
    )
    riskScoreCardRecord.push({
      label: category,
      riskScore: riskScoreCardData,
    })
  })
  companyRiskScoreCard.value = riskScoreCardRecord
  categoryVisibility.value = categoryObject
  riskScoreToHide.value = categoryObject
}

onMounted(() => {
  prepareTotalPerceivedRiskScore()
  prepareRiskScoreCardRecord()
})
</script>

<style scoped></style>
