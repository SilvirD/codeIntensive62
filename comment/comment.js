const content = document.getElementById("commentContent");
const cmtList = document.getElementById("comment-section");

let field = document.querySelector("textarea");
let backUp = field.getAttribute("placeholder");
let btn = document.querySelector(".cmtButtons");
let clear = document.getElementById("clear");
let cmtBtn = document.getElementById("commentBtn");
let cmtBox = document.querySelector(".commentBox");

let params = new URL(document.location).searchParams;
let filmNameURL = getArg(params);
// console.log(params);
// console.log(`URL FILM NAME: `, filmNameURL);

function getArg(params) {
  let ID = params.get("fn");
  ID = ID.replace(/-/g, " ");
  return ID;
}

// //*****************EFFECT***************/
field.onfocus = function () {
  this.setAttribute("placeholder", "");
  this.style.borderColor = "rgb(143, 16, 16)";
  cmtBox.style.paddingBottom = "55px";
  btn.style.visibility = "visible";
  btn.style.opacity = "1";
  btn.style.display = "block";
  field.style.height = "100px";
};

field.onblur = function () {
  this.setAttribute("placeholder", backUp);
  this.style.borderColor = "#aaa";
};

const resetCommentField = () => {
  field.value = "";
  cmtBox.style.paddingBottom = "25px";
  btn.style.visibility = "hidden";
  btn.style.opacity = "0";
  btn.style.transition = "0s";
};

clear.onclick = resetCommentField;

// //asdasdsad

async function getCMT() {
  try {
    const userRef = await firebase.firestore().collection("users");

    const userData = await userRef.get();

    const userAcc = await userRef.where("email", "==", emailLogin).get();

    let data = await firebase
      .database()
      .ref("comments/")
      .orderByChild("filmName")
      .equalTo(filmNameURL)
      .on("child_added", (snapshot) => {
        let date = new Date(snapshot.val().created_at);
        userData.docs.forEach((user) => {
          if (user.id === snapshot.val().user_id) {
            cmtList.insertAdjacentHTML(
              "afterbegin",
              `<li>
                      <section id="testimonials">
            
                      <div class="testimonial-box-container">
                        <div class="testimonial-box">
                          <div class="box-top">
                            <!-- Profile -->
                            <div class="profile">
                              <!-- img -->
                              <div class="profile-img"><img src="${
                                user.data().avatar
                              }" alt=""/></div>
            
                              <!-- Username -->
                              <div class="name-user">
                                <strong>${snapshot.val().userName}</strong>
                                <span>${date.toLocaleString()}</span>
                              </div>
                            </div>
                           
                          </div>
            
                          <div id="${
                            snapshot.key
                          }" class="client-comment"><p >${
                snapshot.val().content
              }</p></div>
                        </div>
                      </div>
                    </section>
                      </li>
                        `
            );

            let commentSection = document.getElementById(snapshot.key);
            console.log(commentSection);

            if (userAcc.docs[0].id === snapshot.val().user_id) {
              commentSection.innerHTML += `<i class="editBtn fas fa-pen"></i>`;
            }
          }
        });

        let editBtn = document.getElementsByClassName("editBtn");
        for (let i = 0; i < editBtn.length; i++) {
          editBtn[i].onclick = () => {
            let cmtSec = editBtn[i].parentNode;
            console.log(cmtSec);
            console.log(cmtSec.childNodes);

            const oldCmt = cmtSec.firstChild;
            console.log(oldCmt);

            editBtn[i].hidden = true;

            let newCmt = document.createElement("input");
            newCmt.value = oldCmt.innerHTML;
            let updateBtn = document.createElement("i");
            updateBtn.className = "updateBtn fas fa-check";

            cmtSec.replaceChild(newCmt, cmtSec.childNodes[0]);
            cmtSec.appendChild(updateBtn);

            let updBtn = document.getElementsByClassName("updateBtn");
            console.log(updBtn);

            for (let i = 0; i < updBtn.length; i++) {
              updBtn[i].onclick = () => {
                if (newCmt.value.length > 0) {
                  let parent = updBtn[i].parentNode;
                  console.log(parent);

                  let updateText = document.createTextNode(newCmt.value);
                  parent.replaceChild(updateText, parent.childNodes[0]);
                  parent.removeChild(parent.lastChild);
                  parent.lastChild.hidden = false;

                  var updates = {};
                  updates["comments/" + parent.id + "/content/"] = newCmt.value;
                  firebase.database().ref().update(updates);
                }
              };
            }
          };
        }
      });

    await firebase
      .database()
      .ref("/comments/")
      .on("child_changed", (snapshot) => {
        let text = document.getElementById(snapshot.key);
        console.log(text.childNodes);
        console.dir(text.firstChild);
        text.firstChild.innerHTML = snapshot.val().content;
      });
  } catch (error) {
    console.log(error);
  }
}

async function postComment() {
  try {
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
      if (content.value.length > 0) {
        await createComment();
        // resetCommentField();
      }
    }
  } catch (error) {
    console.log(error);
  }
}

async function createComment() {
  try {
    const userInfo = await firebase
      .firestore()
      .collection("users")
      .where("email", "==", emailLogin)
      .get();

    const userData = userInfo.docs[0];
    // console.log(userData);

    let postListRef = firebase.database().ref("comments/");
    let newPostRef = postListRef.push();
    newPostRef.set({
      content: field.value,
      created_at: firebase.database.ServerValue.TIMESTAMP,
      user_id: userData.id,
      userName: userData.data().userName,
      filmName: filmNameURL,
    });

    console.log("ok");
  } catch (error) {
    console.log(error);
  }
}

cmtBtn.addEventListener("click", postComment);
getCMT();
