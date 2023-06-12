const { Op } = require('sequelize')
const { GraphQLString } = require('graphql')

exports.createWhereCondition = (ctx, args) => ({
  where: {
    [Op.and]: [{ clientid: ctx.body.clientid }, { ...args.where }],
  },
  order: [['createdAt', args.orderBy || 'ASC']],
})

exports.createCommonArgs = (whereTypes) => ({
  where: {
    type: whereTypes,
    description: 'Find record using where expression',
  },
  orderBy: {
    type: GraphQLString,
    description: 'Field to order by',
  },
})

exports.mapToJSONparse = (data) => JSON.parse(data)
