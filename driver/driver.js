const assert = require('assert')

class Driver {
    constructor (id) {
        //Add all required properties here
        this.id = id
    }

    addDriver (driver) {
        this._setDriver(driver)
    }
    
    static fromData (data) {
        assert(typeof data === 'object', 'driver fromData: invalid object')
        const driver = new Driver(data.id)
        return driver
    }
}
module.exports = { Driver }
