// const emailLogin = localStorage.getItem("emailLogin");
var avtWEB = document.getElementById("AvatarWEB");
var avtMB = document.getElementById("AvatarMB");

if (emailLogin == null) {
  avtWEB.setAttribute("src", "./images/user/user.jpg");
  avtMB.setAttribute("src", "./images/user/user.jpg");
} else {
  const userData = await firebase
    .firestore()
    .collection("users")
    .where("email", "==", emailLogin)
    .get();

  const storageRef = userData.docs[0].data().avatar;
  // console.log(storageRef);

  avtWEB.setAttribute("src", storageRef);
  avtMB.setAttribute("src", storageRef);
}
