var inputLogin = document.getElementById("input_login");
var inputPassword = document.getElementById("input_password");
var buttonLoginSite = document.getElementById("button_login_site");

function parseJwtIdEndSaveLocalStorage(parseJwtToken, jwtToken) {
  const base64Url = parseJwtToken.split(".")[1];
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
    (window.location.href = "http://127.0.0.1:5500/HTML/")
  );
}

async function sendingUserRegistrationDataToTheServer(
  parseJwtIdEndSaveLocalStorage
) {
  function DataUsersObjectBd() {
    (this.username = inputLogin.value),
      (this.userpassword = inputPassword.value);
  }

  const dataUsersObjectBd = new DataUsersObjectBd();
  const response = await fetch("http://localhost:2000/server/login", {
    method: "POST",
    body: JSON.stringify(dataUsersObjectBd),
    mode: "cors",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  });

  var jwtToken = await response.json();

  if (typeof jwtToken === "object" && response.status === 200) {
    var parseJwtToken = JSON.stringify(jwtToken);
    return parseJwtIdEndSaveLocalStorage(parseJwtToken, jwtToken);
  } else {
    alert(jwtToken.massage);
  }
}

buttonLoginSite.addEventListener("click", () => {
  sendingUserRegistrationDataToTheServer(parseJwtIdEndSaveLocalStorage);
});

inputLogin.addEventListener("keydown", e => {
  if (e.keyCode == 13) {
    sendingUserRegistrationDataToTheServer(parseJwtIdEndSaveLocalStorage);
  }
});

inputPassword.addEventListener("keydown", e => {
  if (e.keyCode == 13) {
    sendingUserRegistrationDataToTheServer(parseJwtIdEndSaveLocalStorage);
  }
});
