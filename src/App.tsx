import { createSignal, For } from "solid-js";
import solidLogo from "./assets/solid.svg";
import viteLogo from "/vite.svg";
import "./App.css";

const API_KEY = "6da7994b31e7498bbaf142034252503";

function getApiUrl(endpoint: string, additional: string) {
  return `http://api.weatherapi.com/v1/${endpoint}?key=${API_KEY}` + additional;
}

function App() {
  const [coords, setCoords] = createSignal("Riverside, CA, USA");
  const [search, setSearch] = createSignal("");
  const [searchResults, setSearchResults] = createSignal<
    {
      id: number;
      name: string;
      region: string;
      country: string;
      lat: number;
      lon: number;
      url: string;
    }[]
  >([]);

  const [weather, setWeather] = createSignal<{
    location: {
      name: string;
      region: string;
      country: string;
      lat: number;
      lon: number;
      tz_id: string;
      localtime_epoch: number;
      localtime: string;
    };
    current: {
      last_updated_epoch: number;
      last_updated: string;
      temp_c: number;
      temp_f: number;
      is_day: number;
      condition: {
        text: string;
        icon: string;
        code: number;
      };
      wind_mph: number;
      wind_kph: number;
      wind_degree: number;
      wind_dir: string;
      pressure_mb: number;
      pressure_in: number;
      precip_mm: number;
      precip_in: number;
      humidity: number;
      cloud: number;
      feelslike_c: number;
      feelslike_f: number;
      windchill_c: number;
      windchill_f: number;
      heatindex_c: number;
      heatindex_f: number;
      dewpoint_c: number;
      dewpoint_f: number;
      vis_km: number;
      vis_miles: number;
      uv: number;
      gust_mph: number;
      gust_kph: number;
    };
    forecast: {
      forecastday: {
        date: string;
        date_epoch: number;
        day: {
          maxtemp_c: number;
          maxtemp_f: number;
          mintemp_c: number;
          mintemp_f: number;
          avgtemp_c: number;
          avgtemp_f: number;
          maxwind_mph: number;
          maxwind_kph: number;
          totalprecip_mm: number;
          totalprecip_in: number;
          totalsnow_cm: number;
          avgvis_km: number;
          avgvis_miles: number;
          avghumidity: number;
          daily_will_it_rain: number;
          daily_chance_of_rain: number;
          daily_will_it_snow: number;
          daily_chance_of_snow: number;
          condition: {
            text: string;
            icon: string;
            code: number;
          };
          uv: number;
        };
        astro: {
          sunrise: string;
          sunset: string;
          moonrise: string;
          moonset: string;
          moon_phase: string;
          moon_illumination: number;
          is_moon_up: number;
          is_sun_up: number;
        };
        hour: {
          time_epoch: number;
          time: string;
          temp_c: number;
          temp_f: number;
          is_day: number;
          condition: {
            text: string;
            icon: string;
            code: number;
          };
          wind_mph: number;
          wind_kph: number;
          wind_degree: number;
          wind_dir: string;
          pressure_mb: number;
          pressure_in: number;
          precip_mm: number;
          precip_in: number;
          snow_cm: number;
          humidity: number;
          cloud: number;
          feelslike_c: number;
          feelslike_f: number;
          windchill_c: number;
          windchill_f: number;
          heatindex_c: number;
          heatindex_f: number;
          dewpoint_c: number;
          dewpoint_f: number;
          will_it_rain: number;
          chance_of_rain: number;
          will_it_snow: number;
          chance_of_snow: number;
          vis_km: number;
          vis_miles: number;
          gust_mph: number;
          gust_kph: number;
          uv: number;
        }[];
      }[];
    };
  }>();

  function getWeather() {
    fetch(getApiUrl("forecast.json", "&q=" + encodeURIComponent(coords())))
      .then((response) => response.json())
      .then((data) => {
        setWeather(data);
        console.log(data);
      });
  }

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} class="logo" alt="Vite logo" />
        </a>
        <a href="https://solidjs.com" target="_blank">
          <img src={solidLogo} class="logo solid" alt="Solid logo" />
        </a>
      </div>
      <h1>Vite + Solid</h1>
      <div class="card">
        <h3>LAT LON</h3>
        <input id="lat" />
        <input id="lon" />
        <button
          onClick={() => {
            setCoords(`${lat.value},${lon.value}`);
            getWeather();
          }}
        >
          ENTER LATLON
        </button>
        <input
          type="text"
          value={search()}
          onChange={(e) => {
            setSearch(e.target.value);
            fetch(
              getApiUrl("search.json", "&q=" + encodeURIComponent(search()))
            )
              .then((response) => response.json())
              .then((data) => setSearchResults(data));
          }}
        />
        <For each={searchResults()}>
          {(result) => (
            <div
              onClick={() => {
                setCoords(`${result.lat},${result.lon}`);
                getWeather();
              }}
            >
              {result.name}, {result.country} ({result.region})
            </div>
          )}
        </For>
      </div>
      <div class="read-the-docs">
        <div>{weather()?.location.name}</div>
        <div>{weather()?.current.temp_c}</div>
        <div>{weather()?.current.condition.text}</div>
        <div>
          <img src={weather()?.current.condition.icon} alt="weather icon" />
        </div>
        <div>{weather()?.current.temp_f}</div>
        <div>{weather()?.current.feelslike_c}</div>
        <div>{weather()?.current.feelslike_f}</div>
        <div>{weather()?.current.humidity}</div>
        <div>{weather()?.current.wind_mph}</div>
        <div>{weather()?.current.wind_kph}</div>
        <div>{weather()?.current.wind_dir}</div>

        <For each={weather()?.forecast.forecastday}>
          {(day) => (
            <div>
              <div>
                {day.date}
                <img src={day.day.condition.icon} alt="weather icon" />
                {day.day.condition.text}
                <br />
                {day.day.maxtemp_c}
                <br />
                {day.day.mintemp_c}
                <br />
                {day.day.avgtemp_c}
                <br />
                {day.day.maxwind_mph}
                <br />
                {day.day.maxwind_kph}
                <br />
                {day.day.totalprecip_mm}
                <br />
                {day.day.totalprecip_in}
                <br />
                {day.day.totalsnow_cm}
                <br />

                <For each={day.hour}>
                  {(hour) => (
                    <div>
                      {hour.time} {hour.temp_f}
                      <img src={hour.condition.icon} alt="weather icon" />
                      {hour.condition.text}
                    </div>
                  )}
                </For>
              </div>
            </div>
          )}
        </For>
      </div>
    </>
  );
}

export default App;
