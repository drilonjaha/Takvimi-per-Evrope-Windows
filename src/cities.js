const countries = [
  { code: 'XK', name: 'Kosova', flag: '🇽🇰', timezone: 'Europe/Belgrade' },
  { code: 'CH', name: 'Zvicra', flag: '🇨🇭', timezone: 'Europe/Zurich' },
  { code: 'DE', name: 'Gjermania', flag: '🇩🇪', timezone: 'Europe/Berlin' },
  { code: 'AT', name: 'Austria', flag: '🇦🇹', timezone: 'Europe/Vienna' },
  { code: 'FR', name: 'Franca', flag: '🇫🇷', timezone: 'Europe/Paris' },
  { code: 'NL', name: 'Holanda', flag: '🇳🇱', timezone: 'Europe/Amsterdam' },
  { code: 'BE', name: 'Belgjika', flag: '🇧🇪', timezone: 'Europe/Brussels' },
  { code: 'SE', name: 'Suedia', flag: '🇸🇪', timezone: 'Europe/Stockholm' },
  { code: 'NO', name: 'Norvegjia', flag: '🇳🇴', timezone: 'Europe/Oslo' },
  { code: 'DK', name: 'Danimarka', flag: '🇩🇰', timezone: 'Europe/Copenhagen' },
  { code: 'GB', name: 'Britania', flag: '🇬🇧', timezone: 'Europe/London' },
  { code: 'IT', name: 'Italia', flag: '🇮🇹', timezone: 'Europe/Rome' },
  { code: 'FI', name: 'Finlanda', flag: '🇫🇮', timezone: 'Europe/Helsinki' }
];

