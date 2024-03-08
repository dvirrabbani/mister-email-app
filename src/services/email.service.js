import { utilService } from './util.service';
import { storageService } from './async-storage.service';

export const emailService = {
  query,
  remove,
  save,
  getFilterFromParams,
  sentizeFilterBy,
};

const STORAGE_KEY = 'emails';

_createEmails();

async function query(filterBy) {
  let emails = await storageService.query(STORAGE_KEY);
  if (filterBy) emails = _filterEmailsBy(emails, filterBy);
  return emails;
}

async function remove(id) {
  return storageService.remove(STORAGE_KEY, id);
}

async function save(emailToSave) {
  if (emailToSave.id) {
    return storageService.put(STORAGE_KEY, emailToSave);
  } else {
    return storageService.post(STORAGE_KEY, emailToSave);
  }
}

function getDefaultFilter() {
  return {
    body: '',
    isRead: null,
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

function _filterEmailsBy(emails, filterBy) {
  let { body = '', isRead = null } = filterBy;

  let filteredEmails = emails.filter((email) => {
    let filters = [];

    if (isRead !== null) {
      filters.push(email.isRead === isRead);
    }

    if (body) {
      filters.push(email.body.toLowerCase().includes(body.toLowerCase()));
    }

    const isFiltersMatched = filters.every((filter) => Boolean(filter));
    return isFiltersMatched;
  });

  return filteredEmails;
}

function sentizeFilterBy(filterBy) {
  const senitizedFilterBy = { ...filterBy };

  for (const [field, value] of Object.entries(filterBy)) {
    if (value === '' || value === null) {
      delete senitizedFilterBy[field];
    }
  }
  return senitizedFilterBy;
}

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
