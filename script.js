// Your app's data structure
let events = [];
let archive = [];

// Save/load from localStorage
function loadData() {
    // TODO: Load events and archive from localStorage
    // JSON.parse(localStorage.getItem('events'))
}

function saveData() {
    // TODO: Save events and archive to localStorage
    // localStorage.setItem('events', JSON.stringify(events))
}

const tarScreen = document.querySelectorAll(".screen");
const btn = document.querySelectorAll(".sidebar__btn");


// ============================================
// SCREEN SWITCHING
// ============================================


function switchScreen(screenId) {
    const screenAct = document.querySelector(`.screen[data-screen="${screenId}"]`);
    const btnAct = document.querySelector(`.sidebar__btn[data-screen="${screenId}"]`);
    // TODO:
    // 1. Remove .is-active from all .sidebar__btn
    btn.forEach(b => b.classList.remove("is-active"));
    // 2. Add .is-active to [data-screen="${screenId}"]
    btnAct.classList.add("is-active");
    // 3. Remove .is-visible from all .screen
    tarScreen.forEach(s => s.classList.remove("is-visible"));
    // 4. Add .is-visible to [data-screen="${screenId}"]
    screenAct.classList.add("is-visible");


    // 5. Update #page-title and #page-subtitle based on screenId
    const title = document.getElementById("page-title");
    const subTitle = document.getElementById("page-subtitle");
    if (screenId === "stats") {
        title.textContent = "Statistics";
        subTitle.textContent = "Overview of your events"
    } else if (screenId === "add") {
        title.textContent = "Add Event";
        subTitle.textContent = "Manage your events"
    } else if (screenId === "list") {
        title.textContent = "Events List";
        subTitle.textContent = "Create a new event"
    } else if (screenId === "archive") {
        title.textContent = "Archive";
        subTitle.textContent = "Stored events";
    }

}

// event switchScreen

btn.forEach(b => {
    b.addEventListener('click', () => {
        switchScreen(b.dataset.screen);
    });

});

function renderStats() {
    // TODO:
    // Calculate from events array:
    const totalEvents = events.length;
    const totalSeats = events.reduce((sum, e) => sum + e.seats, 0);
    const totalPrice = events.reduce((sum, e) => sum + e.price * e.seats, 0);

    // Update DOM:
    document.getElementById('stat-total-events').textContent = totalEvents;
    document.getElementById('stat-total-seats').textContent = totalSeats;
    document.getElementById('stat-total-price').textContent = '$' + totalPrice.toFixed(2);
}

// ============================================
// Add Event


const eventForm = document.getElementById("event-form")

eventForm.addEventListener('submit', function (e) {
    e.preventDefault();
    hideError();

    const msgErr = validaTion();
    if( msgErr !== ""){
        showError(msgErr);
        return;
    }

    const AjjEven = {
        id: Date.now(),
        title: document.getElementById("event-title").value,
        image: document.getElementById("event-image").value,
        description: document.getElementById("event-description").value,
        seats: Number(document.getElementById("event-seats").value),
        price: Number(document.getElementById("event-price").value),
        variants: []

    };
    events.push(AjjEven);
    renderStats();
    ajjtab();
    switchScreen('list');


});
const errOr = document.getElementById("form-errors");

function showError(msg) {
    errOr.classList.remove("is-hidden");
    errOr.textContent = msg;
}

function hideError() {
    errOr.classList.add("is-hidden");
    errOr.textContent = "";
}
function validaTion() {
    const title = document.getElementById("event-title").value.trim();
    const image = document.getElementById("event-image").value.trim();
    const description = document.getElementById("event-description").value.trim();
    const seats = document.getElementById("event-seats").value.trim();
    const price = document.getElementById("event-price").value.trim();
    const imageRegex = /\.(jpg|jpeg|png|gif)$/i;
    if (title === "") return "title faild";

    if (description.length < 5) return "Minmum 5 emots";

    if (seats === "" || Number(seats) <= 0) return "entrer un valeaur positif";

    if (price === "" || Number(price) <= 0) return "entrer un prix positive";

    if (image !== "" && !imageRegex.test(image)) {
        return "Image must end with .jpg, .jpeg, .png, or .gif";
    }

    return "";
}

function ajjtab(){
    const tabElm = document.getElementById("affichTable");
        tabElm.innerHtml = "";
    
    events.forEach((event, index)=> {
        const tr = document.createElement("tr");
        tr.setAttribute("data-event-id", event.id);

        tr.innerHTML = `
            <td>${index + 1}</td>
            <td>${event.title}</td>
            <td>${event.seats}</td>
            <td>$${event.price}</td>
            <td>${event.variants.length}</td>
            <td>
                <button class="btn btn--small" data-action="details" data-event-id="${event.id}">Details</button>
                <button class="btn btn--small" data-action="edit" data-event-id="${event.id}">Edit</button>
                <button class="btn btn--danger btn--small" data-action="archive" data-event-id="${event.id}">Delete</button>
            </td>
        `;
        tabElm.appendChild(tr);
    });

}

