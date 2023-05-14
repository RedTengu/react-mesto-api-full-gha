const { Joi } = require('celebrate');

const regex = /^(http|https):\/\/[^ "]+$/;

const getUserByIdValidation = {
  params: Joi.object({
    userId: Joi.string().length(24),
  }),
};

const registerValidation = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(regex),
  }),
};

const loginValidation = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
};

const editUserValidation = {
  body: Joi.object({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
};

const editAvatarValidation = {
  body: Joi.object({
    avatar: Joi.string().regex(regex),
  }),
};

const createCardValidation = {
  body: Joi.object({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().regex(regex),
  }),
};

const deleteCardValidation = {
  params: Joi.object({
    cardId: Joi.string().length(24),
  }),
};

const likeCardValidation = {
  params: Joi.object({
    cardId: Joi.string().length(24),
  }),
};

module.exports = {
  getUserByIdValidation,
  registerValidation,
  loginValidation,
  editUserValidation,
  editAvatarValidation,
  createCardValidation,
  deleteCardValidation,
  likeCardValidation,
};
