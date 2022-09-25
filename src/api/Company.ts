import Api from '@/api/index'

export default class extends Api {
  static async getCompanies() {
    const { data } = await this.get('company/fetch')
    return data
  }

  static async getCompany(id: string | string[]) {
    const { data } = await this.get(`company/fetch/${id}`)
    return data
  }

  static async getCompanyRiskScoreCard(id: string | string[]) {
    const { data } = await this.get(`risk-scorecard/${id}`)
    return data
  }
}
