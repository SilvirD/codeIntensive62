let params = new URL(document.location).searchParams.get("kw");
params = params.replace(/-/g, " ");

let divResult = document.getElementById("rowContent");
let kwSearch = document.getElementById("kwSearch");

let kw = localStorage.getItem("kw");
kwSearch.innerHTML += ` ` + kw;

let listResult = [];

async function searchFilm() {
  try {
    const searchResult = await firebase
      .firestore()
      .collection("films")
      .orderBy("createdAt", "desc")
      .get();
    // console.log(searchResult.size);
    for (let i = 0; i < searchResult.size; i++) {
      let name = searchResult.docs[i].data().filmName.toLowerCase();
      if (name.search(kw) >= 0) {
        listResult.push(searchResult.docs[i].id);
      }
    }
    for (let i = 0; i < listResult.length; i++) {
      searchResult.docs.forEach((doc) => {
        if (doc.id == listResult[i]) {
          if (doc.data().filmStatus === "coming soon") {
            divResult.insertAdjacentHTML(
              "beforeend",
              `<basic-param style="width: 335px"
              avatar = "${doc.data().banner}"
              href = "${doc.data().href}"
              name = "${doc.data().filmName}"
              age = "${doc.data().age}"
              time = "COMING SOON"
              view = "${doc.data().view}"
              id = "${doc.id}"
            ></basic-param>`
            );
          } else {
            divResult.insertAdjacentHTML(
              "beforeend",
              `<basic-param style="width: 335px"
              avatar = "${doc.data().banner}"
              href = "${doc.data().href}"
              name = "${doc.data().filmName}"
              age = "${doc.data().age}"
              time = "${doc.data().time} min"
              view = "${doc.data().view}"
              id = "${doc.id}"
            ></basic-param>`
            );
          }

          let a = document.getElementById(`${doc.id}`);
          a.id = "";
          console.log(a);
        }
      });
      console.log("----------------------------------------------");
    }
  } catch (error) {
    console.log(error);
  }
}
searchFilm();
