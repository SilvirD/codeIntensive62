let filmURL = new URL(document.location).searchParams;
let filmName = getArg(filmURL);
// console.log(params);
// console.log(`URL FILM NAME: `, filmName);

function getArg(params) {
  let ID = params.get("fn");
  ID = ID.replace(/-/g, " ");
  return ID;
}

let filmTitle = document.getElementById("filmTitle"); //innerHTML
let filmGenre = document.getElementById("filmGenre"); //list -> insert

//innerHTML
let filmAge = document.getElementById("filmAge");
let filmTime = document.getElementById("filmTime");
let filmYear = document.getElementById("filmYear");

let filmDesc = document.getElementById("filmDesc");

let filmVideo = document.getElementById("filmVideo");

let spanIdFilm = document.getElementById("spanIdFilm");

async function getFilms() {
  try {
    const data = await firebase
      .firestore()
      .collection("films")
      .where("filmName", "==", filmName)
      .get();

    spanIdFilm.setAttribute("id", data.docs[0].id);

    let filmData = data.docs[0].data();
    // console.log(filmData);

    filmTitle.innerHTML = filmData?.filmName || "Unknow";
    filmDesc.innerHTML = filmData?.description || "Unknow";

    filmAge.innerHTML = filmData?.age + "+" || "All age";
    filmTime.innerHTML = filmData?.time + " min" || "Unknow";
    filmYear.innerHTML = filmData?.releaseYear || "Unknow";

    let filmEmbed = filmData.href;
    filmEmbed = filmEmbed.replace(/file/g, "embed");
    filmVideo.src = filmEmbed;

    // console.log(filmData?.directors);

    for (let i = 0; i < filmData.genre.length; i++) {
      filmGenre.insertAdjacentHTML(
        "beforeend",
        ` <li class="text-white">${filmData.genre[i]}</li>`
      );
    }
  } catch (error) {
    console.log(error);
  }
}
getFilms();

// ----------------- more film -------------------------------
let divMoreFilm = document.getElementById("divMoreFilm");
async function moreFilm() {
  const film = await firebase
    .firestore()
    .collection("films")
    .where("filmName", "==", filmName)
    .get();

  // console.log(film.docs[0].data().genre);
  let arrGenres = film.docs[0].data().genre;

  const moreFilm = await firebase
    .firestore()
    .collection("films")
    .where("genre", "array-contains-any", arrGenres)
    .limit(4)
    .get();
  moreFilm.docs.forEach((doc) => {
    divMoreFilm.insertAdjacentHTML(
      "beforeend",
      `
      <basic-param class="col-3 m-0 p-0";"
        avatar = "${doc.data().banner}"
        href = "${doc.data().href}"
        name = "${doc.data().filmName}"
        age = "${doc.data().age}"
        time = "${doc.data().time} min"
        view = "${doc.data().view}"
        id = "${doc.id}"
      ></basic-param>
      `
    );
  });
}
moreFilm();
