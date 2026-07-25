// WRITE YOUR JS CODE HERE
const dateInfo = document.querySelector("#apod-date-info");
const dateDay = document.querySelector("#apod-date-input");
const apodDate = document.querySelector("#apod-date");
const apodExplanation = document.querySelector("#apod-explanation");
const apodLoading = document.querySelector("#apod-loading");
const apodImage = document.querySelector("#apod-image");
const apodDetails = document.querySelector("#apod-date-detail span");
const apodType = document.querySelector("#apod-media-type");
const viewImage = document.querySelector("#view-image");
const todayInSpaceSec = document.querySelector("#today-in-space");
const launchesSec = document.querySelector("#launches");
const planetsSec = document.querySelector("#planets");
const nav = document.querySelector("#sidebar .nav");
const todayInSpaceBtn = document.querySelector(
  "a[data-section='today-in-space']",
);
const launchesBtn = document.querySelector('a[data-section="launches"]');
const planetsBtn = document.querySelector('a[data-section="planets"]');
// api 2
const firstItem = document.querySelector("#featured-launch");
// cards parent
const cardsParent = document.querySelector("#launches-grid");
// planet
const planetCard = document.querySelectorAll(".planet-card");
// planets table
const imageImage = document.querySelector("#planet-detail-image");
const imageTitle = document.querySelector("#planet-detail-name");
const imageDesc = document.querySelector("#planet-detail-description");
const planetAxis = document.querySelector("#planet-distance");
const planetRadius = document.querySelector("#planet-radius");
const planetMass = document.querySelector("#planet-mass");
const planetDensity = document.querySelector("#planet-density");
const planetOrbital = document.querySelector("#planet-orbital-period");
const planetRotation = document.querySelector("#planet-rotation");
const planetMoons = document.querySelector("#planet-moons");
const planetGravity = document.querySelector("#planet-gravity");

// get Api
async function getToday() {
  let res = await fetch(
    "https://api.nasa.gov/planetary/apod?api_key=btNSgSBHcDxUrxX7lnbeI3wpUeyzYkAMCIXf4vbT",
  );
  let data = await res.json();
  let imageSrc = data.url;
  let type = data.media_type;

  let dateNew = new Date(data.date);
  let monthName = dateNew.toLocaleString("en-US", { month: "long" });
  let day = dateNew.getDate();
  let year = dateNew.getFullYear();

  apodLoading.classList.add("hidden");
  apodImage.classList.remove("hidden");
  apodImage.setAttribute("src", imageSrc);
  dateInfo.textContent = `${monthName} ${day}, ${year}`;
  dateDay.setAttribute("value", data.date);
  apodDate.children[0].innerHTML = `${monthName} ${day}, ${year}`;
  dateDay.nextElementSibling.innerHTML = `${monthName.slice(0, 3)} ${day}, ${year}`;
  apodDetails.innerHTML = `${monthName} ${day}, ${year}`;
  apodExplanation.innerHTML = `${data.explanation}`;
  apodType.innerHTML = `${type}`;
  // on click on the button open image
  viewImage.addEventListener("click", function (e) {
    window.open(data.url, "_blank");
  });
}
getToday();
launchesBtn.addEventListener("click", function (e) {
  hideAndShow(launchesSec, todayInSpaceSec, planetsSec);
  for (let i = 0; i < nav.children.length; i++) {
    nav.children[i].classList.remove("text-blue-400");
    nav.children[i].classList.remove("bg-blue-500/10");
    nav.children[i].classList.add("text-slate-300");
  }
  e.currentTarget.classList.add("text-blue-400");
  e.currentTarget.classList.add("bg-blue-500/10");
  e.currentTarget.classList.remove("text-slate-300");
});
todayInSpaceBtn.addEventListener("click", function (e) {
  hideAndShow(todayInSpaceSec, launchesSec, planetsSec);
  for (let i = 0; i < nav.children.length; i++) {
    nav.children[i].classList.remove("text-blue-400");
    nav.children[i].classList.remove("bg-blue-500/10");
    nav.children[i].classList.add("text-slate-300");
  }
  e.currentTarget.classList.add("text-blue-400");
  e.currentTarget.classList.add("bg-blue-500/10");
  e.currentTarget.classList.remove("text-slate-300");
});
planetsBtn.addEventListener("click", function (e) {
  hideAndShow(planetsSec, launchesSec, todayInSpaceSec);
  for (let i = 0; i < nav.children.length; i++) {
    nav.children[i].classList.remove("text-blue-400");
    nav.children[i].classList.remove("bg-blue-500/10");
    nav.children[i].classList.add("text-slate-300");
  }
  e.currentTarget.classList.add("text-blue-400");
  e.currentTarget.classList.add("bg-blue-500/10");
  e.currentTarget.classList.remove("text-slate-300");
});

