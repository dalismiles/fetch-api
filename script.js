const formEl = document.querySelector(".researchBook-form");
const inputEl = formEl.querySelector("input");
const listEl = document.querySelector(".book-list");

const SITE_URL = "https://openlibrary.org";
const BASE_API_URL = "https://openlibrary.org/search.json?q=";

console.log(SITE_URL);
console.log(BASE_API_URL);

formEl.addEventListener("submit", function (event) {
  event.preventDefault();

  const inputValue = inputEl.value;
  const formattedResearch = inputValue.replaceAll(" ", "+");
  const newApiURL = `${BASE_API_URL}/${formattedResearch}`;
  inputEl.value = "";

  console.log("Chiamata verso:", newApiURL);

  fetch(newApiURL)
    .then((res) => res.json())

    .then((json) => {
      console.log(json);

      listEl.innerHTML = json.docs
        .map((doc) => {
          return `<li class=bookListElement> ${doc.title}, written by ${doc.author_name}</li>`;
        })
        .join("");
    })

    .catch((err) => {
      console.error(err);
      listEl.innerHTML = `<li>C'è stato un piccolo errore. Per favore, riavvia la tua ricerca.</li>`;
      return [];
    })

    .finally(() => {
      console.log("A reader lives a thousand lives before he dies");
    });
});
