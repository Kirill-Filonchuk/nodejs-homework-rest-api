// const fs = require('fs/promises')

// ////////////
const fs = require("fs/promises");

const path = require("path");

const contactsPath = path.join(__dirname, ".", "contacts.json");

async function listContacts() {
  const dataString = await fs.readFile(contactsPath);
  const data = JSON.parse(dataString);
  console.log(data, "read  contacts.json");
  return data;
}

async function getContactById(contactId) {
  const idNormolize = contactId.toString();
  const dataString = await fs.readFile(contactsPath);
  const data = JSON.parse(dataString);
  const findById = data.filter((item) => item.id === idNormolize);
  console.log(findById);
  return findById;
}

async function removeContact(contactId) {
  const idNormolize = contactId.toString();
  const dataString = await fs.readFile(contactsPath);
  const data = JSON.parse(dataString);
  const idxRemuveCont = data.findIndex((item) => item.id === idNormolize);
  if (idxRemuveCont === -1) {
    console.log(`Can not find contact by id #${contactId}`);
    return null;
  }
  const newContactsList = data.filter((item) => item.id !== idNormolize);
  await fs.writeFile(contactsPath, JSON.stringify(newContactsList, null, 2));
  return data[idxRemuveCont];
}

async function addContact(name, email, phone) {
  const id = Math.floor(Date.now() * Math.random()).toString();
  const addContact = { name, email, phone };
  const dataString = await fs.readFile(contactsPath);
  const data = JSON.parse(dataString);
  data.push({ id, ...addContact });
  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
  return data;
}
// ///////////////

// const listContacts = async () => {}

// const getContactById = async (contactId) => {}

// const removeContact = async (contactId) => {}

// const addContact = async (body) => {}

const updateContact = async (contactId, body) => {};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
