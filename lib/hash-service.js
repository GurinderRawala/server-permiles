const bcrypt = require('bcrypt')
const hash = async (log, payload, callback) => {
  try {
    const salt = await bcrypt.genSalt(10)
    const hashed = await bcrypt.hash(payload, salt)
    log.info('Payload has been hashed')
    return callback(null, hashed)
  } catch (err) {
    log.error(err, 'Hashing payload failed')
    return callback(err)
  }
}
const verify = async (log, payload, hash, callback) => {
  try {
    const verify = await bcrypt.compare(payload, hash)
    log.info(verify, 'verify results')
    return callback(null, verify)
  } catch (err) {
    log.error(err, 'Error verifing payload')
    return callback(err)
  }
}

module.exports.createHashingService = (log) => {
  return {
    hash: hash.bind(null, log),
    verify: verify.bind(null, log),
  }
}
