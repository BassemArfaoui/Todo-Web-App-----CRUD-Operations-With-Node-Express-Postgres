import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;


//database connection
const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "",//database name
  password: "", //postgres password
  port: 5432,
});
db.connect();


//middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


async function getTodos()
{
  const result = await db.query("SELECT * FROM items");
  return result.rows;
}


async function addTodo(todo)
{
  const result = await db.query("INSERT INTO items (title) VALUES ($1) RETURNING *", [todo]);
  return result.rows;
}


async function deleteTodo(todo_id)
{
  const result = await db.query("DELETE FROM items WHERE id = $1 returning *", [todo_id]);
  return result.rows;
}


async function FindTodo(todo_id)
{
  const result = await db.query("SELECT * FROM items WHERE id = $1", [todo_id]);
  return result.rows;
}


async function editTodo(todo_id, todo)
{
  const result = await db.query("UPDATE items SET title = $1 WHERE id = $2 returning *", [todo, todo_id]);
  return result.rows;
}



app.get('/', async (req,res)=>{
const todos= await getTodos();
res.render("index.ejs",{todos:todos });
});



app.get('/edit/:id',async  (req, res)=>{
  const id = req.params.id;
  try
  {
  const todo = await FindTodo(id);
  if (todo[0]==undefined)
  {
    throw new Error('Todo to edit not found');
  }
  res.render("edit.ejs",{ id : id , todo : todo[0] });
  }
  catch(error)
  {
    console.error(error.message);
    res.render("edit.ejs",{ id : id , error: error.message });

  }
})


app.post('/edit/:id', async (req, res)=>{
    const id = req.params.id;
    const todo=req.body.todo_to_edit ;
    try
    {
      if(todo == '') throw new Error('Todo can not be Empty')
      else 
      {
        try
        {
          const result = await editTodo(id, todo);
          console.log(result);
          res.redirect('/');
        }
        catch(error)
        {
          console.log(error.message);
          const todo = await FindTodo(id);
          res.render("edit.ejs",{ id : id , todo : todo[0] , error : error.message});
        }
      }
    }
    catch(error)
    {
      console.log(error.message);
      const todo = await FindTodo(id);
      res.render("edit.ejs",{ id : id , todo : todo[0] , error : error.message});
    }
  
});


app.post('/',async (req,res)=>
{ 
  console.log(req.body);
  if(req.body.add)
  {
    try{
      const todo = req.body.todo.trim();
      if(todo=='') throw new Error('Empty todo');
      console.log(todo);
      try {
        const result= await addTodo(todo);
        console.log(result);
        res.redirect('/');
      }
      catch(error)
      {       
        console.error(error.message);
        const todos= await getTodos();
        res.render("index.ejs",{todos:todos , error : 'Todo Already Exists', error_color : 'red'});
      }
    }
    catch (error)
    { 
      console.error(error.message);
      const todos= await getTodos();
      res.render("index.ejs",{todos:todos , error : 'Please fill the field with a Todo', error_color : 'red'});
    }
  }

  else if (req.body.delete)
  { 
    try
    {
      const id = req.body.delete;
      const result= await deleteTodo(id);
      console.log(result);
      res.redirect('/');
    }
    catch(error)
    {
      console.error(error.message);
      res.redirect('/');
    }
  }

  else if (req.body.edit)
  {  const id = req.body.edit;
    try 
    {
      res.redirect(`/edit/${id}`); 
    }
    catch(error)
    {
      console.error(error.message);
    }
  }


 
})




app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
