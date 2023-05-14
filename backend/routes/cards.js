const cardsRouter = require('express').Router();
const { celebrate } = require('celebrate');

const { createCardValidation, deleteCardValidation, likeCardValidation } = require('../middlewares/validation');
const cardOwnerCheck = require('../middlewares/cardOwnerCheck');

const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');

cardsRouter.get('/', getCards);
cardsRouter.post('/', celebrate(createCardValidation), createCard);
cardsRouter.delete('/:cardId', celebrate(deleteCardValidation), cardOwnerCheck, deleteCard);
cardsRouter.put('/:cardId/likes', celebrate(likeCardValidation), likeCard);
cardsRouter.delete('/:cardId/likes', celebrate(likeCardValidation), dislikeCard);

module.exports = cardsRouter;
