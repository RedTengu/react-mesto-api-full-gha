const usersRouter = require('express').Router();
const { celebrate } = require('celebrate');

const { getUserByIdValidation, editUserValidation, editAvatarValidation } = require('../middlewares/validation');

const {
  getCurrentUser, getUsers, getUserById, createUser, editUser, editAvatar,
} = require('../controllers/users');

usersRouter.get('/me', getCurrentUser);
usersRouter.get('/', getUsers);
usersRouter.get('/:userId', celebrate(getUserByIdValidation), getUserById);
usersRouter.post('/', createUser);
usersRouter.patch('/me', celebrate(editUserValidation), editUser);
usersRouter.patch('/me/avatar', celebrate(editAvatarValidation), editAvatar);

module.exports = usersRouter;
