window.onload = () => {
  console.log(firebase.app().name);
};

/**
 * Function get accounts by email
 * @param {*} value : email
 */
async function getAccounts(value) {
  try {
    const data = await firebase
      .firestore()
      .collection("accounts")
      .where("email", "==", value)
      .get();

    data.docs.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
    });
  } catch (error) {
    helper.alertError(`${error.code} - ${error.message}`);
  }
}
/**
 * Create user infor
 * @param {*} userInfo
 */
async function createAccount(userInfo) {
  try {
    const userDone = await firebase.firestore().collection("accounts").add({
      firstName: registerForm.firstName.value,
      lastName: registerForm.lastName.value,
      email: registerForm.email.value,
      password: registerForm.password.value,
    });
    helper.alertSuccess("Tạo tài khoản thành công");
  } catch (error) {
    helper.alertError(`${error.code} - ${error.message}`);
  }
}

/**
 * update information of account by id
 * @param {*} userInfo data
 * @param {*} idUpdate id of account
 */
async function updateAccount(userInfo, idUpdate) {
  try {
    const userDone = await firebase
      .firestore()
      .collection("accounts")
      .doc(idUpdate)
      .update({
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        email: userInfo.email,
        password: userInfo.password,
      });
  } catch (error) {
    helper.alertError(`${error.code} - ${error.message}`);
  }
}

async function deleteAccount(idDelete) {
  try {
    await firebase.firestore().collection("accounts").doc(id).delete();

    helper.alertSuccess("Delete thành công");
  } catch (error) {
    helper.alertError(`${error.code} - ${error.message}`);
  }
}
