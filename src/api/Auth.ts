export class Auth {
  static setOAuth(data: any) {
    window.localStorage.setItem('oauth', JSON.stringify(data))
  }

  static getOAuth() {
    return JSON.parse(localStorage.getItem('oauth')!)
  }

  static get() {
    const data = this.getOAuth()

    return data?.data.token
  }

  static isUserValid() {
    return !!this.get()
  }

  static authorization() {
    const accessToken = this.get()

    if (!accessToken) return null
    return `Bearer ${accessToken}`
  }
}
