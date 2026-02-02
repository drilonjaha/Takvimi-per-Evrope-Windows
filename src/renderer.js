const { ipcRenderer } = require('electron');
const { countries, cities, getCitiesByCountry, getCity, getCountry } = require('./cities');
const fetch = require('node-fetch');

// State
let selectedCityId = localStorage.getItem('selectedCity') || 'prishtina';
let prayerTimes = null;
let expandedCountry = null;

// DOM Elements
const citySelector = document.getElementById('citySelector');
const currentFlag = document.getElementById('currentFlag');
const currentCityEl = document.getElementById('currentCity');
const dateDisplay = document.getElementById('dateDisplay');
const nextPrayerName = document.getElementById('nextPrayerName');
const countdown = document.getElementById('countdown');
const prayerList = document.getElementById('prayerList');
const modalOverlay = document.getElementById('modalOverlay');
const modalClose = document.getElementById('modalClose');
const cityListContainer = document.getElementById('cityListContainer');

// Prayer names mapping
const prayerNames = {
  imsak: 'Imsaku',
  sabahu: 'Sabahu',
  dreka: 'Dreka',
  ikindia: 'Ikindia',
  akshami: 'Akshami',
  jacia: 'Jacia'
};

// Initialize
init();

async function init() {
  renderCityList();
  updateSelectedCityDisplay();
  updateDateDisplay();
  await fetchPrayerTimes();
  startCountdownTimer();

  // Event listeners
  citySelector.addEventListener('click', () => modalOverlay.classList.add('active'));
  modalClose.addEventListener('click', () => modalOverlay.classList.remove('active'));
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) modalOverlay.classList.remove('active');
  });
}

function renderCityList() {
  const citiesByCountry = getCitiesByCountry();
  let html = '';

  countries.forEach(country => {
    const countryCities = citiesByCountry[country.code].cities;
    html += `
      <div class="country-section">
        <div class="country-header" data-country="${country.code}">
          <span>${country.flag}</span>
          <span>${country.name}</span>
        </div>
        <div class="city-list" id="cities-${country.code}">
          ${countryCities.map(city => `
            <div class="city-option ${city.id === selectedCityId ? 'selected' : ''}" data-city="${city.id}">
              ${city.name}
            </div>
          `).join('')}
        </div>
      </div>
    `;
  });

  cityListContainer.innerHTML = html;

  // Country toggle events
  document.querySelectorAll('.country-header').forEach(header => {
    header.addEventListener('click', () => {
      const countryCode = header.dataset.country;
      const cityList = document.getElementById(`cities-${countryCode}`);

      if (expandedCountry && expandedCountry !== countryCode) {
        document.getElementById(`cities-${expandedCountry}`).classList.remove('expanded');
      }

      cityList.classList.toggle('expanded');
      expandedCountry = cityList.classList.contains('expanded') ? countryCode : null;
    });
  });

  // City selection events
  document.querySelectorAll('.city-option').forEach(option => {
    option.addEventListener('click', () => selectCity(option.dataset.city));
  });

  // Auto-expand selected city's country
  const selectedCity = getCity(selectedCityId);
  if (selectedCity) {
    const cityList = document.getElementById(`cities-${selectedCity.country}`);
    if (cityList) {
      cityList.classList.add('expanded');
      expandedCountry = selectedCity.country;
    }
  }
}

async function selectCity(cityId) {
  selectedCityId = cityId;
  localStorage.setItem('selectedCity', cityId);

  // Update UI
  document.querySelectorAll('.city-option').forEach(opt => {
    opt.classList.toggle('selected', opt.dataset.city === cityId);
  });

  updateSelectedCityDisplay();
  modalOverlay.classList.remove('active');

  await fetchPrayerTimes();
}

function updateSelectedCityDisplay() {
  const city = getCity(selectedCityId);
  if (city) {
    const country = getCountry(city.country);
    currentCityEl.textContent = city.name;
    currentFlag.textContent = country.flag;
  }
}

function updateDateDisplay() {
  const now = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  dateDisplay.textContent = now.toLocaleDateString('sq-AL', options);
}

