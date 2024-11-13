var inputLogin = document.getElementById("input_login");
var inputPassword = document.getElementById("input_password");
var inputMail = document.getElementById("input_mail");
var buttonRegistrSitId = document.getElementById("button_registr_site");
var forM = document.querySelector("form");
///////////////////////

try {
  buttonRegistrSitId.addEventListener("click", e => {
    //Сделать очищение полей инпут от тени при отправки данных из инпутов//
    e.preventDefault();

    forM.onsubmit = async e => {
      e.preventDefault();

      function DataUsersObject() {
        (this.username = inputLogin.value),
          (this.userpassword = inputPassword.value),
          (this.usermail = inputMail.value);
      }

      const dataUsersObject = new DataUsersObject();
      console.log(dataUsersObject);
      console.log(JSON.stringify(dataUsersObject));

      const response = await fetch(
        "http://localhost:2000/server/registration",
        {
          method: "POST",
          body: JSON.stringify(dataUsersObject),
          mode: "no-cors",
          headers: {
            "Content-Type": "application/json; charset=utf-8",
          },
        }
      );

      var json = await response.text;
      console.log(json);
    };
  });
} catch (e) {
  console.log(e);
}
// username: "inputLogin.value",
//             userpassword: "inputPassword.value",
//             usermail: "inputMail.value",
