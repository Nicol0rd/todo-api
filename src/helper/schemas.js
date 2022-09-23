const Joi = require('joi')
const schemas = {
  todoPOST: Joi.object().keys({
    name: Joi.string().required().max(255),
    description: Joi.string().required().max(255)
  }).required(),
  todoUPDATE: Joi.object().keys({
    name: Joi.string().max(255),
    description: Joi.string().max(255)
  }).or('name', 'description'),
  todoGET: Joi.object().keys({
    limit: Joi.number().required().min(5),
    page: Joi.number().required().min(1),
    status: Joi.string().valid('pending', 'deleted', 'completed', 'all').required()
  }).required(),
  todoCOMPLETE: Joi.object().keys({
    id: Joi.string().hex().length(24).required()
  }).required(),
  todoDELETE: Joi.object().keys({
    id: Joi.string().hex().length(24).required()
  })
};
module.exports = schemas;