const admin = require('firebase-admin');

const credFile = process.env.Svc_Cred_File || "./f.json";

var serviceAccount = require(credFile);

admin.firestore.FieldValue.serverTimestamp();

module.exports = { 
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://mini-bbb5b.firebaseio.com"
 };
