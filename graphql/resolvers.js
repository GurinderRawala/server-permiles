const { get } = require("lodash")

class Resolver{
    constructor(modules){
        this.modules = modules
    }
    async findAll(repoKey, condition){
        return await this.findRepo(repoKey).findAll(condition)
    }
    async create(repoKey, condition){
        return await this.findRepo(repoKey).create(condition)
    }
    async update(repoKey, payload){
        const { condition, data } = payload
        return await this.findRepo(repoKey).update(data, condition)
    }
    async findByPk(repoKey, pk){
        return await this.findRepo(repoKey).findByPk(pk)
    }
    findRepo(repoKey){
        return get(this.modules, repoKey)
    }
}

module.exports = { Resolver }