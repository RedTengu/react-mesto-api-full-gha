const Card = require('../models/card');

const NotFound = require('../errors/notFoundError');

const cardCheck = (card, res) => {
  if (card) {
    return res.send(card);
  }
  throw new NotFound('Карточка с указанным _id не найдена.');
};

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => {
      res.send(cards);
    })
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const { _id } = req.user;

  Card.create({ name, link, owner: _id })
    .then((newCard) => {
      res.send(newCard);
    })
    .catch(next);
};

const deleteCard = (req, res, next) => {
  const { cardId } = req.params;

  Card.deleteOne({ _id: cardId })
    .then((card) => {
      if (card.deletedCount === 0) {
        throw new NotFound('Карточка с указанным _id не найдена.');
      }
      return res.send({ message: 'Карточка успешно удалена.' });
    })
    .catch(next);
};

const likeCard = (req, res, next) => {
  const { cardId } = req.params;
  const ownerId = req.user._id;

  Card.findByIdAndUpdate(cardId, { $addToSet: { likes: ownerId } }, { new: true })
    .then((card) => {
      cardCheck(card, res);
    })
    .catch(next);
};

const dislikeCard = (req, res, next) => {
  const { cardId } = req.params;
  const ownerId = req.user._id;

  Card.findByIdAndUpdate(cardId, { $pull: { likes: ownerId } }, { new: true })
    .then((card) => {
      cardCheck(card, res);
    })
    .catch(next);
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
