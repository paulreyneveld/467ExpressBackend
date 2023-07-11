const app = require('./app');
const config = require('./utils/config');

app.listen(config.PORT, (req, res) => {
  console.log(`Server is running on port ${config.PORT}`);
});
