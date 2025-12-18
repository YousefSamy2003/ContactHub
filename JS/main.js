let fullName = document.getElementById("fullName");
let phoneNumber = document.getElementById("phoneNumber");
let emailAddress = document.getElementById("emailAddress");
let group = document.getElementById("group");
let notes = document.getElementById("notes");
let emergency = document.getElementById("emergency");
let favorite = document.getElementById("favorite");
let address = document.getElementById("address");
let imageContact = document.getElementById("imageContact");

let rowContact = document.getElementById("rowContact");
let favRow = document.getElementById("favRow");
let emergRow = document.getElementById("emergRow");
let totalNumber = {
  totalList: document.getElementById("totalList"),
  totalFav: document.getElementById("totalFav"),
  totalEmerg: document.getElementById("totalEmerg"),
};
let allContactList = [];
let favoritesList = [];
let emergencyList = [];
let currentImage = "";

let GlobalIndexForUpdate;

///  events

document.forms[0].addEventListener("submit", function (e) {
  e.preventDefault();
  getData();
  getFavoritesList();
  getEmergencyList();
  displayFavorites();
  displayEmergency();
});

///getImageAndImagePrev
imageContact.addEventListener("change", function () {
  var imagePreview = document.querySelector("#imagePreview");
  var file = imageContact.files[0];
  if (!file) return;
  var reader = new FileReader();
  reader.onload = function (e) {
    document.getElementById("imageSpan").classList.replace("d-block", "d-none");
    imagePreview.classList.replace("d-none", "d-block");
    imagePreview.src = e.target.result;
    currentImage = e.target.result;
  };
  reader.readAsDataURL(file);
});

//              functions

function getData() {
  let Contact = {
    id: Date.now(),
    fullName: fullName.value,
    phoneNumber: phoneNumber.value,
    emailAddress: emailAddress.value,
    group: group.value,
    address: address.value,
    notes: notes.value,
    emergency: emergency.checked,
    favorite: favorite.checked,
    imageContact: currentImage,
  };
  allContactList.push(Contact);
  storeInLocalStorage();

  getFavoritesList();
  getEmergencyList();

  display();
  displayFavorites();
  displayEmergency();
  getTotalNumberForAllList();
}

function storeInLocalStorage() {
  localStorage.setItem("contacts", JSON.stringify(allContactList));
}

function getAndCheckLocalStorage() {
  if (localStorage.getItem("contacts")) {
    allContactList = JSON.parse(localStorage.getItem("contacts"));
  } else {
    allContactList = [];
  }

  getEmergencyList();
  displayEmergency();
  getFavoritesList();
  displayFavorites();
  getTotalNumberForAllList();
  display();
}

