import Api from '@/api/index'

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
}