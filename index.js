(async () => {
  const database = require("./db");

  try {
    await database.sync();
  } catch (error) {
    console.log(error);
  }
})();

require("./app.js");
