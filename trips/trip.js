class Trip{
    constructor(trip){
        this.id = trip.id
        this.clientid = trip.clientid
        this.assignedTo = trip.assignedTo
        this.tripInfo = trip.tripInfo
        this.bol = trip?.bol || null
        this.pod = trip?.pod || null
        this.data = trip
    }
    async uploadTripFiles(files, { uploadService }){
        let fileData = null
        if(files?.length){
            fileData = await uploadService(files, [this.clientid, "trip"].join("/"), (err, results) =>{
                if(err){ throw new Error(err)}
                return results
            })
        }
        return fileData
    }
}

module.exports = { Trip }