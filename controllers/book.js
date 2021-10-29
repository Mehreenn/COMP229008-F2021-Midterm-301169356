//Mehreen Abdul Rahman
//301169356
//29-10-2021
//COMP229-008 Midterm

// create a reference to the model
let Book = require('../models/book');

// Gets all books from the Database and renders the page to list all books.
module.exports.bookList = function(req, res, next) {  
    Book.find((err, bookList) => {
        // console.log(bookList);
        if(err)
        {
            return console.error(err);
        }
        else
        {
            res.render('book/list', {
                title: 'Book List', 
                books: bookList
            })            
        }
    });
}

// Gets a book by id and renders the details page.
module.exports.details = (req, res, next) => {
    
    let id = req.params.id;

    Book.findById(id, (err, bookToShow) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //show the edit view
            res.render('book/details', {
                title: 'Book Details', 
                book: bookToShow
            })
        }
    });
}


//function logic that renders the "Add a new Book page" using add_edit.ejs template
//to display add page which can add a new book to database
module.exports.displayAddPage = (req, res, next) => {
    
    let newBook = Book();

    res.render('book/add_edit', {
        title: 'Add a new Book',
        book: newBook
    })

}


//function logic that processes data/book when entered into the database 
module.exports.processAddPage = (req, res, next) => {

    let newBook = Book({
        _id: req.body.id,
        Title: req.body.Title,
        Description: req.body.Description,
        Price: req.body.Price,
        Author: req.body.Author,
        Genre: req.body.Genre
    });

    Book.create(newBook, (err, book) =>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //routes user back to list and refreshes with added changes
            console.log(book);
            res.redirect('/book/list');
        }
    });

}


//function logic to get book using id and renders Edit page (/controllers/add_edit)
module.exports.displayEditPage = (req, res, next) => {
    
    let id = req.params.id;

    Book.findById(id, (err, bookToEdit) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //show the edit view
            res.render('book/add_edit', {
                title: 'Edit Book', 
                book: bookToEdit
            })
        }
    });

}


//function logic processes and updates data/book using id
module.exports.processEditPage = (req, res, next) => {
    
    let id = req.params.id

    let updatedBook = Book({
        _id: req.body.id,
        Title: req.body.Title,
        Description: req.body.Description,
        Price: req.body.Price,
        Author: req.body.Author,
        Genre: req.body.Genre
    });

    Book.updateOne({_id: id}, updatedBook, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //routes user back to list and refreshes with changes
            res.redirect('/book/list');
        }
    });
    
}

//function logic processes delete using id property from database
module.exports.performDelete = (req, res, next) => {
    
    let id = req.params.id;


    Book.remove({_id: id}, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //routes user back to list and refreshes with changes
            res.redirect('/book/list');
        }
    });

}