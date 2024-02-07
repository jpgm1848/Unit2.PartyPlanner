const API_URL =
  "https://fsa-crud-2aa9294fe819.herokuapp.com/api/2401-GHP-ET-WEB-FT-SF/events";

const state = {
  events: [],
};

const eventsList = document.querySelector("#events");

const addEventForm = document.querySelector("#addEvent");
addEventForm.addEventListener("submit", addEvent);

/**
 * Sync state with the API and rerender
 */
async function render() {
  // TODO
  await getEvents();
  renderEvents();
}
render();

/**
 * Update state with events from API
 */
async function getEvents() {
  // TODO
  try {
    const response = await fetch(API_URL);
    const json = await response.json();
    state.events = json.data;
    console.log(json.data);
  } catch (error) {
    console.error(error);
  }
}

/**
 * Ask API to create a new event and rerender
 * @param {Event} event
 */
async function addEvent(event) {
  // TODO
  event.preventDefault();

  const name = addEventForm.title.value;
  const date = "2023-08-20T23:40:09.000Z"; //addEventForm.eventDate.value;
  const description = addEventForm.description.value;
  const location = addEventForm.eventLocation.value;

  try {
    // fetch recipe data
    console.log("i'm being reached");
    console.log(name, date, description, location);
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, date, description, location }),
    });
    const json = await response.json();
    render();
  } catch (error) {
    console.error(error);
  }
}

/**
 * Ask API to delete a event and rerender
 * @param {number} id id of event to delete
 */
async function deleteEvent(id) {
  try {
    //  make a DELETE request
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    // we can parse response (we didn't)
    // we can do things with the response (we didn't)
    // rerender everything
    render();
  } catch (error) {
    console.error(error);
  }
}

/**
 * Render events from state
 */
function renderEvents() {
  // TODO
  if (state.events.length < 1) {
    const newListItem = document.createElement("li");
    newListItem.textContent = "No events found.";
    eventsList.append(newListItem);
  } else {
    eventsList.replaceChildren();
    state.events.forEach((eventsObj) => {
      const newListItem = document.createElement("li");
      newListItem.classList.add("event");

      const newHeading = document.createElement("h2");
      newHeading.textContent = eventsObj.name;

      const newDescription = document.createElement("p");
      newDescription.textContent = eventsObj.description;

      const newDate = document.createElement("p");
      newDate.textContent = eventsObj.date;

      const newLocation = document.createElement("p");
      newLocation.textContent = eventsObj.location;

      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.addEventListener("click", () => deleteEvent(eventsObj.id));

      newListItem.append(
        newHeading,
        newDescription,
        newDate,
        newLocation,
        deleteButton
      );

      eventsList.append(newListItem);
    });
  }
}
