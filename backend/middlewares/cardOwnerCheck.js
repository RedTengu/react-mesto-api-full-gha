const Card = require('../models/card');

const Forbidden = require('../errors/forbiddenError');
const NotFound = require('../errors/notFoundError');

module.exports = (req, res, next) => {
  const { cardId } = req.params;

  Card.findById({ _id: cardId })
    .then((card) => {
      if (!card) {
        throw new NotFound('Карточка с указанным _id не найдена.');
      }
      if (String(card.owner) !== req.user._id) {
        throw new Forbidden('Чужие карточки удалять нельзя!');
      }
      return next();
    })
    .catch(next);
};