async function fetchPrayerTimes() {
  const city = getCity(selectedCityId);
  if (!city) return;

  try {
    const today = new Date();
    const dateStr = `${today.getDate().toString().padStart(2, '0')}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getFullYear()}`;

    const response = await fetch(
      `https://api.aladhan.com/v1/timings/${dateStr}?latitude=${city.latitude}&longitude=${city.longitude}&method=3`
    );

    const data = await response.json();

    if (data.code === 200) {
      const timings = data.data.timings;
      prayerTimes = {
        imsak: timings.Imsak,
        sabahu: timings.Fajr,
        dreka: timings.Dhuhr,
        ikindia: timings.Asr,
        akshami: timings.Maghrib,
        jacia: timings.Isha
      };

      updatePrayerTimesDisplay();
    }
  } catch (error) {
    console.error('Error fetching prayer times:', error);
  }
}

function updatePrayerTimesDisplay() {
  if (!prayerTimes) return;

  Object.keys(prayerTimes).forEach(prayer => {
    const timeEl = document.getElementById(`time-${prayer}`);
    if (timeEl) {
      timeEl.textContent = formatTime(prayerTimes[prayer]);
    }
  });

  updatePrayerStatus();
}

function formatTime(timeStr) {
  // Remove timezone info if present
  return timeStr.split(' ')[0];
}

function timeToMinutes(timeStr) {
  const [hours, minutes] = timeStr.split(':').map(Number);
  return hours * 60 + minutes;
}

function getCurrentMinutes() {
  const now = new Date();
  return now.getHours() * 60 + now.getMinutes();
}

function getNextPrayer() {
  if (!prayerTimes) return null;

  const currentMinutes = getCurrentMinutes();
  const prayers = ['imsak', 'sabahu', 'dreka', 'ikindia', 'akshami', 'jacia'];

  for (const prayer of prayers) {
    const prayerMinutes = timeToMinutes(prayerTimes[prayer]);
    if (prayerMinutes > currentMinutes) {
      return { name: prayer, minutes: prayerMinutes };
    }
  }

  // After Isha, next is tomorrow's Imsak
  return { name: 'imsak', minutes: timeToMinutes(prayerTimes.imsak) + 24 * 60 };
}

function updatePrayerStatus() {
  const nextPrayer = getNextPrayer();
  if (!nextPrayer) return;

  const currentMinutes = getCurrentMinutes();
  const prayers = ['imsak', 'sabahu', 'dreka', 'ikindia', 'akshami', 'jacia'];

  document.querySelectorAll('.prayer-item').forEach(item => {
    const prayer = item.dataset.prayer;
    const prayerMinutes = timeToMinutes(prayerTimes[prayer]);

    item.classList.remove('active', 'passed');

    if (prayer === nextPrayer.name) {
      item.classList.add('active');
    } else if (prayerMinutes < currentMinutes) {
      item.classList.add('passed');
    }
  });
}

function startCountdownTimer() {
  updateCountdown();
  setInterval(updateCountdown, 1000);
}

function updateCountdown() {
  const nextPrayer = getNextPrayer();
  if (!nextPrayer) return;

  const now = new Date();
  const currentSeconds = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
  let targetSeconds = nextPrayer.minutes * 60;

  // If target is tomorrow
  if (targetSeconds > 24 * 3600) {
    targetSeconds -= 24 * 3600;
  }

  let diff = targetSeconds - currentSeconds;
  if (diff < 0) diff += 24 * 3600;

  const hours = Math.floor(diff / 3600);
  const minutes = Math.floor((diff % 3600) / 60);
  const seconds = diff % 60;

  countdown.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  nextPrayerName.textContent = prayerNames[nextPrayer.name];

  // Update tray tooltip
  const city = getCity(selectedCityId);
  ipcRenderer.send('update-tray', `${city.name} - ${prayerNames[nextPrayer.name]} për ${hours}h ${minutes}m`);

  // Update prayer status every minute
  if (seconds === 0) {
    updatePrayerStatus();
  }
}
