// APIs
const _pinnedShowsAPI = "http://localhost:3000/proxy?targetUrl=https://gateway.tkt.ge/Shows/Pinned";
const _topEventsAPI = "http://localhost:3000/proxy?targetUrl=https://gateway.tkt.ge/Events/Top";
const _todaysEventsAPI = "http://localhost:3000/proxy?targetUrl=https://gateway.tkt.ge/Events/Today";
const _upcomingEventsAPI = "http://localhost:3000/proxy?targetUrl=https://gateway.tkt.ge/Events/Upcoming";
const _moviesAPI = "http://localhost:3000/proxy?targetUrl=https://gateway.tkt.ge/Movies/List";
const _concertsAPI = "http://localhost:3000/proxy?targetUrl=https://gateway.tkt.ge/Shows/List?categoryId=2";

// index.html containers
const carouselInner = document.getElementById("carousel-inner");
const popularEventsContainer = document.getElementById("popular-events-cont-inner");
const todaysEventsContainer = document.getElementById("todays-events-cont-inner");
const upcomingEventsContainer = document.getElementById("upcoming-events-cont-inner");
const moviesContainer = document.getElementById("movies-cont-inner");

// Months in Georgian for date formatting
const geoMonths = ["იან", "თებ", "მარ", "აპრ", "მაი", "ივნ", "ივლ", "აგვ", "სექ", "ოქტ", "ნოე", "დეკ"];

// Data fetching abstract function
async function fetchData(_apiEndpoint) {
    try {
        const response = await fetch(_apiEndpoint);
        const data = await response.json();
        return data;
    } catch(error) {
        console.error(`Error fetching data from ${_apiEndpoint}: `, error);
        return null;
    }
}

// Filling event carousels in index.html
async function fillCarousel() {
    const data = await fetchPinnedShows();
    if (!data) return;

    data.forEach((event, index) => {
        const carouselItem = document.createElement('div');
        carouselItem.classList.add('carousel-item');
        carouselItem.id = "carouselItem";
        carouselItem.addEventListener('click', () => {
            window.location.href = "./pages/events.html";
        });
        
        if (index === 0) {
            carouselItem.classList.add('active');
        }

        let carouselImage = document.createElement("img");
        carouselImage.className = "d-block w-100";
        carouselImage.src = window.innerWidth <= 768 ? `${event.mobileImage}` : `${event.desktopImage}`;
        carouselItem.appendChild(carouselImage);
        carouselInner.appendChild(carouselItem);       

        window.addEventListener("resize", () => {
            let DesktopImage = `${event.desktopImage}`;
            let MobileImage = `${event.mobileImage}`;
            
            if (window.innerWidth <= 768) {
                carouselItem.innerHTML = `<img src="${MobileImage}" class="d-block w-100">`;
            } else {
                carouselItem.innerHTML = `<img src="${DesktopImage}" class="d-block w-100">`;
            }
        });
    });
}

async function displayPopularEvents() {
    const data = await fetchTopEvents();
    if(!data) return;

    data.forEach((event) => {
        let dateString = `${event.eventDate}`;
        let eventDate = new Date(dateString);

        let day = eventDate.getDate();
        let month = geoMonths[eventDate.getMonth()];
        let year = eventDate.getFullYear();
        let hours = eventDate.getHours();
        let minutes = eventDate.getMinutes();

        let formattedDate = `${day} ${month} ${year}, ${hours}:${minutes < 10 ? '0' : ''}${minutes}`;

        popularEventsContainer.innerHTML += `
            <div class="event-card">
                <div class="event-image-container">
                    <img src="https://static.tkt.ge/img/${event.imageName}" class="event-image">
                    ${event.isSoldOut || event.minPrice === 0 ? 
                        `<div class="sold-out-icon">გაყიდულია</div>` : 
                        `<div class="ticket-price-icon">${event.minPrice} ₾-დან</div>`
                    }
                </div>
                <div class="event-info-container">
                    <p class="event-title">${event.eventName}</p>
                    <p class="event-address">${event.venueName}</p>
                    <p class="event-time">${event.eventDate === "" ? "" : formattedDate}</p>
                </div>
            </div>
        `;
    });
}

