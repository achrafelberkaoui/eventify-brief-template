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
    switchScreen('list');

});

