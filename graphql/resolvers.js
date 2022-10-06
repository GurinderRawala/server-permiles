const { get } = require("lodash")

class Resolver{
    constructor(modules){
        this.modules = modules
    }
    async findAll(repoKey, condition){
        return await get(this.modules, repoKey).findAll(condition)
    }
}

module.exports = { Resolver }