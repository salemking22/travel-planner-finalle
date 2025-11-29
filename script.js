// Search functionality
function searchDestination() {
  const input = document.getElementById("searchInput").value.trim().toLowerCase();
  let resultsDiv = document.getElementById("results");

  if (!resultsDiv) {
    resultsDiv = document.createElement("div");
    resultsDiv.id = "results";
    document.querySelector(".search-section").appendChild(resultsDiv);
  }

  const message = input
    ? `Searching for travel info about <strong>${input}</strong>...`
    : "Please enter a destination.";

  resultsDiv.innerHTML = `<p>${message}</p>`;

  // Get active filters
  const activeFilters = Array.from(
    document.querySelectorAll(".filters-card input[type='checkbox']:checked")
  ).map(cb => cb.name.toLowerCase());

  // Filter destination cards by search + tags
  const cards = document.querySelectorAll(".card");
  cards.forEach(card => {
    const title = card.querySelector("h3")?.textContent.toLowerCase();
    const tags = card.dataset.tags ? card.dataset.tags.toLowerCase().split(" ") : [];
    const isFilterCard = card.classList.contains("filters-card");

    const matchesSearch = !input || (title && title.includes(input));
    const matchesFilter = activeFilters.length === 0 || activeFilters.some(f => tags.includes(f));

    if (isFilterCard || (matchesSearch && matchesFilter)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}

// Add to Itinerary logic
function addToItinerary(destination) {
  let itinerary = JSON.parse(localStorage.getItem("itinerary")) || [];

  if (!itinerary.includes(destination)) {
    itinerary.push(destination);
    localStorage.setItem("itinerary", JSON.stringify(itinerary));
    alert(`✔️ "${destination}" added to your itinerary!`);
  } else {
    alert(`ℹ️ "${destination}" is already in your itinerary.`);
  }
}

// Save to Favorites logic
function saveToFavorites(destination) {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  if (!favorites.includes(destination)) {
    favorites.push(destination);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    alert(`❤️ "${destination}" saved to favorites!`);
  } else {
    alert(`ℹ️ "${destination}" is already in your favorites.`);
  }
}

// Filter checkbox tracking
document.querySelectorAll(".filters-card input[type='checkbox']").forEach((checkbox) => {
  checkbox.addEventListener("change", () => {
    searchDestination(); // Re-run combined logic when filters change
  });
});