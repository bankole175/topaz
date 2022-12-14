import Api from '@/api/index'
import { Auth } from '@/api/Auth'
import type { LoginT } from '@/types/type'

export default class extends Api {
  static async login(payload: LoginT) {
    const { data } = await this.post('auth/signin', payload)
    Auth.setOAuth(data)
    return data
  }
}
