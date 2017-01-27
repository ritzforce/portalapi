//Export one common metadata file, used for all objects
// import user from './user';
// import account from './account';
// import announcement from './announcement';
// import workOrder from './workOrder';
// import product from './product';
let displayTabs = require('./displayTabs');
let account = require('./account');
let contact = require('./contact');
let opportunity = require('./opportunity');
let product = require('./product');
let announcement = require('./announcement');

//Create One Single Object to retrieve all metadata stored in this folder
/*
const metadata = {
  displayTabs: displayTabs,
  user: user,
  account: account,
  announcement: announcement,
  workOrder: workOrder,
  product: product,
}
*/

const metadata = {
  account: account,
  contact: contact,
  opportunity: opportunity,
  product: product,
  announcement: announcement,
  displayTabs: displayTabs,
}

console.log('***metadata***', metadata);

module.exports =  metadata;

