var formRegistrId = document.getElementById("form_registr");
var buttonRegistrSitId = document.getElementById("button_registr_site");

try {
  buttonRegistrSitId.addEventListener("click", () => {
    //Сделать очищение полей инпут от тени при отправки данных из инпутов//

    if (
      inputLoginId.value.length >= 4 &&
      inputPasswordId.value.length >= 4 &&
      inputLoginId.value.length <= 10 &&
      inputPasswordId.value.length <= 10
    ) {
      formRegistrId.submit();
    } else {
      alert(
        "Логин и пароль должны быть не менее четырех(4) и не больше десяти(10) символов!"
      );
    }
  });
} catch (e) {
  console.log(e);
}

formRegistrId.addEventListener("submit", event => {
  event.preventDefault();

  console.log("sdf");
});