const cities = [
  // Kosovo
  { id: 'prishtina', name: 'Prishtina', country: 'XK', latitude: 42.6629, longitude: 21.1655 },
  { id: 'prizren', name: 'Prizren', country: 'XK', latitude: 42.2139, longitude: 20.7397 },
  { id: 'peja', name: 'Peja', country: 'XK', latitude: 42.6592, longitude: 20.2883 },
  { id: 'gjakova', name: 'Gjakova', country: 'XK', latitude: 42.3803, longitude: 20.4308 },
  { id: 'mitrovica', name: 'Mitrovica', country: 'XK', latitude: 42.8914, longitude: 20.8660 },
  { id: 'ferizaj', name: 'Ferizaj', country: 'XK', latitude: 42.3702, longitude: 21.1553 },
  { id: 'gjilan', name: 'Gjilan', country: 'XK', latitude: 42.4635, longitude: 21.4694 },

  // Switzerland
  { id: 'zurich', name: 'Zürich', country: 'CH', latitude: 47.3769, longitude: 8.5417 },
  { id: 'geneva', name: 'Genève', country: 'CH', latitude: 46.2044, longitude: 6.1432 },
  { id: 'basel', name: 'Basel', country: 'CH', latitude: 47.5596, longitude: 7.5886 },
  { id: 'bern', name: 'Bern', country: 'CH', latitude: 46.9480, longitude: 7.4474 },
  { id: 'lausanne', name: 'Lausanne', country: 'CH', latitude: 46.5197, longitude: 6.6323 },
  { id: 'winterthur', name: 'Winterthur', country: 'CH', latitude: 47.5001, longitude: 8.7240 },
  { id: 'stgallen', name: 'St. Gallen', country: 'CH', latitude: 47.4245, longitude: 9.3767 },
  { id: 'lugano', name: 'Lugano', country: 'CH', latitude: 46.0037, longitude: 8.9511 },

  // Germany
  { id: 'berlin', name: 'Berlin', country: 'DE', latitude: 52.5200, longitude: 13.4050 },
  { id: 'munich', name: 'München', country: 'DE', latitude: 48.1351, longitude: 11.5820 },
  { id: 'frankfurt', name: 'Frankfurt', country: 'DE', latitude: 50.1109, longitude: 8.6821 },
  { id: 'hamburg', name: 'Hamburg', country: 'DE', latitude: 53.5511, longitude: 9.9937 },
  { id: 'cologne', name: 'Köln', country: 'DE', latitude: 50.9375, longitude: 6.9603 },
  { id: 'dusseldorf', name: 'Düsseldorf', country: 'DE', latitude: 51.2277, longitude: 6.7735 },
  { id: 'stuttgart', name: 'Stuttgart', country: 'DE', latitude: 48.7758, longitude: 9.1829 },
  { id: 'dortmund', name: 'Dortmund', country: 'DE', latitude: 51.5136, longitude: 7.4653 },

  // Austria
  { id: 'vienna', name: 'Wien', country: 'AT', latitude: 48.2082, longitude: 16.3738 },
  { id: 'graz', name: 'Graz', country: 'AT', latitude: 47.0707, longitude: 15.4395 },
  { id: 'linz', name: 'Linz', country: 'AT', latitude: 48.3069, longitude: 14.2858 },
  { id: 'salzburg', name: 'Salzburg', country: 'AT', latitude: 47.8095, longitude: 13.0550 },
  { id: 'innsbruck', name: 'Innsbruck', country: 'AT', latitude: 47.2692, longitude: 11.4041 },

  // France
  { id: 'paris', name: 'Paris', country: 'FR', latitude: 48.8566, longitude: 2.3522 },
  { id: 'marseille', name: 'Marseille', country: 'FR', latitude: 43.2965, longitude: 5.3698 },
  { id: 'lyon', name: 'Lyon', country: 'FR', latitude: 45.7640, longitude: 4.8357 },
  { id: 'strasbourg', name: 'Strasbourg', country: 'FR', latitude: 48.5734, longitude: 7.7521 },
  { id: 'toulouse', name: 'Toulouse', country: 'FR', latitude: 43.6047, longitude: 1.4442 },

  // Netherlands
  { id: 'amsterdam', name: 'Amsterdam', country: 'NL', latitude: 52.3676, longitude: 4.9041 },
  { id: 'rotterdam', name: 'Rotterdam', country: 'NL', latitude: 51.9244, longitude: 4.4777 },
  { id: 'hague', name: 'Den Haag', country: 'NL', latitude: 52.0705, longitude: 4.3007 },
  { id: 'utrecht', name: 'Utrecht', country: 'NL', latitude: 52.0907, longitude: 5.1214 },

  // Belgium
  { id: 'brussels', name: 'Bruxelles', country: 'BE', latitude: 50.8503, longitude: 4.3517 },
  { id: 'antwerp', name: 'Antwerpen', country: 'BE', latitude: 51.2194, longitude: 4.4025 },
  { id: 'ghent', name: 'Gent', country: 'BE', latitude: 51.0543, longitude: 3.7174 },
  { id: 'liege', name: 'Liège', country: 'BE', latitude: 50.6292, longitude: 5.5797 },

  // Sweden
  { id: 'stockholm', name: 'Stockholm', country: 'SE', latitude: 59.3293, longitude: 18.0686 },
  { id: 'gothenburg', name: 'Göteborg', country: 'SE', latitude: 57.7089, longitude: 11.9746 },
  { id: 'malmo', name: 'Malmö', country: 'SE', latitude: 55.6050, longitude: 13.0038 },

  // Norway
  { id: 'oslo', name: 'Oslo', country: 'NO', latitude: 59.9139, longitude: 10.7522 },
  { id: 'bergen', name: 'Bergen', country: 'NO', latitude: 60.3913, longitude: 5.3221 },

  // Denmark
  { id: 'copenhagen', name: 'København', country: 'DK', latitude: 55.6761, longitude: 12.5683 },
  { id: 'aarhus', name: 'Aarhus', country: 'DK', latitude: 56.1629, longitude: 10.2039 },

  // UK
  { id: 'london', name: 'London', country: 'GB', latitude: 51.5074, longitude: -0.1278 },
  { id: 'birmingham', name: 'Birmingham', country: 'GB', latitude: 52.4862, longitude: -1.8904 },
  { id: 'manchester', name: 'Manchester', country: 'GB', latitude: 53.4808, longitude: -2.2426 },
  { id: 'leeds', name: 'Leeds', country: 'GB', latitude: 53.8008, longitude: -1.5491 },

  // Italy
  { id: 'rome', name: 'Roma', country: 'IT', latitude: 41.9028, longitude: 12.4964 },
  { id: 'milan', name: 'Milano', country: 'IT', latitude: 45.4642, longitude: 9.1900 },
  { id: 'turin', name: 'Torino', country: 'IT', latitude: 45.0703, longitude: 7.6869 },
  { id: 'florence', name: 'Firenze', country: 'IT', latitude: 43.7696, longitude: 11.2558 },

  // Finland
  { id: 'helsinki', name: 'Helsinki', country: 'FI', latitude: 60.1699, longitude: 24.9384 },
  { id: 'vantaa', name: 'Vantaa', country: 'FI', latitude: 60.2934, longitude: 25.0378 }
];

function getCitiesByCountry() {
  const grouped = {};
  countries.forEach(country => {
    grouped[country.code] = {
      ...country,
      cities: cities.filter(city => city.country === country.code)
    };
  });
  return grouped;
}

function getCity(id) {
  return cities.find(city => city.id === id);
}

function getCountry(code) {
  return countries.find(country => country.code === code);
}

module.exports = { countries, cities, getCitiesByCountry, getCity, getCountry };
