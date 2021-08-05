import { MD5 } from "./md5.js";

// input
const username = document.getElementById("username");
const phone = document.getElementById("phone");
const email = document.getElementById("email");
const password = document.getElementById("password");
const rePassword = document.getElementById("rePassword");

// button
const btnSignup = document.getElementById("btnSignup");
const btnLogin = document.getElementById("btnLogin");

const REGEX_PHONE =
  /^\+?\d{1,3}?[- .]?\(?(?:\d{2,3})\)?[- .]?\d\d\d[- .]?\d\d\d\d$/;
const REGEX_EMAIL =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

window.onload = () => {
  console.log(firebase.app().name);
};

/**
 * Function get accounts by email
 * @param {*} value : email
 */
async function checkExitEmail(value) {
  try {
    const data = await firebase
      .firestore()
      .collection("users")
      .where("email", "==", value)
      .get();

    return data;
  } catch (error) {
    swal({
      title: `${error.code} - ${error.message}`,
      type: "warning",
      showCancelButton: false,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Ok",
      closeOnConfirm: false,
      closeOnCancel: false,
    });
  }
}

/**
 * Create user infor
 * @param {*} userInfo
 */
async function createAccount() {
  try {
    const response = await checkExitEmail(email.value);
    if (response.docs.length > 0) {
      swal(
        {
          title: `Registered email! Back to login?`,
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#f8c086",
          confirmButtonText: "Ok",
          cancelButtonText: "Không",
          closeOnConfirm: false,
          closeOnCancel: true,
        },
        function (isConfirm) {
          if (isConfirm) {
            location.href = "./login.html";
          }
        }
      );
    } else if (
      username.value.trim() == "" ||
      phone.value.trim() == "" ||
      email.value.trim() == "" ||
      password.value.trim() == "" ||
      rePassword.value.trim() == ""
    ) {
      swal({
        title: "Please fill in all required form fields!",
        type: "warning",
        showCancelButton: false,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Ok",
        closeOnConfirm: false,
        closeOnCancel: false,
      });
    } else if (password.value.trim() != rePassword.value.trim()) {
      swal({
        title: "Re-password incorrect!",
        type: "warning",
        showCancelButton: false,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Ok",
        closeOnConfirm: false,
        closeOnCancel: false,
      });
    } else if (phone.value.trim() != "" && !phone.value.match(REGEX_PHONE)) {
      swal({
        title: "Invalid phone number!",
        type: "warning",
        showCancelButton: false,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Ok",
        closeOnConfirm: false,
        closeOnCancel: false,
      });
    } else if (email.value.trim() != "" && !email.value.match(REGEX_EMAIL)) {
      swal({
        title: "Invalid email!",
        type: "warning",
        showCancelButton: false,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Ok",
        closeOnConfirm: false,
        closeOnCancel: false,
      });
    } else if (
      phone.value.trim() != "" &&
      phone.value.match(REGEX_PHONE) &&
      email.value.trim() != "" &&
      email.value.match(REGEX_EMAIL)
    ) {
      const userDone = await firebase
        .firestore()
        .collection("users")
        .add({
          userName: username.value,
          phoneNumber: phone.value,
          email: email.value,
          avatar: "./images/user/user.jpg",
          passWord: MD5(password.value),
          listFollowedFilm: [],
        });
      firebase
        .auth()
        .createUserWithEmailAndPassword(email.value, MD5(password.value))
        .then((data) => {
          return firebase.auth().currentUser.sendEmailVerification();
        })
        .then(() => {
          swal(
            {
              title: "Sign up success!",
              type: "success",
              showCancelButton: false,
              confirmButtonColor: "#40f756",
              confirmButtonText: "Ok",
              closeOnConfirm: false,
              closeOnCancel: false,
            },
            function (isConfirm) {
              if (isConfirm) {
                location.href = "./login.html";
              }
            }
          );
        });
    } else {
      swal({
        title: `Something went wrong!`,
        type: "warning",
        showCancelButton: false,
        confirmButtonColor: "#f8c086",
        confirmButtonText: "Ok",
        closeOnConfirm: false,
        closeOnCancel: false,
      });
    }
  } catch (error) {
    swal({
      title: `${error.code} - ${error.message}`,
      type: "warning",
      showCancelButton: false,
      confirmButtonColor: "#f8c086",
      confirmButtonText: "Ok",
      closeOnConfirm: false,
      closeOnCancel: false,
    });
  }
}

btnSignup.onclick = () => {
  checkExitEmail(email.value);
  createAccount();
};

btnLogin.onclick = () => {
  location.href = "./login.html";
};