async function displayTodaysEvents() {
    const data = await fetchTodaysEvents();
    if(!data) return;

    data.forEach((event) => {
        let dateString = `${event.eventDate}`;
        let eventDate = new Date(dateString);

        let day = eventDate.getDate();
        let month = geoMonths[eventDate.getMonth()];
        let year = eventDate.getFullYear();
        let hours = eventDate.getHours();
        let minutes = eventDate.getMinutes();

        let formattedDate = `${day} ${month} ${year}, ${hours}:${minutes < 10 ? '0' : ''}${minutes}`;

        todaysEventsContainer.innerHTML += `
            <div class="event-card">
                <div class="event-image-container">
                    <img src="https://static.tkt.ge/img/${event.imageName}" class="event-image">
                    ${event.isSoldOut || event.minPrice === 0 ? 
                        `<div class="sold-out-icon">გაყიდულია</div>` : 
                        `<div class="ticket-price-icon">${event.minPrice} ₾-დან</div>`
                    }
                </div>
                <div class="event-info-container">
                    <p class="event-title">${event.eventName}</p>
                    <p class="event-address">${event.venueName}</p>
                    <p class="event-time">${event.eventDate === "" ? "" : formattedDate}</p>
                </div>
            </div>
        `;
    });
}

async function displayUpcomingEvents() {
    const data = await fetchUpcomingEvents();
    if(!data) return;

    data.forEach((event) => {
        let dateString = `${event.eventDate}`;
        let eventDate = new Date(dateString);

        let day = eventDate.getDate();
        let month = geoMonths[eventDate.getMonth()];
        let year = eventDate.getFullYear();
        let hours = eventDate.getHours();
        let minutes = eventDate.getMinutes();

        let formattedDate = `${day} ${month} ${year}, ${hours}:${minutes < 10 ? '0' : ''}${minutes}`;

        upcomingEventsContainer.innerHTML += `
            <div class="event-card">
                <div class="event-image-container">
                    <img src="${event.horizontalImageUrl}" class="event-image">
                    ${event.isSoldOut || event.minPrice === 0 ? 
                        `<div class="sold-out-icon">გაყიდულია</div>` : 
                        `<div class="ticket-price-icon">${event.minPrice} ₾-დან</div>`
                    }
                </div>
                <div class="event-info-container">
                    <p class="event-title">${event.name}</p>
                    <p class="event-address">${event.venueName}</p>
                    <p class="event-time">${event.eventDate === "" ? "" : formattedDate}</p>
                </div>
            </div>
        `;
    });
}

async function displayMovies() {
    const data = await fetchMovies();
    if(!data) return;

    data.forEach((movie) => {
        moviesContainer.innerHTML += `
            <div class="movie-card">
                <div class="movie-image-container">
                    <img src="${movie.desktopImage}" class="movie-image">
                </div>
                <div class="movie-info-container">
                    <p class="movie-title">${movie.name}</p>
                </div>
            </div>
        `;
    });
}

// Fetch functions for each API
async function fetchPinnedShows() { return fetchData(_pinnedShowsAPI).then(data => data.data.banners); }
async function fetchTopEvents() { return fetchData(_topEventsAPI).then(data => data.data); }
async function fetchTodaysEvents() { return fetchData(_todaysEventsAPI).then(data => data.data); }
async function fetchUpcomingEvents() { return fetchData(_upcomingEventsAPI).then(data => data.data); }
async function fetchMovies() { return fetchData(_moviesAPI).then(data => data.data); }
async function fetchConcerts() { return fetchData(_concertsAPI).then(data => data.data.shows); }

