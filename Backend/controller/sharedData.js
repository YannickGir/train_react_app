
let sharedEmail = null;

function setSharedEmail(email) {
  sharedEmail = email;
}

function getSharedEmail() {
  return sharedEmail;
}

module.exports = {
  setSharedEmail,
  getSharedEmail,
};
