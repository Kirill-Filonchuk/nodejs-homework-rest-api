const fs = require("fs/promises");

const path = require("path");

const contactsPath = path.join(__dirname, ".", "contacts.json");

const generateId = () => Math.floor(Date.now() * Math.random()).toString();

const updateContacts = async (contacts) =>
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

async function listContacts() {
  const contactsString = await fs.readFile(contactsPath);
  const contacts = JSON.parse(contactsString);
  // console.log(contacts);
  return contacts;
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const result = contacts.find((item) => item.id === contactId);
  return result || null;
  // const idNormolize = contactId.toString();
  // const dataString = await fs.readFile(contactsPath);
  // const data = JSON.parse(dataString);
  // const findById = data.filter((item) => item.id === idNormolize);
  // return findById;
}

async function addContact(body) {
  const contacts = await listContacts();
  // console.log(contacts);
  const { name, email, phone } = body;
  console.log(body);
  const newContact = {
    id: generateId(),
    name,
    email,
    phone,
  };
  // console.log(body);
  contacts.push(newContact);
  await updateContacts(contacts);
  return newContact;
}

async function updateContactById(contactId, data) {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }
  contacts[index] = { contactId, ...data };
  await updateContacts(contacts);
  return contacts[index];
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  console.log(contacts);
  const idxRemuveCont = contacts.findIndex((item) => item.id === contactId);
  console.log(idxRemuveCont);
  if (idxRemuveCont === -1) {
    return null;
  }
  const [result] = contacts.splice(idxRemuveCont, 1);
  await updateContacts(contacts);
  return result;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContactById,
};
