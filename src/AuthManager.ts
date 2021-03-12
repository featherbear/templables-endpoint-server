import ManagerBase from './ManagerBase'
import bcrypt from 'bcryptjs'

export default new (class extends ManagerBase {
  protected data: {
    [username: string]: {
      password: string
    }
  }

  constructor() {
    super()
    this.check = this.check.bind(this)
  }

  createUser(username: string, password: string) {
    // Clean username
    username = username.trim().toLowerCase()

    if (this.data.hasOwnProperty(username)) {
      throw new Error("User exists")
    }

    this.data[username] = {
      password: bcrypt.hashSync(password)
    }

    this.save()
  }

  check(username: string, password: string) {
    username = username.trim().toLocaleLowerCase()
  
    if (!this.data.hasOwnProperty(username)) return false
    return bcrypt.compareSync(password, this.data[username].password)
  }

  delete(username: string) {
    username = username.trim().toLocaleLowerCase()

    if (!this.data.hasOwnProperty(username)) {
      throw new Error("Username does not exist")
    }

    delete this.data[username]
    return true;
  }
})()