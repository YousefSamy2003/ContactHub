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

let allContactList = [];
let favoritesList = [];
let emergencyList = [];
let currentImage = "";

///  events

document.forms[0].addEventListener("submit", function (e) {
  e.preventDefault();
  getData();
  getFavoritesList();
  getEmergencyList();
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
  display();
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
          <span class="button-icon fav-icon">
            <i class="fa-solid fa-star ${
              allContactList[i].favorite ? "text-warning" : ""
            }"></i>
          </span>

          <span class="button-icon emerg-icon">
            <i class="fa-solid fa-heart-pulse ${
              allContactList[i].emergency ? "text-danger" : ""
            }"></i>
          </span>

          <button
            class="button-icon edit"
            data-bs-toggle="modal"
            data-bs-target="#addcontact"
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


///----------------------  init --------------------------
getAndCheckLocalStorage();

// let box = `

//    <div class="col-md-6">
//                       <div class="p-3">
//                         <div class="card-contant rounded-3 p-2">
//                           <div
//                             class="name-and-number d-flex align-items-center p-2"
//                           >
//                             <span
//                               class="icon-fav-emerg d-flex align-items-center justify-content-center rounded-3"
//                             >
//                               <!--  if condition  -->
//                               <span class="fav-icon   ${
//                                 allContactList[i].favorite
//                                   ? "d-block"
//                                   : "d-none"
//                               }
//                                 ><i class="fa-solid fa-star"></i
//                               ></span>

//                               <span class="emerg-icon   ${
//                                 allContactList[i].emergency
//                                   ? "d-block"
//                                   : "d-none"
//                               }"
//                                 ><i class="fa-solid fa-heart-pulse"></i
//                               ></span>
//                               <!-- javascript if condition -->
//                             ${
//                               allContactList[i].imageContact
//                                 ? `<img src="${allContactList[i].imageContact}" class="d-none img-fluid rounded-3" alt="">`
//                                 : `<span class="text-white fw-bold">${allContactList[
//                                     i
//                                   ].fullName.slice(0, 2)}</span>`
//                             }

//                             </span>

//                             <div class="d-flex flex-column px-3">
//                               <span class="fw-bold">${
//                                 allContactList[i].fullName
//                               } </span>
//                               <span class="d-flex align-items-center"
//                                 ><span
//                                   class="icon-small d-flex align-items-center justify-content-center rounded-3"
//                                   style="background-color: #dbeafe"
//                                   ><i
//                                     class="fa-solid fa-phone"
//                                     style="color: blue"
//                                   ></i
//                                 ></span>

//                                 <span class="fw-bold px-2 text-secondary"
//                                   >${allContactList[i].phoneNumber}</span
//                                 >
//                               </span>
//                             </div>
//                           </div>
//                           <div class="email d-flex align-items-center p-2">
//                             <span
//                               class="icon-small d-flex align-items-center justify-content-center rounded-3"
//                               style="background-color: #ede9fe"
//                             >
//                               <i class="fa-solid fa-envelope"></i>
//                             </span>
//                             <span class="text-secondary px-2"
//                               >${allContactList[i].emailAddress}
//                             </span>
//                           </div>
//                           <div class="address d-flex align-items-center p-2">
//                             <span
//                               class="icon-small d-flex align-items-center justify-content-center rounded-3"
//                               style="background-color: #d0fae5"
//                             >
//                               <i class="fa-solid fa-location-dot"></i>
//                             </span>
//                             <span
//                               class="text-secondary px-2"
//                               style="font-size: 12px"
//                               >${allContactList[i].address}
//                             </span>
//                           </div>
//                           <!-- need if condition here -->
//                           <div class="p-2 badge bg-light  ${
//                             allContactList[i].emergency ? "d-block" : "d-none"
//                           }">
//                             <span class="text-danger">
//                               <i
//                                 class="fa-solid fa-heart-pulse text-danger"
//                               ></i>
//                               <span>Emergency </span>
//                             </span>
//                           </div>
//                           <hr />

//                           <div
//                             class="all-button-for-card d-flex justify-content-between align-items-center p-2"
//                           >
//                             <div class="d-flex gap-2">
//                               <span class="button-icon telphone-icon">
//                                 <a href="tel:${allContactList[i].phoneNumber}}"
//                                   ><i class="fa-solid fa-phone"></i
//                                 ></a>
//                               </span>
//                               <span class="button-icon mail-icon">
//                                 <a href="mailto:${
//                                   allContactList[i].emailAddress
//                                 }"
//                                   ><i class="fa-solid fa-envelope"></i
//                                 ></a>
//                               </span>
//                             </div>
//                             <div class="d-flex gap-2">
//                               <span class="button-icon fav-icon">
//                                 <!-- need if condition here -->

//                               ${
//                                 allContactList[i].favorite
//                                   ? `<i class="fa-solid fa-star" style="color:#ffd43b"></i>`
//                                   : `<i class="fa-solid fa-star"></i>`
//                               }
//                               </span>
//                              ${
//                                allContactList[i].emergency
//                                  ? `<i class="fa-solid fa-heart-pulse text-danger"></i>`
//                                  : `<i class="fa-solid fa-heart-pulse"></i>`
//                              }
//                               <span>
//                                 <button
//                                   class="button-icon edit"
//                                   data-bs-toggle="modal"
//                                   data-bs-target="#addcontact"
//                                 >
//                                   <i class="fa-solid fa-pen"></i>
//                                 </button>
//                               </span>
//                               <span>
//                                 <button class="button-icon delete">
//                                   <i class="fa-solid fa-trash"></i></button
//                               ></span>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>

// `;
