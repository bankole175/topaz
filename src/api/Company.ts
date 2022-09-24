import Api from '@/api/index'
import { Auth } from '@/api/Auth'

export default class extends Api {
  static async getCompanies() {
    try {
      const { data } = await this.get('company/fetch')
      return data
    } catch (e: any) {
      return { errors: e.response }
    }
  }

  static async getCompany(id: string) {
    try {
      const { data } = await this.get(`company/fetch/${id}`)
      return data
    } catch (e: any) {
      return { errors: e.response }
    }
  }

  static async getCompanyRiskScoreCard(id: string) {
    try {
      const { data } = await this.get(`risk-scorecard/${id}`)
      return data
    } catch (e: any) {
      return { errors: e.response }
    }
  }
}
