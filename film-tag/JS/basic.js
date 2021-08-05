import { styleInLine } from "./style.js";

class basic extends HTMLElement {
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
        <li class="slide-item">
          <div class="block-images position-relative">
            <div class="img-box">
                <img src="${this.props.avatar}" class="img-fluid" alt="" style="height: 170px; width: -webkit-fill-available;">
            </div>
            <div class="block-description">
                <h6 class="iq-title">
                  <a href="movie-intro.html?fn=${arg}">${this.props.name}</a>
                </h6>
                <div class="movie-time d-flex align-items-center my-2">
                  <div class="badge badge-secondary p-1 mr-2">${this.props.age}+</div>
                  <span class="text-white">${this.props.time}</span>
                </div>
                <div class="hover-buttons btnPlay">
                  <span class="btn btn-hover iq-button">
                  <i class="fa fa-play mr-1" aria-hidden="true"></i>
                  Play Now
                  </span>
                </div>
            </div>

            <div class="block-social-info">
                <ul class="list-inline p-0 m-0 music-play-lists">
                    <li class="share">
                      <span><i class="ri-share-fill"></i></span>
                      <div class="share-box">
                          <div class="d-flex align-items-center">
                            <a href="https://www.facebook.com/sharer?u=${this.props.href}"><i class="fab fa-facebook-f"></i></a>
                            <a href="https://twitter.com/intent/tweet?text=Currentlyreading" target="_blank" rel="noopener noreferrer" class="share-ico" tabindex="0"><i class="ri-twitter-fill"></i></a>
                      </div>
                    </li>
                    <li>
                        <span><i class="fas fa-eye"></i></span>
                        <span class="count-box">${this.props.view}</span>
                    </li>
                  <li><span><i class="ri-add-line" id="${this.props.id}"></i></span></li>
                </ul>
            </div>
          </div>
        </li>
    `;

    this.shadow.innerHTML += inner;
    var shadowChild = this.shadow.getElementById(`${this.props.id}`);
    let playButton = this.shadow.querySelector(`.btnPlay`);

    playButton.onclick = () => {
      let dirURL = "movie-watch.html" + `?fn=${arg}`;
      // window.location.replace(dirURL);

      const film = firebase.firestore().collection("films").doc(shadowChild.id);
      film.update({
        view: firebase.firestore.FieldValue.increment(1),
      });

      window.location.href = dirURL;
    };
    // console.log(shadowChild);
    // ---------------------- Add follow film ----------------------------
    let IDfilm = "";
    async function listFilms() {
      try {
        shadowChild.onclick = () => {
          if (emailLogin == null) {
            swal({
              title: `Please log in to use this feature!`,
              type: "warning",
              showCancelButton: false,
              confirmButtonColor: "#f8c086",
              confirmButtonText: "Ok",
              closeOnConfirm: false,
              closeOnCancel: false,
            });
          } else {
            IDfilm = shadowChild.id;
            // console.log(IDfilm);
            addFollowedFilms();
          }
        };
      } catch (error) {
        console.log(error);
      }
    }
    listFilms();
    async function addFollowedFilms() {
      try {
        let id = await firebase
          .firestore()
          .collection("users")
          .where("email", "==", emailLogin)
          .get();

        if (id.docs[0].data().listFollowedFilm.includes(IDfilm)) {
          swal({
            title: "Already on the list!",
            type: "warning",
            showCancelButton: false,
            confirmButtonColor: "#40f756",
            confirmButtonText: "Ok",
            closeOnConfirm: false,
            closeOnCancel: false,
          });
        } else {
          const user = await firebase
            .firestore()
            .collection("users")
            .doc(id.docs[0].id)
            .update({
              listFollowedFilm:
                firebase.firestore.FieldValue.arrayUnion(IDfilm),
            });
          swal({
            title: "Added success!",
            type: "success",
            showCancelButton: false,
            confirmButtonColor: "#40f756",
            confirmButtonText: "Ok",
            closeOnConfirm: false,
            closeOnCancel: false,
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

customElements.define("basic-para", basic);
