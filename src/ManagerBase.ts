import fs from 'fs'

export default class {
  protected data: {}
  #filePath: string

  constructor() {
    this.data = {}
    this.#filePath = null
  }

  init(filePath: string) {
    if (!filePath) throw new Error("File path required")

    this.data = {}
    this.#filePath = filePath

    if (!fs.existsSync(filePath)) {
      this.save()
    } else {
      this.data = JSON.parse(fs.readFileSync(filePath, 'utf8'))
    }
  }

  save() {
    if (!this.data) throw new Error("Manager not ready")
    fs.writeFileSync(this.#filePath, JSON.stringify(this.data))
  }
}