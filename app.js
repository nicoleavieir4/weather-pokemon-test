const express = require("express");
const server = express();
const port = 3000;

server.get("/pokemon-by-city", (req, res) => {
  const { city } = req.query;
  console.log(req.query)

  return res.json({
    city
  });
});

server.get("/pokemon/:city", (req, res) => {
    const { city } = req.params;
    console.log(req.params)
  
    return res.json({
      city
    });
  });

server.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
