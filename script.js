const myLibrary = [];

class Book {
    constructor(title, author, pages, status) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.status = status;
    }
}

const bookContainer = document.querySelector(".book-container-inner");
let i = 1; // used to name toggle id
function addBookToLibrary(book) {
    const article = document.createElement("article");
    article.classList.add("book");

    const heading = document.createElement("h4");
    heading.classList.add("book-title");
    heading.textContent = book.title;
    article.appendChild(heading);

    const authorDiv = document.createElement("div");
    const authorLabel = document.createElement("p");
    const author = document.createElement("p");
    authorLabel.textContent = "Author:";
    author.textContent = book.author;
    authorDiv.appendChild(authorLabel);
    authorDiv.appendChild(author);
    article.appendChild(authorDiv);

    const pagesDiv = document.createElement("div");
    const pagesLabel = document.createElement("p");
    const pages = document.createElement("p");
    pagesLabel.textContent = "Pages:";
    pages.textContent = book.pages;
    pagesDiv.appendChild(pagesLabel);
    pagesDiv.appendChild(pages);
    article.appendChild(pagesDiv);

    const statusDiv = document.createElement("div");
    const statusLabel = document.createElement("p");
    const status = document.createElement("p");
    statusLabel.textContent = "Status:";
    if (book.status == 0) {
        status.textContent = "Not read yet";
    } else if (book.status == 1) {
        status.textContent = "Finished";
    }
    statusDiv.appendChild(statusLabel);
    statusDiv.appendChild(status);
    article.appendChild(statusDiv);

    const switchDiv = document.createElement("div");
    const toggle = document.createElement("input");
    toggle.setAttribute("type", "checkbox");
    const toggleID = "toggle" + i;
    i++;
    toggle.setAttribute("id", toggleID);
    const toggleLabel = document.createElement("label");
    toggleLabel.setAttribute("for", toggleID);
    toggleLabel.textContent = "Toggle";
    const switchLabel = document.createElement("p");
    if (book.status == 0) {
        toggle.checked = false;
        switchLabel.textContent = "Not read";
    } else if (book.status == 1) {
        toggle.checked = true;
        switchLabel.textContent = "Read";
    }
    toggle.addEventListener("change", function () {
        if (toggle.checked === true) {
            switchLabel.textContent = "Read";
            status.textContent = "Finished";
            book.status = 1;
        } else {
            switchLabel.textContent = "Not read";
            status.textContent = "Not read yet";
            book.status = 0;
        }
    });
    switchDiv.appendChild(toggle);
    switchDiv.appendChild(toggleLabel);
    switchDiv.appendChild(switchLabel);
    article.appendChild(switchDiv);

    const controlsDiv = document.createElement("div");
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.setAttribute("type", "button");
    removeBtn.setAttribute("data-index", myLibrary.length - 1);
    removeBtn.classList.add("removeBtn");
    removeBtn.addEventListener("click", () => {
        myLibrary.splice(removeBtn.getAttribute("data-index"), 1);
        bookContainer.textContent = "";
        myLibrary.forEach(function (book) {
            addBookToLibrary(book);
        });
    });
    controlsDiv.appendChild(removeBtn);
    article.appendChild(controlsDiv);

    bookContainer.appendChild(article);
}

const book = new Book("The Hobbit", "J.R.R. Tolkien", 295, 0);
myLibrary.push(book);
myLibrary.forEach(function (book) {
    addBookToLibrary(book);
});

const newBook = document.querySelector(".newBook");
const dialog = document.querySelector("dialog");
newBook.addEventListener("click", () => {
    dialog.showModal();
});

const confirmBtn = document.querySelector(".confirmBtn");
const inputs = document.querySelectorAll("dialog input");
const checkBox = document.querySelector("#status");
confirmBtn.addEventListener("click", () => {
    for (const input of inputs) {
        if (!input.checkValidity()) {
            return;
        }
    }

    if (checkBox.checked) {
        const book = new Book(
            document.querySelector("#title").value,
            document.querySelector("#author").value,
            document.querySelector("#pages").value,
            1
        );
        myLibrary.push(book);
        addBookToLibrary(book);
    } else {
        const book = new Book(
            document.querySelector("#title").value,
            document.querySelector("#author").value,
            document.querySelector("#pages").value,
            0
        );
        myLibrary.push(book);
        addBookToLibrary(book);
    }
});

const clearBtn = document.querySelector(".clearBtn");
const form = document.querySelector("form");
clearBtn.addEventListener("click", () => {
    form.reset();
});