function getFavoritesList() {
  favoritesList = [];
  for (let i = 0; i < allContactList.length; i++) {
    if (allContactList[i].favorite == true) {
      favoritesList.push(allContactList[i]);
    }
  }
  console.log(favoritesList);
}
function getEmergencyList() {
  emergencyList = [];
  for (let i = 0; i < allContactList.length; i++) {
    if (allContactList[i].emergency == true) {
      emergencyList.push(allContactList[i]);
    }
  }
  console.log(emergencyList);
}
function getTotalNumberForAllList() {
  totalNumber.totalList.innerHTML = allContactList.length;
  totalNumber.totalFav.innerHTML = favoritesList.length;
  totalNumber.totalEmerg.innerHTML = emergencyList.length;
}
function display() {
  let box = "";
  for (let i = 0; i < allContactList.length; i++) {
    box += `
<div class="col-md-6">
  <div class="p-3">
    <div class="card-contant rounded-3 p-2">

      <!-- name & phone -->
      <div class="name-and-number d-flex align-items-center p-2">
        <span
          class="icon-fav-emerg d-flex align-items-center justify-content-center rounded-3"
        >

          <!-- favorite -->
        <!-- favorite -->
<span class="fav-icon ${allContactList[i].favorite ? "d-flex" : "d-none"}">
  <i class="fa-solid fa-star"></i>
</span>

<!-- emergency -->
<span class="emerg-icon ${allContactList[i].emergency ? "d-flex" : "d-none"}">
  <i class="fa-solid fa-heart-pulse"></i>
</span>


          <!-- image or initials -->
          ${
            allContactList[i].imageContact
              ? `<img src="${allContactList[i].imageContact}" class="img-fluid rounded-3" alt="">`
              : `<span class="text-white fw-bold">
                  ${allContactList[i].fullName
                    .split(" ")
                    .join("")
                    .slice(0, 2)
                    .toUpperCase()}
                </span>`
          }
        </span>

        <div class="d-flex flex-column px-3">
          <span class="fw-bold">${allContactList[i].fullName}</span>

          <span class="d-flex align-items-center">
            <span
              class="icon-small d-flex align-items-center justify-content-center rounded-3"
              style="background-color:#dbeafe"
            >
              <i class="fa-solid fa-phone text-primary"></i>
            </span>
            <span class="fw-bold px-2 text-secondary">
              ${allContactList[i].phoneNumber}
            </span>
          </span>
        </div>
      </div>

      <!-- email -->
      <div class="email d-flex align-items-center p-2">
        <span
          class="icon-small d-flex align-items-center justify-content-center rounded-3"
          style="background-color:#ede9fe"
        >
          <i class="fa-solid fa-envelope"></i>
        </span>
        <span class="text-secondary px-2">
          ${allContactList[i].emailAddress}
        </span>
      </div>

      <!-- address -->
      <div class="address d-flex align-items-center p-2">
        <span
          class="icon-small d-flex align-items-center justify-content-center rounded-3"
          style="background-color:#d0fae5"
        >
          <i class="fa-solid fa-location-dot"></i>
        </span>
        <span class="text-secondary px-2" style="font-size:12px">
          ${allContactList[i].address}
        </span>
      </div>

      <!-- emergency badge -->
      ${
        allContactList[i].emergency
          ? `<div class="p-2 badge bg-light">
               <span class="text-danger">
                 <i class="fa-solid fa-heart-pulse"></i>
                 Emergency
               </span>
             </div>`
          : ""
      }

      <hr />

      <!-- buttons -->
      <div
        class="all-button-for-card d-flex justify-content-between align-items-center p-2"
      >
        <div class="d-flex gap-2">
          <span class="button-icon telphone-icon">
            <a href="tel:${allContactList[i].phoneNumber}">
              <i class="fa-solid fa-phone"></i>
            </a>
          </span>

          <span class="button-icon mail-icon">
            <a href="mailto:${allContactList[i].emailAddress}">
              <i class="fa-solid fa-envelope"></i>
            </a>
          </span>
        </div>

        <div class="d-flex gap-2">
          <span class="button-icon fav-icon" onclick="handleFav(${
            allContactList[i].id
          })">
            <i class="fa-solid fa-star ${
              allContactList[i].favorite ? "text-warning" : ""
            }"  ></i>
          </span>

          <span class="button-icon emerg-icon" onclick="handleEmerg(${
            allContactList[i].id
          })">
            <i class="fa-solid fa-heart-pulse ${
              allContactList[i].emergency ? "text-danger" : ""
            }"    ></i>
          </span>

          <button
            class="button-icon edit"
            data-bs-toggle="modal"
            data-bs-target="#addcontact"
            onclick="updateUploadToForm(${allContactList[i].id})"
          >
            <i class="fa-solid fa-pen"></i>
          </button>

          <button class="button-icon delete">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
      </div>

    </div>
  </div>
</div>
`;
  }
  rowContact.innerHTML = box;
}

