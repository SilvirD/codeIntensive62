// ---------input----------------------
const filmName = document.getElementById("filmName");
const description = document.getElementById("description");
const linkFilm = document.getElementById("linkFilm");
const linkPoster = document.getElementById("linkPoster");
const linkBanner = document.getElementById("linkBanner");

const releaseYear = document.getElementById("releaseYear");
const filmGenre = document.getElementById("filmGenre");
const country = document.getElementById("country");
const filmDirector = document.getElementById("filmDirector");
const filmActor = document.getElementById("filmActor");
const filmAge = document.getElementById("filmAge");
const duraction = document.getElementById("duraction");

// ---------------------- btnAddFilm---------------------
const btnAddFilm = document.getElementById("btnAddFilm");
const btnSignin = document.getElementById("btnLogin");

btnLogin.onclick = () => {
  location.href = "./login.html";
};

btnAddFilm.onclick = async () => {
  //   console.log(`name: ` + filmName.value);
  //   console.log(`description: ` + description.value);
  //   console.log(`linkFilm: ` + linkFilm.value);
  //   console.log(`linkPoster: ` + linkPoster.value);
  //   console.log(`linkBanner: ` + linkBanner.value);
  //   console.log(`releaseYear: ` + releaseYear.value);
  //   console.log(`filmGenre: ` + filmGenre.value);
  //   console.log(`country: ` + country.value);
  //   console.log(`filmDirector: ` + filmDirector.value);
  //   console.log(`filmActor: ` + filmActor.value);
  //   console.log(`filmAge: ` + filmAge.value);
  //   console.log(`duraction: ` + duraction.value);

  //   console.log(filmGenre.value.split(", "));

  //   --------------- genre ------------------
  let listGenreBefore = filmGenre.value.split(", ");
  let listGesreAfter = [];
  for (let i = 0; i < listGenreBefore.length; i++) {
    listGesreAfter.push(
      listGenreBefore[i].charAt(0).toUpperCase() + listGenreBefore[i].slice(1)
    );
  }
  //   console.log(listGesreAfter);
  //   ---------------- end Genre -----------

  //   -------------- Director ---------------
  let listDirectorBefore = filmDirector.value.split(", ");
  let listDirectorAfter = [];
  for (let i = 0; i < listDirectorBefore.length; i++) {
    listDirectorAfter.push(
      listDirectorBefore[i].charAt(0).toUpperCase() +
        listDirectorBefore[i].slice(1)
    );
  }
  class objDirector {
    constructor(directorName, gender) {
      this.directorName = directorName;
      this.gender = gender;
    }
  }
  const listDirector = [];
  const Director = new objDirector();
  for (let i = 0; i < listDirectorAfter.length; i++) {
    Director.directorName = listDirectorAfter[i];
    Director.gender = "Unknow";

    listDirector.push(Director);
    // console.log(Director);
  }
  console.log("--------------");
  console.log(listDirector);
  // ----------------- end Director --------------------

  //   ----------------- actor ---------------------------
  let listActorBefore = filmActor.value.split(", ");
  let listActorAfter = [];
  for (let i = 0; i < listActorBefore.length; i++) {
    listActorAfter.push(
      listActorBefore[i].charAt(0).toUpperCase() + listActorBefore[i].slice(1)
    );
  }
  class objActor {
    constructor(actorName, actorGender) {
      this.actorName = actorName;
      this.actorGender = actorGender;
    }
  }
  const listActor = [];
  const Actor = new objActor();
  for (let i = 0; i < listActorAfter.length; i++) {
    Actor.actorName = listActorAfter[i];
    Actor.actorGender = "Unknow";

    listActor.push(Actor);
    // console.log(Director);
  }
  console.log("--------------");
  console.log(listActor);
  // --------------- end actor ---------------------------

  try {
    await firebase.firestore().collection("films").add({
      filmName: filmName.value,
      imageURL: linkPoster.value,
      banner: linkBanner.value,
      releaseYear: releaseYear.value,
      description: description.value,
      filmStatus: "active",
      genre: listGesreAfter, // array - done
      country: country.value,
      directors: listDirector, // array
      actors: listActor, // array
      view: "0",
      vote: "0",
      age: filmAge.value,
      href: linkFilm.value,
      time: duraction.value,
      comment_ids: [],
      createdAt: new Date(),
    });
    console.log("done");
  } catch (error) {
    // helper.alertError(`${error.code} - ${error.message}`);
    console.log(error);
  }
};