// call Api
async function getUpcoming() {
  try {
    let res = await fetch(
      "https://lldev.thespacedevs.com/2.3.0/launches/upcoming/?limit=10'",
    );

    let data = await res.json();
    let currentData = data.results;
    // console.log(currentData);
    let featuredLaunch = currentData[0];
    // Featured Launch Date
    let launchDate = new Date(featuredLaunch.net);

    let date = launchDate.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
      timeZone: "UTC",
    });

    // Featured Launch Time
    let time = launchDate.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "UTC",
      timeZoneName: "short",
    });

    // Featured Launch Image
    let featuredImage =
      featuredLaunch.image?.image_url ||
      "./assets/images/launch-placeholder.png";
    firstItem.innerHTML = `
      <div
        class="relative bg-slate-800/30 border border-slate-700 rounded-3xl overflow-hidden group hover:border-blue-500/50 transition-all"
      >
        <div
          class="absolute inset-0 bg-linear-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity"
        ></div>
        <div class="relative grid grid-cols-1 lg:grid-cols-2 gap-6 p-8">
          <div class="flex flex-col justify-between">
            <div>
              <div class="flex items-center gap-3 mb-4">
                <span
                  class="px-4 py-1.5 bg-blue-500/20 text-blue-400 rounded-full text-sm font-semibold flex items-center gap-2"
                >
                  <i class="fas fa-star"></i>
                  Featured Launch
                </span>
                <span
                  class="px-4 py-1.5 bg-green-500/20 text-green-400 rounded-full text-sm font-semibold"
                >
                  ${featuredLaunch.status.abbrev}
                </span>
              </div>
              <h3 class="text-3xl font-bold mb-3 leading-tight">
                ${featuredLaunch.name}
              </h3>
              <div
                class="flex flex-col xl:flex-row xl:items-center gap-4 mb-6 text-slate-400"
              >
                <div class="flex items-center gap-2">
                  <i class="fas fa-building"></i>
                  <span>
                    ${featuredLaunch.launch_service_provider?.name || "N/A"}
                  </span>
                </div>
                <div class="flex items-center gap-2">
                  <i class="fas fa-rocket"></i>
                  <span>
                    ${featuredLaunch.rocket?.configuration?.name || "N/A"}
                  </span>
                </div>
              </div>
             
              <div class="grid xl:grid-cols-2 gap-4 mb-6">
                <div class="bg-slate-900/50 rounded-xl p-4">
                  <p
                    class="text-xs text-slate-400 mb-1 flex items-center gap-2"
                  >
                    <i class="fas fa-calendar"></i>
                    Launch Date
                  </p>
                  <p class="font-semibold">
                    ${date}
                  </p>
                </div>
                <div class="bg-slate-900/50 rounded-xl p-4">
                  <p
                    class="text-xs text-slate-400 mb-1 flex items-center gap-2"
                  >
                    <i class="fas fa-clock"></i>
                    Launch Time
                  </p>
                  <p class="font-semibold">
                    ${time}
                  </p>
                </div>
                <div class="bg-slate-900/50 rounded-xl p-4">
                  <p
                    class="text-xs text-slate-400 mb-1 flex items-center gap-2"
                  >
                    <i class="fas fa-map-marker-alt"></i>
                    Location
                  </p>
                  <p class="font-semibold text-sm">
                    ${featuredLaunch.pad?.location?.name || "N/A"}
                  </p>
                </div>
                <div class="bg-slate-900/50 rounded-xl p-4">
                  <p
                    class="text-xs text-slate-400 mb-1 flex items-center gap-2"
                  >
                    <i class="fas fa-globe"></i>
                    Country
                  </p>
                  <p class="font-semibold">
                    ${featuredLaunch.pad?.country?.name || "N/A"}
                  </p>
                </div>
              </div>
              <p class="text-slate-300 leading-relaxed mb-6">
                ${featuredLaunch.mission?.description || "No description available."}
              </p>
            </div>
            <div class="flex flex-col md:flex-row gap-3">
              <button
                class="flex-1 self-start md:self-center px-6 py-3 bg-blue-500 rounded-xl hover:bg-blue-600 transition-colors font-semibold flex items-center justify-center gap-2"
              >
                <i class="fas fa-info-circle"></i>
                View Full Details
              </button>
              <div class="icons self-end md:self-center">
                <button
                  class="px-4 py-3 bg-slate-700 rounded-xl hover:bg-slate-600 transition-colors"
                >
                  <i class="far fa-heart"></i>
                </button>
                <button
                  class="px-4 py-3 bg-slate-700 rounded-xl hover:bg-slate-600 transition-colors"
                >
                  <i class="fas fa-bell"></i>
                </button>
              </div>
            </div>
          </div>
          <div class="relative">
            <div
              class="relative h-full min-h-[400px] rounded-2xl overflow-hidden bg-slate-900/50"
            >
              <img
                class="h-full w-full object-cover"
                src="${featuredImage}"
                onerror="this.onerror=null; this.src='./assets/images/launch-placeholder.png';"
              />
              <div
                class="absolute inset-0 bg-linear-to-t from-slate-900 via-transparent to-transparent"
              ></div>
            </div>
          </div>
        </div>
      </div>
    `;

    let cartona = "";

    for (let i = 1; i < currentData.length; i++) {
      let launch = currentData[i];
      // Date
      let cardLaunchDate = new Date(launch.net);
      let cardDate = cardLaunchDate.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
        timeZone: "UTC",
      });

      // Time
      let cardTime = cardLaunchDate.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "UTC",
        timeZoneName: "short",
      });

      // Image
      let cardImage =
        launch.image?.image_url || "./assets/images/launch-placeholder.png";
      cartona += `
        <div
          class="bg-slate-800/50 border border-slate-700 rounded-2xl overflow-hidden hover:border-blue-500/30 transition-all group cursor-pointer"
        >
          <div
            class="relative h-48 bg-slate-900/50 flex items-center justify-center overflow-hidden"
          >
            <img
              class="w-full h-full object-cover  group-hover:scale-110 transition-transform duration-500"
              src="${cardImage}"
              onerror="this.onerror=null; this.src='./assets/images/launch-placeholder.png';"
            />
            <div class="absolute top-3 right-3">
              <span
                class="px-3 py-1 bg-green-500/90 text-white backdrop-blur-sm rounded-full text-xs font-semibold"
              >
                ${launch.status?.abbrev || "N/A"}
              </span>
            </div>
          </div>
          <div class="p-5">
            <div class="mb-3">
              <h4
                class="font-bold text-lg mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors"
              >
                ${launch.name}
              </h4>
              <p class="text-sm text-slate-400 flex items-center gap-2">
                <i class="fas fa-building text-xs"></i>
                ${launch.launch_service_provider?.name || "N/A"}
              </p>
            </div>
            <div class="space-y-2 mb-4">
              <div class="flex items-center gap-2 text-sm">
                <i class="fas fa-calendar text-slate-500 w-4"></i>
                <span class="text-slate-300">
                  ${cardDate}
                </span>
              </div>
              <div class="flex items-center gap-2 text-sm">
                <i class="fas fa-clock text-slate-500 w-4"></i>
                <span class="text-slate-300">
                  ${cardTime}
                </span>
              </div>
              <div class="flex items-center gap-2 text-sm">
                <i class="fas fa-rocket text-slate-500 w-4"></i>
                <span class="text-slate-300">
                  ${launch.rocket?.configuration?.name || "N/A"}
                </span>
              </div>
              <div class="flex items-center gap-2 text-sm">
                <i class="fas fa-map-marker-alt text-slate-500 w-4"></i>
                <span class="text-slate-300 line-clamp-1">
                  ${launch.pad?.location?.name || "N/A"}
                </span>
              </div>
            </div>
            <div
              class="flex items-center gap-2 pt-4 border-t border-slate-700"
            >
              <button
                class="flex-1 px-4 py-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors text-sm font-semibold"
              >
                Details
              </button>
              <button
                class="px-3 py-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors"
              >
                <i class="far fa-heart"></i>
              </button>
            </div>
          </div>
        </div>
      `;
    }
    cardsParent.innerHTML = cartona;
  } catch (error) {
    console.log("Error:", error);
  }
}