function displayFavorites() {
  let boxFav = "";

  if (favoritesList.length === 0) {
    boxFav = `
      <div class="p-5">
        <p class="text-center text-secondary" style="font-size:18px; font-weight:500">
          No favorites yet
        </p>
      </div>
    `;
  } else {
    for (let i = 0; i < favoritesList.length; i++) {
      boxFav += `
        <div>
          <div class="contant">
            <div class="card-contant rounded-3 p-2">
              <div class="name-and-number for-hover-fav d-flex align-items-center justify-content-between p-2"> 
                <div class="d-flex">
                  <span class="rounded-4 icon-inside d-flex justify-content-center align-items-center" style="background-color: var(--main-color);">
                    ${
                      favoritesList[i].imageContact
                        ? `<img src="${favoritesList[i].imageContact}" class="img-fluid rounded-3" alt="">`
                        : `<span class="text-white fw-bold">
                             ${favoritesList[i].fullName
                               .split(" ")
                               .join("")
                               .slice(0, 2)
                               .toUpperCase()}
                           </span>`
                    }
                  </span>
                  <span class="d-flex flex-column px-3">
                    <span class="fw-bold" style="font-size:12px">${
                      favoritesList[i].fullName
                    }</span>
                    <span class="text-secondary" style="font-size:12px">${
                      favoritesList[i].phoneNumber
                    }</span>
                  </span>
                </div>

                <span class="button-icon telphone-icon">
                  <a href="tel:${favoritesList[i].phoneNumber}">
                    <i class="fa-solid fa-phone"></i>
                  </a>
                </span>
              </div>
            </div>
          </div>
        </div>
      `;
    }
  }

  favRow.innerHTML = boxFav;
}
function displayEmergency() {
  let boxEmerg = "";

  if (emergencyList.length === 0) {
    boxEmerg = `
      <div class="p-5">
        <p class="text-center text-secondary" style="font-size:18px; font-weight:500">
          No Emergency yet
        </p>
      </div>
    `;
  } else {
    for (let i = 0; i < emergencyList.length; i++) {
      boxEmerg += `
        <div>
          <div class="contant">
            <div class="card-contant rounded-3 p-2">
              <div class="name-and-number for-hover-emerg d-flex align-items-center justify-content-between p-2"> 
                <div class="d-flex">
                  <span class="rounded-4 icon-inside d-flex justify-content-center align-items-center" style="background-color: var(--main-color);">
                    ${
                      emergencyList[i].imageContact
                        ? `<img src="${emergencyList[i].imageContact}" class="img-fluid rounded-3" alt="">`
                        : `<span class="text-white fw-bold">
                             ${emergencyList[i].fullName
                               .split(" ")
                               .join("")
                               .slice(0, 2)
                               .toUpperCase()}
                           </span>`
                    }
                  </span>
                  <span class="d-flex flex-column px-3">
                    <span class="fw-bold" style="font-size:12px">${
                      emergencyList[i].fullName
                    }</span>
                    <span class="text-secondary" style="font-size:12px">${
                      emergencyList[i].phoneNumber
                    }</span>
                  </span>
                </div>
                <span class="button-icon telphone-icon">
                  <a href="tel:${emergencyList[i].phoneNumber}">
                    <i class="fa-solid fa-phone"></i>
                  </a>
                </span>
              </div>
            </div>
          </div>
        </div>
      `;
    }
  }

  emergRow.innerHTML = boxEmerg;
}

function handleFav(id) {
  let index = allContactList.findIndex(
    (allContactList) => allContactList.id === id
  );
  allContactList[index].favorite = !allContactList[index].favorite;
  storeInLocalStorage();
  getEmergencyList();
  displayEmergency();
  getFavoritesList();
  displayFavorites();
  getTotalNumberForAllList();
  display();
}
function handleEmerg(id) {
  GlobalIndexForUpdate = allContactList.findIndex(
    (allContactList) => allContactList.id === id
  );
  allContactList[index].emergency = !allContactList[index].emergency;
  storeInLocalStorage();
  getEmergencyList();
  displayEmergency();
  getFavoritesList();
  displayFavorites();
  getTotalNumberForAllList();
  display();
}

function updateUploadToForm(id) {
  let index = allContactList.findIndex(
    (allContactList) => allContactList.id === id
  );
  GlobalIndexForUpdate = index;

  fullName.value = allContactList[index].fullName;
  phoneNumber.value = allContactList[index].phoneNumber;
  emailAddress.value = allContactList[index].emailAddress;
  group.value = allContactList[index].group;
  notes.value = allContactList[index].notes;
  emergency.checked = allContactList[index].emergency;
  favorite.checked = allContactList[index].favorite;
  address.value = allContactList[index].address;
  currentImage = allContactList[index].imageContact;

  if (currentImage) {
    document.getElementById("imageSpan").classList.replace("d-block", "d-none");
    document
      .getElementById("imagePreview")
      .classList.replace("d-none", "d-block");
    document.getElementById("imagePreview").src = currentImage;
  }
  console.log(index);
  document.getElementById("mainButton").classList.replace("d-block", "d-none");
  document
    .getElementById("updateButton")
    .classList.replace("d-none", "d-block");
}

function updateContact() {
  let Contact = {
    fullName: fullName.value,
    phoneNumber: phoneNumber.value,
    emailAddress: emailAddress.value,
    group: group.value,
    address: address.value,
    notes: notes.value,
    emergency: emergency.checked,
    favorite: favorite.checked,
    imageContact: currentImage,
  };
  allContactList.splice(GlobalIndexForUpdate, 1, Contact);
  storeInLocalStorage();

  document.getElementById("mainButton").classList.replace("d-none", "d-block");
  document
    .getElementById("updateButton")
    .classList.replace("d-block", "d-none");

  getEmergencyList();
  displayEmergency();
  getFavoritesList();
  displayFavorites();
  getTotalNumberForAllList();
  display();
}

///----------------------  init --------------------------
getAndCheckLocalStorage();
