import Films from "./Films.js";
import * as filmData from "./filmData.js";

const addFilmBtn = document.getElementById("addFilmBtn");
const tagRow = document.getElementById("tag-film");
const rowContent = document.getElementById("rowContent");
const rowContent1 = document.getElementById("rowContent1");

/**
 * Create Film
 * @param {*} film
 */
async function addFilms(film) {
  try {
    await firebase.firestore().collection("films").add({
      filmName: film.filmName,
      imageURL: film.imageURL,
      banner: film.banner,
      releaseYear: film.releaseYear,
      description: film.description,
      filmStatus: film.filmStatus,
      genre: film.genre,
      country: film.country,
      directors: film.directors,
      actors: film.actors,
      view: film.view,
      vote: film.vote,
      age: film.age,
      href: film.href,
      time: film.time,
      comment_ids: film.comment_ids,
      createdAt: new Date(),
    });
    console.log("done");
  } catch (error) {
    // helper.alertError(`${error.code} - ${error.message}`);
    console.log(error);
  }
}

// addFilmBtn.onclick = () => {
// // addFilms(filmData.film1);
// // addFilms(filmData.film2);
// // addFilms(filmData.film3);
// // addFilms(filmData.film4);
// // addFilms(filmData.film5);
// // addFilms(filmData.film6);
// // addFilms(filmData.film7);
// addFilms(filmData.film16);
// addFilms(filmData.film17);
// addFilms(filmData.film18);
// };
/**
 * ReadFilm
 * @param {*} film
 */
async function getNewFilms() {
  try {
    const data = await firebase
      .firestore()
      .collection("films")
      .orderBy("createdAt", "desc")
      .limit(4)
      .get();
    // rowContent.style.width = "unset";
    // rowContent.style.display = "flex";
    data.docs.forEach((doc) => {
      if (doc.data().filmStatus === "coming soon") {
        rowContent.insertAdjacentHTML(
          "beforeend",
          `<basic-para class="col-sm-3" style="padding: 0 0 40px 0"
          avatar = "${doc.data().banner}"
          href = "${doc.data().href}"
          name = "${doc.data().filmName}"
          age = "${doc.data().age}"
          time = "COMING SOON"
          view = "${doc.data().view}"
          id = "${doc.id}"
        ></basic-para>`
        );
      } else {
        rowContent.insertAdjacentHTML(
          "beforeend",
          `<basic-para class="col-sm-3" style="padding: 0 0 40px 0"
          avatar = "${doc.data().banner}"
          href = "${doc.data().href}"
          name = "${doc.data().filmName}"
          age = "${doc.data().age}"
          time = "${doc.data().time} min"
          view = "${doc.data().view}"
          id = "${doc.id}"
        ></basic-para>`
        );
      }

      let a = document.getElementById(`${doc.id}`);
      a.id = "";
    });
  } catch (error) {
    console.log(error);
  }
}
getNewFilms();
/**
 * ReadFilm
 * @param {*} film
 */
async function getMostFilms() {
  try {
    const data = await firebase
      .firestore()
      .collection("films")
      .orderBy("view", "desc")
      .limit(4)
      .get();
    // rowContent.style.width = "unset";
    // rowContent.style.display = "flex";
    data.docs.forEach((doc) => {
      // console.log(doc.id, " => ", doc.data().filmName);
      rowContent1.insertAdjacentHTML(
        "beforeend",
        `<basic-para class="col-sm-3" style="padding: 0 0 40px 0"
        avatar = "${doc.data().banner}"
        href = "${doc.data().href}"
        name = "${doc.data().filmName}"
        age = "${doc.data().age}"
        time = "${doc.data().time} min"
        view = "${doc.data().view}"
        id = "${doc.id}"
      ></basic-para>`
      );
      let a = document.getElementById(`${doc.id}`);
      a.id = "";
    });
  } catch (error) {
    console.log(error);
  }
}
getMostFilms();

// -------------------- slide index --------------------------------
// ---------------- s-1
const name1 = document.getElementById("name1");
const age1 = document.getElementById("age1");
const time1 = document.getElementById("time1");
const desc1 = document.getElementById("desc1");
const actor1 = document.getElementById("actor1");
const genre1 = document.getElementById("genre1");
// ---------------- s-2
const name2 = document.getElementById("name2");
const age2 = document.getElementById("age2");
const time2 = document.getElementById("time2");
const desc2 = document.getElementById("desc2");
const actor2 = document.getElementById("actor2");
const genre2 = document.getElementById("genre2");
// ---------------- s-3
const name3 = document.getElementById("name3");
const age3 = document.getElementById("age3");
const time3 = document.getElementById("time3");
const desc3 = document.getElementById("desc3");
const actor3 = document.getElementById("actor3");
const genre3 = document.getElementById("genre3");

