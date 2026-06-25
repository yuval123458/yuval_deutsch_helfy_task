const express = require('express');
const cors = require('cors');
const taskRoutes = require('./routes/tasks.js');
const errorHandler = require('./middleware/errorHandler.js');

const app = express();

app.use(cors());
app.use(express.json());


app.use('/api/tasks', taskRoutes);
app.use(errorHandler);


const PORT = 4000;
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
