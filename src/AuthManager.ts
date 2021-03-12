import ManagerBase from './ManagerBase'

export default new (class extends ManagerBase {
  protected data: Object | {
    [username: string]: {
      password: string
    }
  }

  createUser(username: string, password: string) {
    // Clean username
    username = username.trim()

    const f_username = username.toLowerCase()
    if (this.data.hasOwnProperty(f_username)) {
      throw new Error("User exists")
    }

    this.data[f_username] = {
      password
    }
  }
})()