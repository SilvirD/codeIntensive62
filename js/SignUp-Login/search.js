const link = (str) => {
  str = str.replace(/\s/g, "-");
  // console.log(str);
  return str;
};

let searchInpWEB = document.getElementById("searchInpWEB");
let form = document.getElementById("searchFormWEB");

searchInpWEB.onkeyup = (e) => {
  if (e.key === "Enter" || e.keycode === 13) {
    let param = link(searchInpWEB.value);
    window.location.href = `./search.html?kw=${param}`;
    localStorage.setItem("kw", searchInpWEB.value);
  }
};
// ----------------- genres ---------------------------
let anime = document.getElementById("anime");
let action = document.getElementById("action");
let comedy = document.getElementById("comedy");
let drama = document.getElementById("drama");
let romance = document.getElementById("romance");
let fantasy = document.getElementById("fantasy");
let mystery = document.getElementById("mystery");
let thriller = document.getElementById("thriller");

anime.onclick = () => {
  window.location.href = `./movie-category.html?genres=anime`;
  localStorage.setItem("genres", "Animation");
};
action.onclick = () => {
  window.location.href = `./movie-category.html?genres=action`;
  localStorage.setItem("genres", "Action");
};
comedy.onclick = () => {
  window.location.href = `./movie-category.html?genres=comedy`;
  localStorage.setItem("genres", "Comedy");
};
drama.onclick = () => {
  window.location.href = `./movie-category.html?genres=drama`;
  localStorage.setItem("genres", "Drama");
};
romance.onclick = () => {
  window.location.href = `./movie-category.html?genres=romance`;
  localStorage.setItem("genres", "Romance");
};
fantasy.onclick = () => {
  window.location.href = `./movie-category.html?genres=fantasy`;
  localStorage.setItem("genres", "Fantasy");
};
mystery.onclick = () => {
  window.location.href = `./movie-category.html?genres=mystery`;
  localStorage.setItem("genres", "Mystery");
};
thriller.onclick = () => {
  window.location.href = `./movie-category.html?genres=thriller`;
  localStorage.setItem("genres", "Thriller");
};
