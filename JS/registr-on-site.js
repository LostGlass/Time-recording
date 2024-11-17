var inputLogin = document.getElementById("input_login");
var inputPassword = document.getElementById("input_password");
var inputMail = document.getElementById("input_mail");
var buttonRegistrSitId = document.getElementById("button_registr_site");
var allInput = document.getElementById(
  "input_login",
  "input_password",
  "input_mail"
);
///////////////////////

try {
  async function sendingUserRegistrationDataToTheServer() {
    function DataUsersObject() {
      (this.username = inputLogin.value),
        (this.userpassword = inputPassword.value),
        (this.usermail = inputMail.value);
    }

    const dataUsersObject = new DataUsersObject();
    const response = await fetch("http://localhost:2000/server/registration", {
      method: "POST",
      body: JSON.stringify(dataUsersObject),
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "default",
    });

    var json = await response.json();
    return alert(json.massage);
  }

  buttonRegistrSitId.addEventListener("click", () => {
    sendingUserRegistrationDataToTheServer();
  });

  inputLogin.addEventListener("keydown", e => {
    if (e.keyCode == 13) {
      console.log("enter!");
      sendingUserRegistrationDataToTheServer();
    }
  });

  inputPassword.addEventListener("keydown", e => {
    if (e.keyCode == 13) {
      sendingUserRegistrationDataToTheServer();
      console.log("sdg");
    }
  });

  inputMail.addEventListener("keydown", e => {
    if (e.keyCode == 13) {
      sendingUserRegistrationDataToTheServer();
      console.log("sdg");
    }
  });
} catch (e) {
  console.log(e);
}

// buttonItems.forEach((buttonItem) => buttonItem.addEventListener('click', (e) => e.preventDefault());
