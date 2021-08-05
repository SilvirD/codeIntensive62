let filmPoster = document.getElementById("filmPoster");
let filmBanner = document.getElementById("filmBanner");
let filmDesc = document.getElementById("filmDesc");
let filmTitle = document.getElementById("filmTitle");
let filmInfo = document.getElementById("filmInformation");

let nameBanner = document.getElementById("nameBanner");
let ageBanner = document.getElementById("ageBanner");
let timeBanner = document.getElementById("timeBanner");

let spanIdFilm = document.getElementById("spanIdFilm");

let playBtn = document.getElementById("playBtn");
let ulActor = document.getElementById("ulActor");

// console.log(filmPoster); //src
// console.log(filmBanner); //src
// console.log(filmDesc); //innerHTML
// console.log(filmTitle); //innerHTML

let params = new URL(document.location).searchParams;
let filmName = getArg(params);
let arg = filmName.replace(/\s/g, "-");
// console.log(params);
// console.log(`URL FILM NAME: `, filmName);

function getArg(params) {
  let ID = params.get("fn");
  ID = ID.replace(/-/g, " ");
  return ID;
}

console.log(filmName);
async function getFilms() {
  try {
    const data = await firebase
      .firestore()
      .collection("films")
      .where("filmName", "==", filmName)
      .get();

    let filmData = data.docs[0].data();

    filmTitle.innerHTML = filmData?.filmName || "None";
    filmDesc.innerHTML = filmData?.description || "None";
    filmPoster.src = filmData?.imageURL || "None";
    filmBanner.src = filmData?.banner || "None";

    nameBanner.innerHTML = filmData?.filmName || "None";
    ageBanner.innerHTML = filmData?.age + " +" || "None";
    timeBanner.innerHTML = filmData?.time + " min" || "None";

    spanIdFilm.setAttribute("id", data.docs[0].id);

    // console.log(filmData?.directors);

    filmInfo.insertAdjacentHTML(
      "beforeend",
      ` <li>Status: <span>${filmData?.filmStatus || "Unknow"}</span></li>
    <li>Director: <span>${
      filmData?.directors[0]?.directorName || "Unknow"
    }</span></li>
    <li>Country: <span>${filmData?.country || "Unknow"}</span></li>
    <li>Release Year: <span>${filmData?.releaseYear || "Unknow"}</span></li>
    <li>Duration: <span>${filmData?.time || "Unknow"} minutes</span></li>
    <li>Genre: <span>${filmData?.genre || "Unknow"}</span></li>
    <li>Views: <span>${filmData?.view || "Unknow"}</span></li>`
    );

    // console.log(filmData.actors.length);
    for (let i = 0; i < filmData.actors.length; i++) {
      let actorNameWiki = filmData.actors[i].actorName.replace(" ", "_");
      ulActor.insertAdjacentHTML(
        "beforeend",
        `
        <li class="col-2 m-0 p-0">
          <span style="text-align: center; width: 100%; height: 160px">
            <img src="${
              filmData?.actors[i].actorImg || "./images/user/user.jpg"
            }" alt="actor" />
            <a href="https://vi.wikipedia.org/wiki/${actorNameWiki}"><p>${
          filmData.actors[i].actorName || "Unknow"
        }</p></a>
          </span>
         </li>
        `
      );
    }
    playBtn.onclick = () => {
      let dirURL = "movie-watch.html" + `?fn=${arg}`;
      // window.location.replace(dirURL);

      const film = firebase
        .firestore()
        .collection("films")
        .doc(data.docs[0].id);
      film.update({
        view: firebase.firestore.FieldValue.increment(1),
      });

      // console.log("tang 1");
      window.location.href = dirURL;
    };
  } catch (error) {
    console.log(error);
  }
}

getFilms();
