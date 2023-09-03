const { get } = require('lodash')

class Resolver {
  constructor(modules) {
    this.modules = modules
    this.log = modules.log
  }
  async findAll(repoKey, condition) {
    return await this.findRepo(repoKey).findAll(condition)
  }
  async create(repoKey, payload) {
    return await this.findRepo(repoKey).create(payload)
  }
  async update(repoKey, payload) {
    const { condition, data } = payload
    try {
      const res = await this.findRepo(repoKey).update(data, condition)
      if (res[0] === 1) {
        return await this.findByPk(repoKey, condition.where.id)
      }
      return null
    } catch (err) {
      this.log.error({ err }, 'Error updating in resolver')
      throw err
    }
  }
  async delete(repoKey, payload) {
    const { condition } = payload

    let record = null

    try {
      record = await this.findByPk(repoKey, condition.where.id)
    } catch (err) {
      this.log.error({ err }, 'error finding record')
      throw err
    }

    try {
      await this.findRepo(repoKey).destroy(condition)
      this.log.info({ record }, 'Row destroyed successfully')
      return record
    } catch (err) {
      this.log.error({ err }, `Error delete record`)
      throw err
    }
  }
  async findByPk(repoKey, pk) {
    return await this.findRepo(repoKey).findByPk(pk)
  }
  findRepo(repoKey) {
    return get(this.modules, repoKey)
  }
}

module.exports = { Resolver }
