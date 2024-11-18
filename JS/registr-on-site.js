var inputLogin = document.getElementById("input_login");
var inputPassword = document.getElementById("input_password");
var inputMail = document.getElementById("input_mail");
var buttonRegistrSitId = document.getElementById("button_registr_site");
var saveOrnot = document.getElementById("save_or_not");
///////////////////////

try {
  async function sendingUserRegistrationDataToTheServer(saveOrnot) {
    if (saveOrnot.classList.contains("yes")) {
      function DataUsersObject() {
        (this.username = inputLogin.value),
          (this.userpassword = inputPassword.value),
          (this.usermail = inputMail.value);
      }

      const dataUsersObject = new DataUsersObject();
      const response = await fetch(
        "http://localhost:2000/server/registration",
        {
          method: "POST",
          body: JSON.stringify(dataUsersObject),
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          cache: "default",
        }
      );

      var json = await response.json();

      var testFunc = response => {
        if (response.status === 200) {
          window.location.href = "http://127.0.0.1:5500/HTML/window-log.html";
        } else {
          alert(json.massage);
        }
      };

      return testFunc(response);
    }
    if (
      confirm(
        "Are you sure you want to continue without saving the data ? Without this you will not be able to use some functions of the site ?"
      )
    ) {
      window.location.href = "http://127.0.0.1:5500/HTML/";
    } else {
    }
  }

  buttonRegistrSitId.addEventListener("click", () => {
    sendingUserRegistrationDataToTheServer(saveOrnot);
  });

  inputLogin.addEventListener("keydown", e => {
    if (e.keyCode == 13) {
      console.log("enter!");
      sendingUserRegistrationDataToTheServer(saveOrnot);
    }
  });

  inputPassword.addEventListener("keydown", e => {
    if (e.keyCode == 13) {
      sendingUserRegistrationDataToTheServer(saveOrnot);
      console.log("sdg");
    }
  });

  inputMail.addEventListener("keydown", e => {
    if (e.keyCode == 13) {
      sendingUserRegistrationDataToTheServer(saveOrnot);
      console.log("sdg");
    }
  });
} catch (e) {
  console.log(e);
}
