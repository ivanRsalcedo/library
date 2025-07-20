const books = [];

const libraryContainer = document.querySelector('.library-container');
const form = document.querySelector('#book-form');
const dialog = document.querySelector('#dialog');
const btnNewBook = document.querySelector('#btn-new-book');
const btnAdd = document.querySelector('#btn-add');
const cancelBtn = document.querySelector('#btn-cancel');

btnNewBook.addEventListener('click', () => dialog.showModal());
cancelBtn.addEventListener('click', () => dialog.close());
form.addEventListener('submit', formSubmit);

class Book {
    constructor(author, title, pages, isRead) {
        this.author = author;
        this.title = title;
        this.pages = pages;
        this.id = crypto.randomUUID();
        this.isRead = isRead;
    }
    toggleRead() {
        this.isRead = !this.isRead;
    }
}

function addBookToLibrary(book) {
    books.push(book);
}

function displayLibrary() {
    libraryContainer.innerHTML = '';
    books.forEach(book => {
        const card = document.createElement('div');
        card.classList.add('book-card');

        const title = document.createElement('h2');
        title.textContent = book.title;

        const author = document.createElement('h6');
        author.textContent = "by " + book.author;

        const id = document.createElement('p');
        id.classList.add('smol', 'push-to-end');
        id.textContent = `(${book.id})`

        const pages = document.createElement('p');
        pages.textContent = book.pages + " pages";

        const bar = document.createElement('div');
        bar.classList.add('bar');

        const isRead = document.createElement('button');
        isRead.classList.add('tag', book.isRead ? 'read' : 'unread');
        isRead.textContent = book.isRead ? 'read' : 'unread';
        isRead.addEventListener('click', () => {
            book.toggleRead();
            displayLibrary();
        });

        const btnRemove = document.createElement('button');
        btnRemove.classList.add('btn-remove-item');
        btnRemove.textContent = 'X';
        btnRemove.addEventListener('click', () => removeBook(book));

        bar.append(title, btnRemove);

        card.append(bar, author, pages, id, isRead);
        libraryContainer.appendChild(card);
    });
}

function removeBook(book) {
    books.splice(books.indexOf(book), 1);
    displayLibrary();
}

function formSubmit(e) {
    e.preventDefault();


    const title = form.elements['title'].value;
    const author = form.elements['author'].value;
    const pages = Number(form.elements['pages'].value);

    if (pages <= 0) {
        alert("Please enter a valid number of pages.");
        return;
    }

    const isRead = form.elements['isRead'].checked;

    const newBook = new Book(author, title, pages, isRead);
    addBookToLibrary(newBook);

    displayLibrary();

    form.reset();
    dialog.close();
}

// placeholders
const book1 = new Book('J.K. Rowling', 'Harry Potter', 309, true);
const book2 = new Book('Herman Melville', 'Moby Dick', 635, false);
const book3 = new Book('C.S. Lewis', 'The Chronicles of Narnia', 767, true);

addBookToLibrary(book1);
addBookToLibrary(book2);
addBookToLibrary(book3);

displayLibrary();