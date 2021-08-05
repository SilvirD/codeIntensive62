import { styleInLine } from "./style.js";

class basic2 extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });

    this.props = {
      avatar: "",
      href: "",
      name: "",
      age: "",
      time: "",
      view: "",
      id: "",
    };
  }

  connectedCallback() {
    //mounting
    let arg = this.props.name;
    arg = arg.replace(/\s/g, "-");

    const inner = `
        ${styleInLine}
        <div class="card">
                <div class="image pull-left col-5 m-0 pl-0">
                  <img
                    src="${this.props.avatar}"
                    alt=""
                  />
                </div>
                <div class="content pull-left col-7">
                  <div>
                    <h6 class="title">
                      <a href="movie-intro.html?fn=${arg}">${this.props.name}</a>
                    </h6>
                    <div class="desc_movie d-flex align-items-center my-2">
                      <div class="badge badge-secondary mr-2">${this.props.age}+</div>
                      <span class="text-white" style="font-weight: bold"
                        >${this.props.time}</span
                      >
                    </div>
                    <div>Views: <span>${this.props.view}</span></div>
                    <br>
                  </div>
                  <div class="Btn row m-0">
                    <span class="btnPlay btn-hover p-1"
                      ><i class="fa fa-play mr-1" aria-hidden="true"></i> Play
                      Now</span
                    >
                    <span class="btnUnfollow btn-hover p-1"
                      ><i id="${this.props.id}" class="fa fa-close mr-1" aria-hidden="true"></i>
                      UnFollow</span
                    >
                  </div>
                </div>
              </div>
    `;
    this.shadow.innerHTML += inner;

    let playButton = this.shadow.querySelector(`.btnPlay`);
    let unFollowButton = this.shadow.querySelector(`.btnUnfollow`);
    let shadowChild = this.shadow.getElementById(`${this.props.id}`);

    playButton.onclick = () => {
      let dirURL = "movie-watch.html" + `?fn=${arg}`;
      // window.location.replace(dirURL);

      const film = firebase.firestore().collection("films").doc(shadowChild.id);
      film.update({
        view: firebase.firestore.FieldValue.increment(1),
      });

      window.location.href = dirURL;
    };

    // ------------------ unfollow film --------------------------
    let IDfilm = "";
    async function listFilms() {
      try {
        unFollowButton.onclick = () => {
          console.log("object");
          if (emailLogin == null) {
            Swal.fire({
              icon: "warning",
              title: "Please log in to use this feature!",
            });
          } else {
            IDfilm = shadowChild.id;
            // console.log(IDfilm);
            unFollowedFilms();
          }
        };
      } catch (error) {
        console.log(error);
      }
    }
    listFilms();
    async function unFollowedFilms() {
      try {
        let id = await firebase
          .firestore()
          .collection("users")
          .where("email", "==", emailLogin)
          .get();

        if (id.docs[0].data().listFollowedFilm.includes(IDfilm)) {
          Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
          }).then((result) => {
            if (result.isConfirmed) {
              async function removeFilm() {
                await firebase
                  .firestore()
                  .collection("users")
                  .doc(id.docs[0].id)
                  .update({
                    listFollowedFilm:
                      firebase.firestore.FieldValue.arrayRemove(IDfilm),
                  });
              }
              removeFilm();
              Swal.fire({
                title: "Deleted!",
                text: "Deleted.",
                icon: "success",
              }).then((result) => {
                if (result.isConfirmed) {
                  location.reload();
                }
              });
            }
          });
        } else {
          Swal.fire({
            icon: "warning",
            title: "Not in the list!",
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  static get observedAttributes() {
    return ["avatar", "href", "name", "age", "time", "view", "id"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (newValue) {
      this.props[name] = newValue;
    }
    // console.log(this.props);
  }

  disconnectedCallback() {
    // console.log("Unmouting");
  }
}

customElements.define("basic2-para", basic2);
