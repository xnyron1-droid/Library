const myLibrary = [];

function Book(title, author, pages, isRead) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}

Book.prototype.toggleRead = function() {
  this.isRead = !this.isRead;
};

function addBookToLibrary(title, author, pages, isRead) {
  const newBook = new Book(title, author, pages, isRead);
  myLibrary.push(newBook);
  displayBooks(); 
}

function displayBooks() {
  const libraryContainer = document.getElementById('library-container');
  libraryContainer.innerHTML = ''; 

  myLibrary.forEach(book => {
  
    const bookCard = document.createElement('div');
    bookCard.classList.add('book-card');
    
    bookCard.setAttribute('data-id', book.id);
 
    bookCard.innerHTML = `
      <h3>"${book.title}"</h3>
      <p>Oleh: ${book.author}</p>
      <p>${book.pages} Halaman</p>
      <button class="status-btn ${book.isRead ? 'read' : 'not-read'}">
        ${book.isRead ? 'Read' : 'Not Read'}
      </button>
      <button class="remove-btn">Delete</button>
    `;

    bookCard.querySelector('.remove-btn').addEventListener('click', () => {
      removeBook(book.id);
    });

    bookCard.querySelector('.status-btn').addEventListener('click', () => {
      book.toggleRead();
      displayBooks(); 
    });

    libraryContainer.appendChild(bookCard);
  });
}

function removeBook(id) {

  const bookIndex = myLibrary.findIndex(book => book.id === id);
  if (bookIndex !== -1) {
    myLibrary.splice(bookIndex, 1);
  }
  displayBooks(); 
}

const bookForm = document.getElementById('book-form');
const bookDialog = document.getElementById('book-dialog');

bookForm.addEventListener('submit', (event) => {
  event.preventDefault(); 

  
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const pages = document.getElementById('pages').value;
  const isRead = document.getElementById('is-read').checked;


  addBookToLibrary(title, author, pages, isRead);

  bookForm.reset();
  bookDialog.close();
});

addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 295, false);
addBookToLibrary('Atomic Habits', 'James Clear', 320, true);