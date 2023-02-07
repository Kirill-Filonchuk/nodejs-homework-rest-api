const { app, PORT } = require("./app");

// const { PORT = 3000 } = process.env;

app.listen(PORT || 3000, () => {
  console.log(`Server running. Use our API on port: ${PORT}`);
});
