import { initializeApp } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
} from "https://www.gstatic.com/firebasejs/11.7.1/firebase-database.js";
const firebaseConfig = {
  databaseURL: "https://mobile-app-7c351-default-rtdb.firebaseio.com/",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const shoppingListDB = ref(database, "ScreamingGrandma");

const inputFieldEl = document.getElementById("input-field");
const buttonAddEl = document.getElementById("button-add");
const shoppingListEL = document.getElementById("shopping-list");

buttonAddEl.addEventListener("click", function () {
  if (inputFieldEl.value) {
    const inputFieldValue = inputFieldEl.value;

    push(shoppingListDB, inputFieldValue);

    clearInputFieldEl();
  }
});
onValue(shoppingListDB, function (snapshot) {
  if (snapshot.val() !== null) {
    let shoppingListAray = Object.values(snapshot.val());
    clearShoppingListEl();

    for (let i = 0; i < shoppingListAray.length; i++) {
      appenItemToShoppingListEl(shoppingListAray[i]);
    }

    console.log(shoppingListAray);
  }

  function clearShoppingListEl() {
    shoppingListEL.innerHTML = "";
  }
});
function clearInputFieldEl() {
  inputFieldEl.value = "";
}

function appenItemToShoppingListEl(inputFieldValue) {
  shoppingListEL.innerHTML += `<li>${inputFieldValue}</li>`;
}
