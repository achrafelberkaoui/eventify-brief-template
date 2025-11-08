const tarScreen = document.querySelectorAll(".screen");
const btn = document.querySelectorAll(".sidebar__btn");

// function switchscreen
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
if(screenId === "stats"){
    title.textContent = "Statistics";
    subTitle.textContent = "Overview of your events"
}else if(screenId === "add"){
    title.textContent = "Add Event";
    subTitle.textContent = "Manage your events"
}else if(screenId === "add"){
    title.textContent = "Events List";
    subTitle.textContent = "Create a new event"
}else if (screenId === "archive") {
        title.textContent = "Archive";
        subTitle.textContent = "Stored events";
    }

}

// event switchScreen

btn.forEach(b => {
    b.addEventListener('click', ()=> {
        switchScreen(b.dataset.screen);
    });

});



