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

let searchInput = document.getElementById("searchInput");

let totalNumber = {
  totalList: document.getElementById("totalList"),
  totalFav: document.getElementById("totalFav"),
  totalEmerg: document.getElementById("totalEmerg"),
};
let allContactList = [];
let favoritesList = [];
let emergencyList = [];
let listForSearch = [];
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

searchInput.addEventListener("input", function () {
  listForSearch = [];

  for (let i = 0; i < allContactList.length; i++) {
    if (
      allContactList[i].fullName
        .toLowerCase()
        .includes(searchInput.value.toLowerCase()) ||
      allContactList[i].phoneNumber
        .toLowerCase()
        .includes(searchInput.value.toLowerCase()) ||
      allContactList[i].emailAddress
        .toLowerCase()
        .includes(searchInput.value.toLowerCase())
    ) {
      listForSearch.push(allContactList[i]);
    }
  }
  display(listForSearch);
});

//              functions

function getData() {
  let isNameValid = vaildationName(fullName);
  let isEmailValid = vaildationName(emailAddress);
  let isPhoneValid = vaildationName(phoneNumber);

  if (isNameValid && isEmailValid && isPhoneValid) {
    let isDuplicate = allContactList.some(
      (contact) => contact.phoneNumber === phoneNumber.value
    );

    if (isDuplicate) {
      Swal.fire({
        icon: "error",
        title: "الرقم موجود مسبقاً",
        text: "هذا الرقم مسجل بالفعل لجهة اتصال أخرى.",
        confirmButtonText: "حسناً",
        confirmButtonColor: "#7066e0",
      });
      return;
    }

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
    clearForm();
    getFavoritesList();
    getEmergencyList();
    display();
    displayFavorites();
    displayEmergency();
    getTotalNumberForAllList();

    let modalElement = document.getElementById("addcontact");
    let modalInstance = bootstrap.Modal.getInstance(modalElement);
    if (modalInstance) {
      modalInstance.hide();
    }

    Swal.fire({
      icon: "success",
      title: "تم الحفظ!",
      text: "تم إضافة جهة الاتصال بنجاح",
      timer: 1500,
      showConfirmButton: false,
    });
  } else {
    let errorMsg = "";
    if (!isNameValid) errorMsg = "يرجى كتابة الاسم بشكل صحيح (3 حروف فأكثر).";
    else if (!isEmailValid) errorMsg = "يرجى التأكد من صيغة البريد الإلكتروني.";
    else if (!isPhoneValid) errorMsg = "يرجى إدخال رقم هاتف مصري صحيح.";

    Swal.fire({
      icon: "error",
      title: "بيانات غير صالحة",
      text: errorMsg,
      confirmButtonText: "حسناً",
      confirmButtonColor: "#7066e0",
    });
  }
}
function storeInLocalStorage() {
  localStorage.setItem("contacts", JSON.stringify(allContactList));
}

