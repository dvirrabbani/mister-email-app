import { utilService } from './util.service';
import { storageService } from './async-storage.service';

export const emailService = {
  query,
  remove,
  save,
  getFilterFromParams,
  sentizeFilterBy,
  getById,
  getDefaultEmail,
  getDefaultFilter,
};

const STORAGE_KEY = 'emails';
const loggedinUser = { email: 'user@appsus.com', fullname: 'Mahatma Appsus' };

_createEmails();

async function query(filterBy) {
  let emails = await storageService.query(STORAGE_KEY);
  if (filterBy) emails = _filterEmailsBy(emails, filterBy);
  return emails;
}

function getById(id) {
  return storageService.get(STORAGE_KEY, id);
}

async function remove(id) {
  return storageService.remove(STORAGE_KEY, id);
}

async function save(emailToSave) {
  if (emailToSave.id) {
    return storageService.put(STORAGE_KEY, emailToSave);
  } else {
    emailToSave.isRead = null;
    emailToSave.isStarred = false;
    emailToSave.sentAt = new Date().getTime();
    emailToSave.removedAt = null;
    emailToSave.from = loggedinUser.email;
    return storageService.post(STORAGE_KEY, emailToSave);
  }
}

function sentizeFilterBy(filterBy) {
  const senitizedFilterBy = { ...filterBy };

  for (const [field, value] of Object.entries(filterBy)) {
    if (value === '' || value === null || field === 'folder') {
      delete senitizedFilterBy[field];
    }
  }
  return senitizedFilterBy;
}

function getDefaultFilter() {
  return {
    txt: '',
    isRead: null,
    folder: 'inbox',
  };
}

function getFilterFromParams(searchParams) {
  const defaultFilter = getDefaultFilter();
  const filterBy = {};

  for (const field in defaultFilter) {
    const searchParamValue = searchParams.get(field);
    if (searchParamValue === 'false') {
      filterBy[field] = false;
    } else if (searchParamValue === 'true') {
      filterBy[field] = true;
    } else {
      filterBy[field] = searchParamValue || defaultFilter[field];
    }
  }
  return filterBy;
}

function getDefaultEmail() {
  return {
    to: '',
    subject: '',
    body: '',
  };
}

function _filterEmailsByFolder(emails, folder) {
  if (folder !== 'trash') emails = emails.filter((email) => !email.removedAt);

  switch (folder) {
    case 'inbox':
      return emails.filter((email) => email.to === loggedinUser.email);
    case 'sent':
      return emails.filter((email) => email.from === loggedinUser.email);
    case 'trash':
      return emails.filter((email) => email.removedAt);
    case 'starred':
      return emails.filter((email) => email.isStarred);
    default:
      return emails;
  }
}

function _filterEmailsBy(emails, filterBy) {
  let { txt = '', isRead = null, folder } = filterBy;
  const regexTxtTerm = new RegExp(txt, 'i');
  let filteredEmails = [];

  filteredEmails = _filterEmailsByFolder(emails, folder);

  if (isRead !== null) {
    filteredEmails = filteredEmails.filter((email) => email.isRead === isRead);
  }

  if (txt) {
    filteredEmails = filteredEmails.filter((email) => {
      return regexTxtTerm.test(email.body);
    });
  }

  return filteredEmails;
}

function _createEmails() {
  let emails = utilService.loadFromStorage(STORAGE_KEY);
  if (!emails || !emails.length) {
    const arrLength = 30;
    const contactList = ['user@appsus.com', 'done@gmail.com', 'sun@gmail.com'];
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
        sentAt: utilService.getRandomValue([
          null,
          utilService.getRandomTimestampIn24Hours(),
        ]),
        removedAt: utilService.getRandomValue([
          null,
          utilService.getRandomTimestampIn24Hours(),
        ]),
        from: utilService.getRandomValue(contactList),
        to: utilService.getRandomValue(contactList),
      };
    });
  }

  utilService.saveToStorage(STORAGE_KEY, emails);
}
