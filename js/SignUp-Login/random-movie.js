let sectionRand = document.getElementById("parallex");
let divRand = document.getElementById("divRandFilm");

const randFilm = await firebase
  .firestore()
  .collection("films")
  .where("filmStatus", "==", "active")
  .get();

const randID = Math.floor(Math.random() * randFilm.size);

// console.log(randFilm.docs[randID].data());

// console.log(divRand);
try {
  sectionRand.setAttribute(
    "style",
    `background: url("${randFilm.docs[randID].data().banner}") center center`
  );
  let arg = randFilm.docs[randID].data().filmName;
  arg = arg.replace(/\s/g, "-");
  divRand.insertAdjacentHTML(
    "beforeend",
    `
        <div
        class="
        row
        align-items-center
        justify-content-center
        h-100
        parallaxt-details
        "
        >
        <div class="col-lg-5 r-mb-23">
        <div class="text-left">
            <a href="movie-intro.html?fn=${arg}" style="width: fit-content">
            <h1
                id="filmTitle"
                class="trending-text big-title text-uppercase mt-0"
                style="
                font-style: italic;
                padding: 0 10px 0 0;
                "
            >
            ${randFilm.docs[randID].data().filmName}
            </h1>
            </a>
            <br>
            <div class="movie-time d-flex align-items-center mb-3">
            <div class="badge badge-secondary mr-3">13+</div>
            <h6 class="text-white">${randFilm.docs[randID].data().time} min</h6>
            </div>
            <p>
            ${randFilm.docs[randID].data().description}
            </p>
            <div class="parallax-buttons btnPlay">
            <a href="#" class="btn btn-hover"
                >Play Now</a
            >
            </div>
        </div>
        </div>
        <div class="col-lg-7">
        <div class="parallax-img">
            <img
                src="${randFilm.docs[randID].data().banner}"
                class="img-fluid w-100"
                alt="${randFilm.docs[randID].data().filmName}"
            />
        </div>
        </div>
    </div>
    `
  );
  let playButton = document.querySelector(`.btnPlay`);

  playButton.onclick = () => {
    let dirURL = "movie-watch.html" + `?fn=${arg}`;
    // window.location.replace(dirURL);
    window.location.href = dirURL;
  };
} catch (error) {
  console.log(error);
}
