const server = require('express');
const mongoose = require('mongoose');
const Blog = require('./models/blogs');

const app = server();

// Connect to the database
const DB_URI='mongodb+srv://AhmedGebril:Mohamedbob54@cluster0.sneoxz6.mongodb.net/Nodetuts?retryWrites=true&w=majority'
mongoose.connect(DB_URI).then(result=>{
    console.log('Connected to the database');
    app.listen(3000, () => {
    console.log('Server listening on port 3000');
  });}).catch(err=>{console.log(err)})


// Set the view engine to EJS
app.set('view engine', 'ejs');
// Serve static files from the public directory
app.use(server.static(__dirname + '/public'));
app.use(server.urlencoded({extended: true}));

// Render the home page
app.get('/', (req, res) => {
  res.redirect('/blogs')
});


// Render the about page
app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

// get all the blogs
app.get('/blogs',(req, res) => {
Blog.find().then(result=>{
    res.render('index',{title:'blogs',blogs:result})
}).catch(err => console.log(err))
})

// handles post request of the blog
app.post('/blogs',(req,res)=>{
const blog = new Blog({
    title:req.body.title,
    snippet:req.body.snippet,
    body:req.body.body
})
blog.save().then(result=>{
    res.redirect('/blogs')
}).catch(err => console.log(err))
})
// handles single blog page
app.get('/blogs/:id',(req,res)=>{
    const id = req.params.id
    Blog.findById(id).then(result=>{
        res.render('details',{title:result.title,blog:result})
    })
})

// Render the create page
app.get('/blogs/create', (req, res) => {
  res.render('create', { title: 'Create a new blog' });
});

app.delete('/blogs/:id', (req, res) => {
    const id = req.params.id;
    
    Blog.findByIdAndDelete(id)
      .then(result => {
        res.json({ redirect: '/blogs' });
      })
      .catch(err => {
        console.log(err);
      });
  });

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});




