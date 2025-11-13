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
        subTitle.textContent = "Manage your events";
        document.getElementById("creat").textContent = " Create Event";
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
    if (msgErr !== "") {
        showError(msgErr);
        return;
    }

    const variantRows = document.querySelectorAll(".variant-row");
    const variants = Array.from(variantRows).map(row => ({
        name: row.querySelector(".variant-row__name").value.trim(),
        qty: Number(row.querySelector(".variant-row__qty").value),
        value: Number(row.querySelector(".variant-row__value").value),
        type: row.querySelector(".variant-row__type").value
    }));
    if (editId) {
        const ev = events.find(e => e.id == editId)
        ev.title = document.getElementById("event-title").value;
        ev.image = document.getElementById("event-image").value;
        ev.description = document.getElementById("event-description").value;
        ev.seats = Number(document.getElementById("event-seats").value);
        ev.price = Number(document.getElementById("event-price").value);
        ev.variants = variants;
        editId = null;
        alert(`event "${ev.title}" a modifier !`);
    } else {
        const AddEvent = {
            id: Date.now(),
            title: document.getElementById("event-title").value,
            image: document.getElementById("event-image").value,
            description: document.getElementById("event-description").value,
            seats: Number(document.getElementById("event-seats").value),
            price: Number(document.getElementById("event-price").value),
            variants: variants


        };
        events.push(AddEvent);
        alert(`event "${AddEvent.title}" a ajoute !`);
    }
    renderStats();
    addTable();
    switchScreen('list');
    eventForm.reset();
    document.getElementById("variants-list").innerHTML = "";

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

function addTable() {
    const tabElm = document.getElementById("affichTable");
    tabElm.innerHTML = " ";

    events.forEach((event, index) => {
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

function addVariantRow() {

    const varian = document.getElementById("variants-list");

    const row = document.createElement("div");
    row.className = "variant-row"
    row.innerHTML = `

        <input type="text" class="input variant-row__name" placeholder="Variant name (e.g., 'Early Bird')" />
        <input type="number" class="input variant-row__qty" placeholder="Qty" min="1" />
        <input type="number" class="input variant-row__value" placeholder="Value" step="0.01" />
        <select class="select variant-row__type">
            <option value="fixed">Fixed Price</option>
            <option value="percentage">Percentage Off</option>
        </select>
        <button type="button" class="btn btn--danger btn--small variant-row__remove">Remove</button>
    `;

    row.querySelector('.variant-row__remove').addEventListener("click", () => {
        row.remove();
    })
    varian.appendChild(row);
}
const btnVar = document.getElementById("btn-add-variant")
btnVar.addEventListener('click', addVariantRow)


const table = document.getElementById("affichTable");

table.addEventListener("click", function (e) {
    const btn = e.target;
    const evenId = btn.dataset.eventId;
    const action = btn.dataset.action;

    if (action === "details") {
        ShowDetails(evenId);
    }
    else if (action === "edit") {
        ShowEdit(evenId);
        console.log(evenId);
        document.getElementById("creat").textContent = " Modifier"
    }
    else if (action === "archive") {
        ShowArchive(evenId);
    }
})

function ShowDetails(id) {
    const ev = events.find(e => e.id == id);


    alert(`Title : ${ev.title} \n Seats : ${ev.seats} \n Prix : ${ev.price} `);

}
let editId = null;
function ShowEdit(id) {
    const vn = events.find(l => l.id == id);
    editId = id;
    console.log(vn);
    document.getElementById("event-title").value = vn.title;
    document.getElementById("event-image").value = vn.image;
    document.getElementById("event-description").value = vn.description;
    document.getElementById("event-seats").value = vn.seats;
    document.getElementById("event-price").value = vn.price;

    switchScreen("add");
}

function addArchive() {
    const arch = document.getElementById("affichArchive");
    arch.innerHTML = "";
    archive.forEach((e, index) => {
        const tr = document.createElement("tr");
        tr.innerHTML = ` 
            <td>${index + 1}</td>
            <td>${e.title}</td>
            <td>${e.seats}</td>
            <td>$${e.price}</td>
            <td>
                <button class="btn btn--small" data-action="restore" onclick="restoreEvents(${e.id})"  data-event-id="${e.id}">Restore</button>
            </td>
            `;

        arch.appendChild(tr);
    })

}

function ShowArchive(id) {
    const index = events.findIndex(e => e.id == id);
    const archiv = events[index];
    archive.push(archiv);
    events.splice(index, 1);
    addTable();
    renderStats();
    alert(`event "${archiv.title}" archive !`);
    addArchive();
}


function restoreEvents(id) {
    const ev = archive.findIndex(e => e.id == id);
    const even = archive[ev];
    events.push(even);
    archive.splice(ev, 1);
     addTable();
    addArchive();
    renderStats();
    alert(`event "${ev.title}" restore !`);
}
