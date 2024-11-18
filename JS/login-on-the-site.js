var inputLogin = document.getElementById("input_login");
var inputPassword = document.getElementById("input_password");
var buttonLoginSite = document.getElementById("button_login_site");

async function sendingUserRegistrationDataToTheServer() {
  function DataUsersObjectBd() {
    (this.username = inputLogin.value),
      (this.userpassword = inputPassword.value);
  }

  const dataUsersObjectBd = new DataUsersObjectBd();
  const response = await fetch("http://localhost:2000/server/login", {
    method: "POST",
    body: JSON.stringify(dataUsersObjectBd),
    mode: "cors",
    Authorization: "Bearer",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Authorization: `Bearer ${jwtToken}`,
    },
    cache: "default",
  });

  var jwtToken = await response.json();
  var test = JSON.stringify(jwtToken);

  function parseJwtIdEndSaveLocalStorage(token) {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
    return (
      localStorage.setItem(jsonPayload, JSON.stringify(jwtToken)),
      console.log(JSON.parse(jsonPayload)),
      (window.location.href = "http://127.0.0.1:5500/HTML/")
    );
  }

  return parseJwtIdEndSaveLocalStorage(test);
}

buttonLoginSite.addEventListener("click", () => {
  sendingUserRegistrationDataToTheServer();
});

inputLogin.addEventListener("keydown", e => {
  if (e.keyCode == 13) {
    sendingUserRegistrationDataToTheServer();
  }
});

inputPassword.addEventListener("keydown", e => {
  if (e.keyCode == 13) {
    sendingUserRegistrationDataToTheServer();
  }
});