function clearForm() {
  document.forms[0].reset();
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
function display(list = allContactList) {
  let box = "";
  for (let i = 0; i < list.length; i++) {
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
<span class="fav-icon ${list[i].favorite ? "d-flex" : "d-none"}">
  <i class="fa-solid fa-star"></i>
</span>

<!-- emergency -->
<span class="emerg-icon ${list[i].emergency ? "d-flex" : "d-none"}">
  <i class="fa-solid fa-heart-pulse"></i>
</span>


          <!-- image or initials -->
          ${
            list[i].imageContact
              ? `<img src="${list[i].imageContact}" class="img-fluid rounded-3" alt="">`
              : `<span class="text-white fw-bold">
                  ${list[i].fullName
                    .split(" ")
                    .join("")
                    .slice(0, 2)
                    .toUpperCase()}
                </span>`
          }
        </span>

        <div class="d-flex flex-column px-3">
          <span class="fw-bold">${list[i].fullName}</span>

          <span class="d-flex align-items-center">
            <span
              class="icon-small d-flex align-items-center justify-content-center rounded-3"
              style="background-color:#dbeafe"
            >
              <i class="fa-solid fa-phone text-primary"></i>
            </span>
            <span class="fw-bold px-2 text-secondary">
              ${list[i].phoneNumber}
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
          ${list[i].emailAddress}
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
          ${list[i].address}
        </span>
      </div>

      <!-- emergency badge -->
      ${
        list[i].emergency
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
            <a href="tel:${list[i].phoneNumber}">
              <i class="fa-solid fa-phone"></i>
            </a>
          </span>

          <span class="button-icon mail-icon">
            <a href="mailto:${list[i].emailAddress}">
              <i class="fa-solid fa-envelope"></i>
            </a>
          </span>
        </div>

        <div class="d-flex gap-2">
          <span class="button-icon fav-icon" onclick="handleFav(${list[i].id})">
            <i class="fa-solid fa-star ${
              list[i].favorite ? "text-warning" : ""
            }"  ></i>
          </span>

          <span class="button-icon emerg-icon" onclick="handleEmerg(${
            list[i].id
          })">
            <i class="fa-solid fa-heart-pulse ${
              list[i].emergency ? "text-danger" : ""
            }"    ></i>
          </span>

          <button
            class="button-icon edit"
            data-bs-toggle="modal"
            data-bs-target="#addcontact"
            onclick="updateUploadToForm(${list[i].id})"
          >
            <i class="fa-solid fa-pen"></i>
          </button>

          <button class="button-icon delete"  onclick="deleteContact(${
            list[i].id
          })">
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
  let index = allContactList.findIndex(
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
  let isNameValid = vaildationName(fullName);
  let isEmailValid = vaildationName(emailAddress);
  let isPhoneValid = vaildationName(phoneNumber);
  if (isNameValid && isEmailValid && isPhoneValid) {
    let isDuplicate = allContactList.some((contact, index) => {
      return (
        contact.phoneNumber === phoneNumber.value &&
        index !== GlobalIndexForUpdate
      );
    });

    if (isDuplicate) {
      Swal.fire({
        icon: "error",
        title: "الرقم موجود مسبقاً",
        text: "هذا الرقم مسجل بالفعل لجهة اتصال أخرى.",
        confirmButtonText: "حسناً",
        confirmButtonColor: "#7066e0",
      });
      return;
    }

    let Contact = {
      id: allContactList[GlobalIndexForUpdate].id,
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
    clearForm();

    document
      .getElementById("mainButton")
      .classList.replace("d-none", "d-block");
    document
      .getElementById("updateButton")
      .classList.replace("d-block", "d-none");

    getEmergencyList();
    displayEmergency();
    getFavoritesList();
    displayFavorites();
    getTotalNumberForAllList();
    display();

    let modalElement = document.getElementById("addcontact");
    let modalInstance = bootstrap.Modal.getInstance(modalElement);
    if (modalInstance) {
      modalInstance.hide();
    }

    Swal.fire({
      icon: "success",
      title: "Update Done",
      text: "تم تحديث البيانات بنجاح",
      timer: 1500,
      showConfirmButton: false,
    });
  } else {
    let errorMsg = "";
    if (!isNameValid) errorMsg = "يرجى كتابة الاسم بشكل صحيح (3 حروف فأكثر).";
    else if (!isEmailValid) errorMsg = "يرجى التأكد من صيغة البريد الإلكتروني.";
    else if (!isPhoneValid) errorMsg = "يرجى إدخال رقم هاتف مصري صحيح.";

    Swal.fire({
      icon: "error",
      title: "بيانات غير صالحة",
      text: errorMsg,
      confirmButtonText: "حسناً",
      confirmButtonColor: "#7066e0",
    });
  }
}

function deleteContact(id) {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });

  swalWithBootstrapButtons
    .fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    })
    .then((result) => {
      if (result.isConfirmed) {
        let index = allContactList.findIndex(
          (allContactList) => allContactList.id === id
        );
        allContactList.splice(index, 1);
        storeInLocalStorage();
        getEmergencyList();
        displayEmergency();
        getFavoritesList();
        displayFavorites();
        getTotalNumberForAllList();
        display();

        swalWithBootstrapButtons.fire(
          "Deleted!",
          "The contact has been deleted.",
          "success"
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire(
          "Cancelled",
          "The contact is safe :)",
          "error"
        );
      }
    });
}

let regularExpression = {
  fullName: /^[A-Za-z\u0621-\u064A\s]{3,}$/,
  emailAddress: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
  phoneNumber: /^01[0125]\d{8}$/,
};
fullName.addEventListener("input", function () {
  vaildationName(fullName);
});

emailAddress.addEventListener("input", function () {
  vaildationName(emailAddress);
});
phoneNumber.addEventListener("input", function () {
  vaildationName(phoneNumber);
});

function vaildationName(input) {
  if (regularExpression[input.id].test(input.value)) {
    input.nextElementSibling.classList.replace("d-block", "d-none");
    return true;
  } else {
    input.nextElementSibling.classList.replace("d-none", "d-block");
    return false;
  }
}

// function vaildationEmail() {
//   if (emailRegex.test(emailAddress.value)) {
//     emailAddress.nextElementSibling.classList.replace("d-block", "d-none");
//     return true;
//   } else {
//     emailAddress.nextElementSibling.classList.replace("d-none", "d-block");
//     return false;
//   }
// }

// function vaildationPhoneNumber() {
//   if (phoneRegex.test(phoneNumber.value)) {
//     phoneNumber.nextElementSibling.classList.replace("d-block", "d-none");
//     return true;
//   } else {
//     phoneNumber.nextElementSibling.classList.replace("d-none", "d-block");
//     return false;
//   }
// }

getAndCheckLocalStorage();
