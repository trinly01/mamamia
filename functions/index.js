const functions = require("firebase-functions");
const cors = require("cors")({origin: true});
const admin = require("firebase-admin");
admin.initializeApp();


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports = {
  helloWorld: functions.https.onRequest((request, response) => {
    functions.logger.info("Hello logs!", {structuredData: true});
    response.send("Hello from Firebase!");
  }),
  send: functions.https.onRequest((request, response) => {
    cors(request, response, () => {
      functions.logger.info(request, {structuredData: true});
      response.send("Hello from Firebase!", request);

      admin.firestore().collection("messages").add(request.body).then(() => {
        functions.logger.info("Hello logs!", {structuredData: true});
      });
    });
  }),
};
