import { utilService } from './util.service';
import { storageService } from './async-storage.service';

export const emailService = { query, remove };

const STORAGE_KEY = 'emails';

_createEmails();

function _createEmails() {
  let emails = utilService.loadFromStorage(STORAGE_KEY);
  if (!emails || !emails.length) {
    const arrLength = 10;
    const contactList = ['jone@momo.com', 'done@gmail.com', 'sun@gmail.com'];
    const subjectsList = ['Hi, how are you', 'Welcome', 'Join now'];
    const bodyList = ['this is a body', 'body', 'different body'];
    const booleanValuesList = [true, false];
    const booleanValuesWithNullList = [true, false, null];

    emails = Array.from({ length: arrLength }, (_, idx) => {
      return {
        id: `e0${idx}`,
        subject: utilService.getRandomValue(subjectsList),
        body: utilService.getRandomValue(bodyList),
        isRead: utilService.getRandomValue(booleanValuesWithNullList),
        isStarred: utilService.getRandomValue(booleanValuesList),
        sentAt: +utilService.getRandomTimestampIn24Hours(),
        removedAt: utilService.getRandomValue(booleanValuesWithNullList),
        from: utilService.getRandomValue(contactList),
        to: utilService.getRandomValue(contactList),
      };
    });
  }

  utilService.saveToStorage(STORAGE_KEY, emails);
}

async function query() {
  let emails = await storageService.query(STORAGE_KEY);
  return emails;
}

async function remove(id) {
  return storageService.remove(STORAGE_KEY, id);
}