// colors
let colors = {
  Uranus: "#22D3EE",
  Neptune: "#2563EB",
  Jupiter: "#FDBA74",
  Mars: "#EF4444",
  Mercury: "#6B7280",
  Saturn: "#FDE047",
  Earth: "#3B82F6",
  Venus: "#FB923C",
};
let { Earth, Jupiter, Mars, Mercury, Neptune, Saturn, Uranus, Venus } = colors;

getUpcoming();
// get planets
async function getPlanet() {
  let res = await fetch(
    "https://solar-system-opendata-proxy.vercel.app/api/planets",
  );
  let data = await res.json();
  planetData = data.bodies;
  console.log(planetData);

  for (let i = 0; i < planetCard.length; i++) {
    planetCard[i].children[0].children[0].setAttribute(
      "src",
      `${planetData[i].image}`,
    );
    planetCard[i].children[0].children[0].setAttribute(
      "alt",
      `${planetData[i].englishName}`,
    );
    planetCard[i].children[0].nextElementSibling.textContent =
      planetData[i].englishName[0].toUpperCase() +
      planetData[i].englishName.slice(1);
    planetCard[
      i
    ].children[0].nextElementSibling.nextElementSibling.textContent =
      (planetData[i].semimajorAxis / 149597870.7).toFixed(2) + " AU";
  }

  let axis = planetData[6].semimajorAxis / 1000000;
  imageImage.setAttribute("sec", `${planetData[6].image}`);
  imageTitle.textContent = planetData[6].englishName;
  imageDesc.textContent = planetData[6].description;
  planetAxis.textContent = axis.toFixed(1) + "M km";
  planetRadius.textContent = planetData[6].meanRadius.toFixed() + " km";
  planetMass.textContent = planetData[6].mass.massValue + " × 10^24 kg";
  planetDensity.textContent = planetData[6].density.toFixed(2) + " g/cm³";
  planetOrbital.textContent = planetData[6].sideralOrbit.toFixed(2) + " days";
  planetRotation.textContent =
    planetData[6].sideralRotation.toFixed(2) + " hours";
  planetGravity.textContent = planetData[6].gravity.toFixed(2) + " m/s²";
  // planet-discoverer
  planetDiscoverer = document.querySelector("#planet-discoverer");
  planetDiscovererDate = document.querySelector("#planet-discovery-date");
  planetType = document.querySelector("#planet-body-type");
  planetVolume = document.querySelector("#planet-volume");
  planetDiscoverer.textContent =
    planetData[6].discoveredBy || "Known since antiquity";
  planetDiscovererDate.textContent =
    planetData[6].discoveredBy || "Ancient times";
  planetDiscovererDate.textContent = planetData[6].bodyType;
  planetVolume.textContent = planetData[6].vol.volValue + " × 10^12 km³";
  // facts
  let ul = document.querySelector("#planet-facts");

  ul.children[0].children[1].textContent =
    planetData[6].mass.massValue + " × 10^24 kg";
  ul.children[1].children[1].textContent = `Surface gravity: ${planetData[6].gravity} m/s²`;
  ul.children[2].children[1].textContent = `Density: ${planetData[6].density} g/cm³`;
  ul.children[3].children[1].textContent = `Axial tilt: ${planetData[6].axialTilt}°
`;
  // Orbital Characteristics
  let planetPerihelion = document.querySelector("#planet-perihelion");
  let planetAphelion = document.querySelector("#planet-aphelion");
  let planetEccentricity = document.querySelector("#planet-eccentricity");
  let planetInclination = document.querySelector("#planet-inclination");
  let planetAxial = document.querySelector("#planet-axial-tilt");
  let planetTemp = document.querySelector("#planet-temp");
  let planetEscape = document.querySelector("#planet-escape");
  planetPerihelion.textContent = `${(planetData[6].perihelion / 1000000).toFixed(1)}M km`;
  planetAphelion.textContent = `${(planetData[6].aphelion / 1000000).toFixed(1)}M km`;
  planetEccentricity.textContent = `${planetData[6].eccentricity.toFixed(5)}`;
  planetInclination.textContent = `${planetData[6].inclination || "N/A"}`;
  planetAxial.textContent = `${planetData[6].axialTilt.toFixed(2)}°`;
  planetTemp.textContent = `${planetData[6].avgTemp}°C`;
  planetEscape.textContent = `${(planetData[6].escape / 1000).toFixed(2)} km/s`;
  // planet-comparison-tbody
  let plnetCoparesion = document.querySelectorAll(
    "#planet-comparison-tbody tr",
  );
  for (let i = 0; i < plnetCoparesion.length; i++) {
    plnetCoparesion[i].children[0].children[0].children[1].textContent =
      planetData[i].englishName;
    // console.log(    plnetCoparesion[i].children[1]);

    plnetCoparesion[i].children[1].textContent = (
      planetData[i].semimajorAxis / 149597870.7
    ).toFixed(2);
    plnetCoparesion[i].children[2].textContent = (
      (planetData[i].meanRadius * 2) /
      1000
    ).toFixed(3);
    plnetCoparesion[i].children[3].textContent = (
      (planetData[i].mass.massValue * 10 ** planetData[i].mass.massExponent) /
      (5.97237 * 10 ** 24)
    ).toFixed(3);
    // plnetCoparesion[i].children[4].textContent=(planetData[i].sideralOrbit/ 365.25).toFixed(2)+" years";
    let orbitDays = planetData[i].sideralOrbit;

    if (orbitDays < 365.25) {
      plnetCoparesion[i].children[4].textContent =
        orbitDays.toFixed() + " days";
    } else {
      plnetCoparesion[i].children[4].textContent =
        (orbitDays / 365.25).toFixed(2) + " years";
    }
    if (planetData[i].moons === null) {
      plnetCoparesion[i].children[5].textContent = "0";
    } else {
      plnetCoparesion[i].children[5].textContent = planetData[i].moons.length;
    }
    plnetCoparesion[i].children[6].children[0].textContent = planetData[i].type;
    // add colors and background
    if (planetData[i].type == "Ice Giant") {
      plnetCoparesion[i].children[6].children[0].classList.add("bg-1");
      plnetCoparesion[i].children[6].children[0].classList.add("color-1");
    } else if (planetData[i].type == "Gas Giant") {
      plnetCoparesion[i].children[6].children[0].classList.add("bg-2");
      plnetCoparesion[i].children[6].children[0].classList.add("color-2");
    } else if (planetData[i].type == "Terrestrial") {
      plnetCoparesion[i].children[6].children[0].classList.add("bg-3");
      plnetCoparesion[i].children[6].children[0].classList.add("color-3");
    }
    if (planetData[i].englishName == "Earth") {
      plnetCoparesion[i].classList.add("bg-blue-500/5");
      // console.log(plnetCoparesion[i]);
    }

    if (planetData[i].englishName == "Uranus") {
      plnetCoparesion[
        i
      ].children[0].children[0].children[0].style.backgroundColor = `${Uranus}`;
    }
    if (planetData[i].englishName == "Neptune") {
      plnetCoparesion[
        i
      ].children[0].children[0].children[0].style.backgroundColor =
        `${Neptune}`;
    }
    if (planetData[i].englishName == "Jupiter") {
      plnetCoparesion[
        i
      ].children[0].children[0].children[0].style.backgroundColor =
        `${Jupiter}`;
    }
    if (planetData[i].englishName == "Mars") {
      plnetCoparesion[
        i
      ].children[0].children[0].children[0].style.backgroundColor = `${Mars}`;
    }
    if (planetData[i].englishName == "Mercury") {
      plnetCoparesion[
        i
      ].children[0].children[0].children[0].style.backgroundColor =
        `${Mercury}`;
    }
    if (planetData[i].englishName == "Saturn") {
      plnetCoparesion[
        i
      ].children[0].children[0].children[0].style.backgroundColor = `${Saturn}`;
    }
    if (planetData[i].englishName == "Earth") {
      plnetCoparesion[
        i
      ].children[0].children[0].children[0].style.backgroundColor = `${Earth}`;
    }
    if (planetData[i].englishName == "Venus") {
      plnetCoparesion[
        i
      ].children[0].children[0].children[0].style.backgroundColor = `${Venus}`;
    }
  }
}
getPlanet();

// show and hide sections
function hideAndShow(show, hideOne, hideTwo) {
  show.classList.remove("hidden");
  hideOne.classList.add("hidden");
  hideTwo.classList.add("hidden");
}
