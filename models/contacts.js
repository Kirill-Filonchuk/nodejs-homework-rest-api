const fs = require("fs/promises");

const path = require("path");

const contactsPath = path.join(__dirname, ".", "contacts.json");

async function listContacts() {
  const dataString = await fs.readFile(contactsPath);
  const data = JSON.parse(dataString);
  return data;
}

async function getContactById(contactId) {
  const idNormolize = contactId.toString();
  const dataString = await fs.readFile(contactsPath);
  const data = JSON.parse(dataString);
  const findById = data.filter((item) => item.id === idNormolize);
  return findById;
}

async function removeContact(contactId) {
  const idNormolize = contactId.toString();
  const dataString = await fs.readFile(contactsPath);
  const data = JSON.parse(dataString);
  const idxRemuveCont = data.findIndex((item) => item.id === idNormolize);
  if (idxRemuveCont === -1) {
    return null;
  }
  const newContactsList = data.filter((item) => item.id !== idNormolize);
  await fs.writeFile(contactsPath, JSON.stringify(newContactsList, null, 2));
  return data[idxRemuveCont];
}

async function addContact(body) {
  const id = Math.floor(Date.now() * Math.random()).toString();
  const dataString = await fs.readFile(contactsPath);
  const data = JSON.parse(dataString);
  data.push({ id, ...body });
  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
  return { id, ...body };
}

const updateContact = async (contactId, body) => {
  const dataString = await fs.readFile(contactsPath);
  const data = JSON.parse(dataString);
  const idx = data.findIndex((item) => item.id === contactId.toString());
  if (idx < 0) {
    return;
  }
  const newData = { ...data[idx], ...body };
  data.splice(idx, 1, newData);
  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
  return newData;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
