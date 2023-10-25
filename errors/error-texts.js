const urlValidationFailed = 'Url validation failed';

const internalServerError = 'Server Error';
const badRequest = 'invalid data';
const noRights = 'нет прав для удаления фильма';
const notFoundMovieError = 'Movie not found';
const notFoundUserError = 'Нет пользователя с таким id';
const conflictError = 'Пользователь с таким email уже существует';
const unauthorizedError = 'Неправильные почта или пароль';

const serverCrashedError = 'Сервер сейчас упадёт';

module.exports = {
  urlValidationFailed,
  internalServerError,
  badRequest,
  noRights,
  notFoundMovieError,
  notFoundUserError,
  conflictError,
  serverCrashedError,
  unauthorizedError,
};