// Search function
async function searchAndDisplayEvent(inputID) {
    const searchValue = document.getElementById(inputID).value.trim();
    const mainContainer = document.getElementById("main");

    if (searchValue === "") {
        alert("Enter the event you want to look for.");
        return;
    }

    // Search API 
    const _searchAPI = `https://gateway.tkt.ge/v2/shows/search?keyword=${searchValue}&api_key=7d8d34d1-e9af-4897-9f0f-5c36c179be77`;

    const searchData = await fetchData(_searchAPI);
    
    if (!searchData) {
        mainContainer.innerHTML = "<h2>Error searching events. Please try again later</h2>";
        return;
    }
    
    mainContainer.innerHTML = "";
    mainContainer.style["display"] = "flex";
    mainContainer.style["flex-flow"] = "row wrap";
    mainContainer.style["align-items"] = "center";
    mainContainer.style["justify-content"] = "center";
    mainContainer.style["gap"] = "28px";

    if (searchData.Data.Items.length === 0) {
        mainContainer.innerHTML = "<h2>No such events found :(</h2>";
        return;
    }

    searchData.Data.Items.forEach((show) => {
        let dateString = `${show.EventDateString}`;
        let formattedDateString = "";

        if (dateString.trim() !== "") {
            let parts = dateString.split("-");
            let datePart = parts[0].split("/");
            let timePart = parts[1].split(":");

            let formattedDate = new Date(datePart[2], datePart[1] - 1, datePart[0], timePart[0], timePart[1]);

            let day = formattedDate.getDate();
            let month = geoMonths[formattedDate.getMonth()];
            let year = formattedDate.getFullYear();
            let hours = formattedDate.getHours();
            let minutes = formattedDate.getMinutes();

            formattedDateString = `${day} ${month} ${year}, ${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
        } else {
            formattedDateString = "";
        }

        mainContainer.innerHTML += `
            <div class="search-result-card">
                <div class="search-result-image-container">
                    <img src="${show.Poster}">
                </div>
                <div class="search-result-info-container">
                    <p class="search-result-title">${show.ShowName}</p>
                    <p class="search-result-category">${show.CategoryName}</p>
                    <p class="search-result-address">${show.VenueName}</p>
                    <p class="search-result-time">${formattedDateString}</p>
                </div>
            </div>
        `;
    });
}


// Burger menu toggle function
const burgerMenu = document.querySelector('.burger-menu');
const navigationContainer = document.querySelector('.navigation-container');

function toggleNavigation() {
    navigationContainer.classList.toggle('show');
}

burgerMenu.addEventListener('click', function(event) {
    event.stopPropagation();
    toggleNavigation();
});

navigationContainer.addEventListener('click', function(event) {
    event.stopPropagation();
});

document.addEventListener('click', function(event) {
    if (navigationContainer.classList.contains('show') && !event.target.closest('.navigation-container')) {
        toggleNavigation();
    }
});

// Copyright Info "printer"
let currentYear = new Date().getFullYear();
let copyrightInfo = document.getElementById("copyright-info");
copyrightInfo.innerHTML = `&copy; ${currentYear} <span>TKT.GE</span> | ყველა უფლება დაცულია`;

// Adding event listeners to search inputs and search buttons
const searchInput1 = document.getElementById("search-input-1");
searchInput1.addEventListener("keypress", function(event) {
    if (event.key == "Enter") {
        event.preventDefault();
        searchAndDisplayEvent("search-input-1");
    }
});

const searchButton1 = document.getElementById("search-button-1");
searchButton1.addEventListener("click", () => {
    searchAndDisplayEvent("search-input-1");
});

const searchInput2 = document.getElementById("search-input-2");
searchInput2.addEventListener("keypress", function(event) {
    if (event.key == "Enter") {
        event.preventDefault();
        searchAndDisplayEvent("search-input-2");
    }
});

const searchButton2 = document.getElementById("search-button-2");
searchButton2.addEventListener("click", () => {
    searchAndDisplayEvent("search-input-2");
});


const tnetIcon = document.getElementById("tnet-icon");
tnetIcon.addEventListener("click", () => {
    window.location.href = "about.html";
});

fillCarousel();
displayPopularEvents();
displayTodaysEvents();
displayUpcomingEvents();
displayMovies();


// Displaying events in pages
async function fillWithMovies() {
    const moviesMainContainer = document.getElementById("movies-main-container");
    const moviesData = await fetchMovies();
    if(!moviesData) return;

    moviesData.forEach((movie) => {
        moviesMainContainer.innerHTML += `
            <div class="movie-card">
                <div class="image-container">
                    <img src="${movie.desktopImage}" class="movie-image">
                </div>
                <div class="info-container">
                    <h6 class="movie-title">${movie.name}</h6>
                </div>
            </div>
        `;
    });
}

async function fillWithConcerts() {
    const concertsMainContainer = document.getElementById("concerts-main-container-inner");
    const concertsData = await fetchConcerts();
    if (!concertsData) return;

    concertsData.forEach((concert) => {
        let dateString = `${concert.fromDate}`;
        let concertDate = new Date(dateString);

        let day = concertDate.getDate();
        let month = geoMonths[concertDate.getMonth()];
        let year = concertDate.getFullYear();
        let hours = concertDate.getHours();
        let minutes = concertDate.getMinutes();

        let formattedDate = `${day} ${month} ${year}, ${hours}:${minutes < 10 ? '0' : ''}${minutes}`;

        concertsMainContainer.innerHTML += `
            <div class="concert-card">
                <div class="image-container">
                    <img src="https://static.tkt.ge/img/${concert.desktopImage}">
                    ${concert.isSoldOut || concert.minPrice === 0 ? 
                        `<div class="sold-out-icon">გაყიდულია</div>` : 
                        `<div class="ticket-price-icon">${concert.minPrice} ₾-დან</div>`
                    }
                </div>
                <div class="info-container">
                    <p class="concert-title">${concert.name}</p>
                    <p class="concert-address">${concert.venueName}</p>
                    <p class="concert-time">${concert.fromDate === null ? "" : formattedDate}</p>
                </div>
            </div>
        `;
    });
}

async function fillWithTopEvents() {
    const topEventsMainContainer = document.getElementById("top-events-main-container-inner");
    const topEventsData = await fetchTopEvents();
    if (!topEventsData) return;

    topEventsData.forEach((event) => {
        let dateString = `${event.eventDate}`;
        let topEventDate = new Date(dateString);

        let day = topEventDate.getDate();
        let month = geoMonths[topEventDate.getMonth()];
        let year = topEventDate.getFullYear();
        let hours = topEventDate.getHours();
        let minutes = topEventDate.getMinutes();

        let formattedDate = `${day} ${month} ${year}, ${hours}:${minutes < 10 ? '0' : ''}${minutes}`;

        topEventsMainContainer.innerHTML += `
            <div class="top-event-card">
                <div class="image-container">
                    <img src="https://static.tkt.ge/img/${event.imageName}">
                    ${event.isSoldOut || event.minPrice === 0 ? 
                        `<div class="sold-out-icon">გაყიდულია</div>` : 
                        `<div class="ticket-price-icon">${event.minPrice} ₾-დან</div>`
                    }
                </div>
                <div class="info-container">
                    <p class="top-event-title">${event.eventName}</p>
                    <p class="top-event-address">${event.venueName}</p>
                    <p class="top-event-time">${event.eventDate === "" ? "" : formattedDate}</p>
                </div>
            </div>
        `;
    });
}

async function fillWithTodaysEvents() {
    const todaysEventsMainContainer = document.getElementById("todays-events-main-container-inner");
    const todaysEventsData = await fetchTodaysEvents();
    if (!todaysEventsData) return;

    todaysEventsData.forEach((event) => {
        let dateString = `${event.eventDate}`;
        let todaysEventDate = new Date(dateString);

        let day = todaysEventDate.getDate();
        let month = geoMonths[todaysEventDate.getMonth()];
        let year = todaysEventDate.getFullYear();
        let hours = todaysEventDate.getHours();
        let minutes = todaysEventDate.getMinutes();

        let formattedDate = `${day} ${month} ${year}, ${hours}:${minutes < 10 ? '0' : ''}${minutes}`;

        todaysEventsMainContainer.innerHTML += `
            <div class="todays-event-card">
                <div class="image-container">
                    <img src="https://static.tkt.ge/img/${event.imageName}">
                    ${event.isSoldOut || event.minPrice === 0 ? 
                        `<div class="sold-out-icon">გაყიდულია</div>` : 
                        `<div class="ticket-price-icon">${event.minPrice} ₾-დან</div>`
                    }
                </div>
                <div class="info-container">
                    <p class="todays-event-title">${event.eventName}</p>
                    <p class="todays-event-address">${event.venueName}</p>
                    <p class="todays-event-time">${event.eventDate === "" ? "" : formattedDate}</p>
                </div>
            </div>
        `;
    });
}

async function fillWithUpcomingEvents() {
    const upcomingEventsMainContainer = document.getElementById("upcoming-events-main-container-inner");
    const upcomingEventsData = await fetchUpcomingEvents();
    if (!upcomingEventsData) return;

    upcomingEventsData.forEach((event) => {
        let dateString = `${event.eventDate}`;
        let upcomingEventDate = new Date(dateString);

        let day = upcomingEventDate.getDate();
        let month = geoMonths[upcomingEventDate.getMonth()];
        let year = upcomingEventDate.getFullYear();
        let hours = upcomingEventDate.getHours();
        let minutes = upcomingEventDate.getMinutes();

        let formattedDate = `${day} ${month} ${year}, ${hours}:${minutes < 10 ? '0' : ''}${minutes}`;

        upcomingEventsMainContainer.innerHTML += `
            <div class="upcoming-event-card">
                <div class="image-container">
                    <img src="${event.horizontalImageUrl}">
                    ${event.isSoldOut || event.minPrice === 0 ? 
                        `<div class="sold-out-icon">გაყიდულია</div>` : 
                        `<div class="ticket-price-icon">${event.minPrice} ₾-დან</div>`
                    }
                </div>
                <div class="info-container">
                    <p class="upcoming-event-title">${event.name}</p>
                    <p class="upcoming-event-address">${event.venueName}</p>
                    <p class="upcoming-event-time">${event.eventDate === "" ? "" : formattedDate}</p>
                </div>
            </div>
        `;
    });
}

fillWithMovies();
fillWithConcerts();
fillWithTopEvents();
fillWithTodaysEvents();
fillWithUpcomingEvents();