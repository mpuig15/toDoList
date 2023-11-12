import express from 'express';
import { getTask, getTasks, createTask, deleteTask } from './database.js';
const PORT = process.env.PORT || 8080;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use('/public', express.static('public'));


app.post('/', async (req, res) => {
    const {newTaskInput } = req.body;
    await createTask(newTaskInput, "Miquel");
    res.redirect("/");
  });

app.post('/:taskId/delete', async (req, res) => {
    const { taskId } = req.params;
    await deleteTask(taskId);
    res.redirect("/");
  });
  

app.get('/', async (req, res) => {
    const tasks = await getTasks();
    res.render('index', {tasks : tasks});
})

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
})

app.listen(PORT, () => {
    console.log('Server is running on port 8080'); 
    console.log('hola')
})