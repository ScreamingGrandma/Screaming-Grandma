import { initializeApp } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
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
    let shoppingListAray = Object.entries(snapshot.val());
    clearShoppingListEl();

    for (let i = 0; i < shoppingListAray.length; i++) {
      let currentItem = shoppingListAray[i];
      // let currentItemID = currentItem[0];
      // let currentItemValue = currentItem[1];

      // console.log(currentItem);
      // console.log(currentItemID);
      // console.log(currentItemValue);

      appenItemToShoppingListEl(currentItem);
    }

    // console.log(shoppingListAray);
  } else {
    clearShoppingListEl();
  }

  function clearShoppingListEl() {
    shoppingListEL.innerHTML = "";
  }
});
function clearInputFieldEl() {
  inputFieldEl.value = "";
}

function appenItemToShoppingListEl(item) {
  let itemID = item[0];
  let itemValue = item[1];

  let newLiEL = document.createElement("li");

  newLiEL.addEventListener("dblclick", function () {
    console.log(itemValue);

    let extractlocationofTheItemInDb = ref(
      database,
      `ScreamingGrandma/${itemID}`
    );
    remove(extractlocationofTheItemInDb);
  });

  newLiEL.textContent = itemValue;

  shoppingListEL.append(newLiEL);
}
