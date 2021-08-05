let emailLogin = localStorage.getItem("emailLogin");

// -------------------------- sign in / sign out ---------------------
const signMB = document.getElementById("SignMB");
const signWEB = document.getElementById("SignWEB");
if (emailLogin == null) {
  signMB.innerHTML = "Sign In";
  signWEB.innerHTML = "Sign In";
} else {
  signWEB.innerHTML = "Sign Out";
  signMB.innerHTML = "Sign Out";
}
// -------------------------- Log out --------------------------------
const Logout = document.getElementById("Logout");
Logout.onclick = () => {
  localStorage.removeItem("emailLogin");
};