// -------------------------------------------
try {
  async function getFilmSlide() {
    const filmData = await firebase
      .firestore()
      .collection("films")
      .where("filmStatus", "==", "coming soon")
      .limit(3)
      .get();
    // console.log(filmData.docs[0].data().genre);

    // ------------------------------------------------------ slide 1 ---------------------------------------
    name1.innerHTML += filmData.docs[0].data().filmName;
    age1.innerHTML += filmData.docs[0].data().age + `+`;
    time1.innerHTML += filmData.docs[0].data().filmStatus.toUpperCase();
    desc1.innerHTML += filmData.docs[0].data().description;
    // ---------------- actor ---------------------------
    if (filmData.docs[0].data().actors.length > 0) {
      if (filmData.docs[0].data().actors.length > 3) {
        for (let i = 0; i < 3; i++) {
          if (i < 2) {
            actor1.innerHTML +=
              filmData.docs[0].data().actors[i].actorName + `, `;
          } else {
            actor1.innerHTML += filmData.docs[0].data().actors[i].actorName;
          }
        }
      } else {
        for (let i = 0; i < filmData.docs[0].data().actors.length; i++) {
          if (i < filmData.docs[0].data().actors.length - 1) {
            actor1.innerHTML +=
              filmData.docs[0].data().actors[i].actorName + `, `;
          } else {
            actor1.innerHTML += filmData.docs[0].data().actors[i].actorName;
          }
        }
      }
    } else if (filmData.docs[0].data().actors.length < 1) {
      actor1.innerHTML += "Unknow";
    }
    // ----------------- genre --------------------------
    if (filmData.docs[0].data().genre.length > 0) {
      for (let i = 0; i < filmData.docs[0].data().genre.length; i++) {
        if (i < filmData.docs[0].data().genre.length - 1) {
          genre1.innerHTML += filmData.docs[0].data().genre[i] + `, `;
        } else {
          genre1.innerHTML += filmData.docs[0].data().genre[i];
        }
      }
    } else if (filmData.docs[0].data().genre.length < 1) {
      genre1.innerHTML += "Unknow";
    }
    // --------------- btn --------------------
    let arg1 = filmData.docs[0].data().filmName;
    arg1 = arg1.replace(/\s/g, "-");
    let playButton1 = document.getElementById(`btnPlay1`);
    let intro1 = document.getElementById("intro1");

    playButton1.onclick = () => {
      let dirURL = "movie-watch.html" + `?fn=${arg1}`;
      window.location.href = dirURL;
    };

    intro1.onclick = () => {
      intro1.setAttribute("href", `movie-intro.html?fn=${arg1}`);
    };

    // -------------------------------------
    // const bg1 = document.getElementsByClassName("s-bg-1");
    // for (let i = 0; i < bg1.length; i++) {
    //   bg1[i].setAttribute(
    //     "style",
    //     `background-image: url(${filmData.docs[0].data().banner});`
    //   );
    // }

    // ------------------------------------------------------ slide 2 ---------------------------------------
    name2.innerHTML += filmData.docs[1].data().filmName;
    age2.innerHTML += filmData.docs[1].data().age + `+`;
    time2.innerHTML += filmData.docs[1].data().filmStatus.toUpperCase();
    desc2.innerHTML += filmData.docs[1].data().description;
    // ---------------- actor ---------------------------
    if (filmData.docs[1].data().actors.length > 0) {
      if (filmData.docs[1].data().actors.length > 3) {
        for (let i = 0; i < 3; i++) {
          if (i < 2) {
            actor2.innerHTML +=
              filmData.docs[1].data().actors[i].actorName + `, `;
          } else {
            actor2.innerHTML += filmData.docs[1].data().actors[i].actorName;
          }
        }
      } else {
        for (let i = 0; i < filmData.docs[1].data().actors.length; i++) {
          if (i < filmData.docs[1].data().actors.length - 1) {
            actor2.innerHTML +=
              filmData.docs[1].data().actors[i].actorName + `, `;
          } else {
            actor2.innerHTML += filmData.docs[1].data().actors[i].actorName;
          }
        }
      }
    } else if (filmData.docs[1].data().actors.length < 1) {
      actor2.innerHTML += "Unknow";
    }
    // ----------------- genre --------------------------
    if (filmData.docs[1].data().genre.length > 0) {
      for (let i = 0; i < filmData.docs[1].data().genre.length; i++) {
        if (i < filmData.docs[1].data().genre.length - 1) {
          genre2.innerHTML += filmData.docs[1].data().genre[i] + `, `;
        } else {
          genre2.innerHTML += filmData.docs[1].data().genre[i];
        }
      }
    } else if (filmData.docs[1].data().genre.length < 1) {
      genre2.innerHTML += "Unknow";
    }
    // --------------- btn --------------------
    let arg2 = filmData.docs[1].data().filmName;
    arg2 = arg2.replace(/\s/g, "-");
    let playButton2 = document.getElementById(`btnPlay2`);
    let intro2 = document.getElementById("intro2");

    playButton2.onclick = () => {
      let dirURL = "movie-watch.html" + `?fn=${arg2}`;
      window.location.href = dirURL;
    };

    intro2.onclick = () => {
      intro2.setAttribute("href", `movie-intro.html?fn=${arg2}`);
    };

    // -------------------------------------
    // const bg2 = document.getElementsByClassName("s-bg-2");
    // for (let i = 0; i < bg2.length; i++) {
    //   bg2[i].setAttribute(
    //     "style",
    //     `background-image: url(${filmData.docs[1].data().banner});`
    //   );
    // }

    // ------------------------------------------------------ slide 3 ---------------------------------------
    name3.innerHTML += filmData.docs[2].data().filmName;
    age3.innerHTML += filmData.docs[2].data().age + `+`;
    time3.innerHTML += filmData.docs[2].data().filmStatus.toUpperCase();
    desc3.innerHTML += filmData.docs[2].data().description;
    // ---------------- actor ---------------------------
    if (filmData.docs[2].data().actors.length > 0) {
      if (filmData.docs[2].data().actors.length > 3) {
        for (let i = 0; i < 3; i++) {
          if (i < 2) {
            actor3.innerHTML +=
              filmData.docs[2].data().actors[i].actorName + `, `;
          } else {
            actor3.innerHTML += filmData.docs[2].data().actors[i].actorName;
          }
        }
      } else {
        for (let i = 0; i < filmData.docs[2].data().actors.length; i++) {
          if (i < filmData.docs[2].data().actors.length - 1) {
            actor3.innerHTML +=
              filmData.docs[2].data().actors[i].actorName + `, `;
          } else {
            actor3.innerHTML += filmData.docs[2].data().actors[i].actorName;
          }
        }
      }
    } else if (filmData.docs[2].data().actors.length < 1) {
      actor3.innerHTML += "Unknow";
    }
    // ----------------- genre --------------------------
    if (filmData.docs[2].data().genre.length > 0) {
      for (let i = 0; i < filmData.docs[2].data().genre.length; i++) {
        if (i < filmData.docs[2].data().genre.length - 1) {
          genre3.innerHTML += filmData.docs[2].data().genre[i] + `, `;
        } else {
          genre3.innerHTML += filmData.docs[2].data().genre[i];
        }
      }
    } else if (filmData.docs[2].data().genre.length < 1) {
      genre3.innerHTML += "Unknow";
    }
    // --------------- btn --------------------
    let arg3 = filmData.docs[2].data().filmName;
    arg3 = arg3.replace(/\s/g, "-");
    let playButton3 = document.getElementById(`btnPlay3`);
    let intro3 = document.getElementById("intro3");

    playButton3.onclick = () => {
      let dirURL = "movie-watch.html" + `?fn=${arg3}`;
      window.location.href = dirURL;
    };

    intro3.onclick = () => {
      intro3.setAttribute("href", `movie-intro.html?fn=${arg3}`);
    };

    // -------------------------------------
    // const bg3 = document.getElementsByClassName("s-bg-3");
    // console.log(bg3);
    // for (let i = 0; i < bg3.length; i++) {
    //   bg3[i].setAttribute(
    //     "style",
    //     `background-image: url(${filmData.docs[2].data().banner});`
    //   );
    // }
    // console.log(bg3);
  }
  getFilmSlide();
} catch (error) {
  console.log(error);
}
