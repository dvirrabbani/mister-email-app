export const utilService = {
  makeId,
  saveToStorage,
  loadFromStorage,
  getRandomTimestampIn24Hours,
  getRandomValue,
};

function makeId(length = 5) {
  var text = '';
  var possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

function saveToStorage(key, value) {
  localStorage[key] = JSON.stringify(value);
}

function loadFromStorage(key, defaultValue = null) {
  var value = localStorage[key] || defaultValue;
  return JSON.parse(value);
}

function getRandomTimestampIn24Hours() {
  const now = new Date();
  const oneDayInMillis = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
  const randomMillis = Math.floor(Math.random() * oneDayInMillis);
  const randomTimestamp = new Date(now.getTime() + randomMillis);
  return randomTimestamp;
}

function getRandomValue(array) {
  return array[Math.floor(Math.random() * array.length)];
}
