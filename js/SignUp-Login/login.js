import { MD5 } from "./md5.js";

const email = document.getElementById("email");
const password = document.getElementById("password");

const btnLogin = document.getElementById("btnSignin");
const sigup = document.getElementById("btnSignup");

btnLogin.onclick = () => {
  if (typeof Storage !== "undefined") {
    localStorage.setItem("emailLogin", email.value);
  } else {
    swal({
      title: "Your browser does not support localStorage!",
      type: "warning",
      showCancelButton: false,
      confirmButtonColor: "#f8c086",
      confirmButtonText: "Ok",
      closeOnConfirm: false,
      closeOnCancel: false,
    });
  }
  firebase
    .auth()
    .signInWithEmailAndPassword(email.value, MD5(password.value))
    .then((userCredential) => {
      const user = userCredential.user;

      if (user.emailVerified == true) {
        swal(
          {
            title: "Sign in Success!",
            type: "success",
            showCancelButton: false,
            confirmButtonColor: "#40f756",
            confirmButtonText: "Ok",
            closeOnConfirm: true,
            closeOnCancel: false,
          },
          function (isConfirm) {
            if (isConfirm) {
              location.href = "./index.html";
            }
          }
        );
      } else {
        swal({
          title: "Unconfirmed email!",
          type: "warning",
          showCancelButton: false,
          confirmButtonColor: "#f8c086",
          confirmButtonText: "Ok",
          closeOnConfirm: false,
          closeOnCancel: false,
        });
      }
    })
    .catch((error) => {
      swal({
        title: "Incorrect username or password!",
        type: "warning",
        showCancelButton: false,
        confirmButtonColor: "#f8c086",
        confirmButtonText: "Ok",
        closeOnConfirm: false,
        closeOnCancel: false,
      });
    });
};

sigup.onclick = () => {
  location.href = "./signup.html";
};
