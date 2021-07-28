const inuirer = require('inquirer');
const sql = require('mysql2');
const cTable = require('console.table');

const PORT = process.env.PORT || 3001;
const app = express();


app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // TODO: Add MySQL password here
      password: 'wassup',
      database: 'employees_db'
    },
    console.log(`Connected to the movies_db database.`)
  );







app.use((req, res) => {
    res.status(404).end();
  });
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });