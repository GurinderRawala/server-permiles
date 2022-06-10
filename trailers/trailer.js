const assert = require('assert')
class Trailer{
    constructor(id){
        this.id = id
    }
    static fromData (data) {
        assert(typeof data === 'object', 'trailer fromData: invalid object')
        const trailer = new Trailer(data.id)
        trailer.clientid = data.clientid 
        trailer.model =  data.model  
        trailer.make = data.make
        trailer.year = data.year
        trailer.trailerAttributes = data.trailerAttributes
        trailer.trailerNo = data.trailerNo 
        trailer.vinNumber = data.vinNumber
        trailer.licencePlate = data.licencePlate 
        trailer.licenceState = data.licenceState
        trailer.safetyExpire = data.safetyExpire 
        trailer.notes = data.notes
        trailer.filepath = data.filepath 
        return trailer
    }
    static async uploadTrailerFiles(data, files, { uploadService }){
        let filepath = null
        if(files){
            filepath = await uploadService(files, data.id, (err, results) =>{
                if(err){ throw new Error(err) }
                return results
            })
        }
        const payload = {
            ...data,
            filepath
        }
        return this.fromData(payload)
    }
}

module.exports = { Trailer }