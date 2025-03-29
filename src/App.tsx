import { createSignal, For, Show } from "solid-js";
import viteLogo from "/vite.svg";
import "./App.css";

enum WeatherCondition {
  Sunny = 1000,
  PartlyCloudy = 1003,
  Cloudy = 1006,
  Overcast = 1009,
  Mist = 1030,
  PatchyRainPossible = 1063,
  PatchySnowPossible = 1066,
  PatchySleetPossible = 1069,
  PatchyFreezingDrizzlePossible = 1072,
  ThunderyOutbreaksPossible = 1087,
  BlowingSnow = 1114,
  Blizzard = 1117,
  Fog = 1135,
  FreezingFog = 1147,
  PatchyLightDrizzle = 1150,
  LightDrizzle = 1153,
  FreezingDrizzle = 1168,
  HeavyFreezingDrizzle = 1171,
  PatchyLightRain = 1180,
  LightRain = 1183,
  ModerateRainAtTimes = 1186,
  ModerateRain = 1189,
  HeavyRainAtTimes = 1192,
  HeavyRain = 1195,
  LightFreezingRain = 1198,
  ModerateOrHeavyFreezingRain = 1201,
  LightSleet = 1204,
  ModerateOrHeavySleet = 1207,
  PatchyLightSnow = 1210,
  LightSnow = 1213,
  PatchyModerateSnow = 1216,
  ModerateSnow = 1219,
  PatchyHeavySnow = 1222,
  HeavySnow = 1225,
  IcePellets = 1237,
  LightRainShower = 1240,
  ModerateOrHeavyRainShower = 1243,
  TorrentialRainShower = 1246,
  LightSleetShowers = 1249,
  ModerateOrHeavySleetShowers = 1252,
  LightSnowShowers = 1255,
  ModerateOrHeavySnowShowers = 1258,
  LightShowersOfIcePellets = 1261,
  ModerateOrHeavyShowersOfIcePellets = 1264,
  PatchyLightRainWithThunder = 1273,
  ModerateOrHeavyRainWithThunder = 1276,
  PatchyLightSnowWithThunder = 1279,
  ModerateOrHeavySnowWithThunder = 1282,
}

const API_KEY = "6da7994b31e7498bbaf142034252503";

function getApiUrl(endpoint: string, additional: string) {
  return (
    `https://api.weatherapi.com/v1/${endpoint}?key=${API_KEY}` + additional
  );
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
        code: WeatherCondition;
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
    setWeather(undefined);
    fetch(getApiUrl("forecast.json", "&q=" + encodeURIComponent(coords())))
      .then((response) => response.json())
      .then((data) => {
        setWeather(data);
        switch (data.current.condition.code) {
          case WeatherCondition.Sunny:
            console.log("Sunny");
            if (data.current.is_day === 1) {
              window.document.body.setAttribute("data-weather", "sunny-day");
            } else {
              window.document.body.setAttribute("data-weather", "clear-nite");
            }
            break;
          case WeatherCondition.PartlyCloudy:
            console.log("Partly Cloudy");
            if (data.current.is_day === 1) {
              window.document.body.setAttribute(
                "data-weather",
                "partly-cloudy-day"
              );
            } else {
              window.document.body.setAttribute(
                "data-weather",
                "partly-cloudy-nite"
              );
            }
            break;
          case WeatherCondition.Cloudy:
          case WeatherCondition.Overcast:
          case WeatherCondition.Mist:
          case WeatherCondition.Fog:
          case WeatherCondition.FreezingFog:
            console.log("Cloudy");
            if (data.current.is_day === 1) {
              window.document.body.setAttribute("data-weather", "cloudy");
            } else {
              window.document.body.setAttribute("data-weather", "cloudy");
            }
            break;
          case WeatherCondition.HeavyRain:
          case WeatherCondition.HeavyRainAtTimes:
          case WeatherCondition.TorrentialRainShower:
          case WeatherCondition.ModerateOrHeavyRainShower:
          case WeatherCondition.ModerateOrHeavyFreezingRain:
          case WeatherCondition.LightFreezingRain:
          case WeatherCondition.FreezingDrizzle:
          case WeatherCondition.HeavyFreezingDrizzle:
          case WeatherCondition.PatchyLightDrizzle:
          case WeatherCondition.LightRainShower:
          case WeatherCondition.LightRain:
          case WeatherCondition.ModerateRainAtTimes:
          case WeatherCondition.ModerateRain:
          case WeatherCondition.PatchyLightRain:
          case WeatherCondition.PatchyRainPossible:
            window.document.body.setAttribute("data-weather", "rainy");
            break;
          case WeatherCondition.HeavySnow:
          case WeatherCondition.PatchyHeavySnow:
          case WeatherCondition.PatchyModerateSnow:
          case WeatherCondition.PatchyLightSnow:
          case WeatherCondition.LightSnow:
          case WeatherCondition.BlowingSnow:
          case WeatherCondition.ModerateSnow:
          case WeatherCondition.ModerateOrHeavySnowShowers:
          case WeatherCondition.LightSnowShowers:
          case WeatherCondition.PatchyLightSnowWithThunder:
          case WeatherCondition.ModerateOrHeavySnowWithThunder:
          case WeatherCondition.PatchySnowPossible:
          case WeatherCondition.IcePellets:
          case WeatherCondition.LightShowersOfIcePellets:
          case WeatherCondition.ModerateOrHeavyShowersOfIcePellets:
            window.document.body.setAttribute("data-weather", "snowy");
            break;
          case WeatherCondition.ThunderyOutbreaksPossible:
          case WeatherCondition.PatchyLightRainWithThunder:
          case WeatherCondition.ModerateOrHeavyRainWithThunder:
            window.document.body.setAttribute("data-weather", "stormy");
            break;
          case WeatherCondition.PatchySleetPossible:
          case WeatherCondition.LightSleet:
          case WeatherCondition.ModerateOrHeavySleet:
          case WeatherCondition.LightSleetShowers:
          case WeatherCondition.ModerateOrHeavySleetShowers:
            window.document.body.setAttribute("data-weather", "snowy");
            break;
          case WeatherCondition.Blizzard:
            window.document.body.setAttribute("data-weather", "snowy");
            break;
          default:
            console.log(
              "Unknown weather condition:",
              data.current.condition.code
            );
            window.document.body.setAttribute("data-weather", "unknown");
        }
        console.log(data);
      });
  }

  function myLoc() {
    setWeather(undefined);
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    function success(pos: GeolocationPosition) {
      const crd = pos.coords;

      console.log(`Latitude : ${crd.latitude}`);
      console.log(`Longitude: ${crd.longitude}`);
      setCoords(`${crd.latitude},${crd.longitude}`);
      getWeather();
    }

    function error(err: GeolocationPositionError) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    navigator.geolocation.getCurrentPosition(success, error, options);
  }
  myLoc();
  return (
    <div class="weather-container">
      <div class="weather-header">
        <button
          onClick={() => {
            myLoc();
          }}
        >
          ⮙
        </button>
        <div class="search-container">
          <input
            placeholder="Search for a location"
            type="text"
            value={search()}
            onInput={(e) => {
              setSearch(e.target.value);
              fetch(
                getApiUrl("search.json", "&q=" + encodeURIComponent(search()))
              )
                .then((response) => response.json())
                .then((data) => setSearchResults(data));
            }}
          />
          <Show when={searchResults().length > 0}>
            <div class="search-results">
              <For each={searchResults()}>
                {(result) => (
                  <div
                    onClick={() => {
                      setCoords(`${result.lat},${result.lon}`);
                      getWeather();
                      setSearchResults([]);
                      setSearch("");
                    }}
                  >
                    {result.name}, {result.country} ({result.region})
                  </div>
                )}
              </For>
            </div>
          </Show>
        </div>
      </div>
      <Show
        fallback={
          <div
            style={{
              height: "50vh",
              display: "flex",
              "justify-content": "center",
              "align-items": "center",
            }}
          >
            Loading...
          </div>
        }
        when={weather()}
      >
        <div class="weather-top">
          <h1>{weather()?.current.temp_f}°F</h1>
          <div>
            <div
              style={{
                "font-size": "1.2rem",
              }}
            >
              {weather()?.location.name}, {weather()?.location.region},{" "}
              {weather()?.location.country}
            </div>
            <div>
              H: {weather()?.forecast.forecastday[0].day.maxtemp_f}°F, L:{" "}
              {weather()?.forecast.forecastday[0].day.mintemp_f}°F
            </div>
            <div>Feels like: {weather()?.current.feelslike_f}°F</div>
            <div>{weather()?.current.condition.text}</div>
          </div>
        </div>
        <hr />
        <div class="info-container">
          <div class="info-card">
            <h2>{weather()?.current.humidity}%</h2>
            <div>humidity</div>
          </div>
          <div class="info-card">
            <h2>{weather()?.current.wind_mph} mph</h2>
            <div>wind speed</div>
          </div>
          <div class="info-card">
            <h2>{weather()?.current.wind_dir}</h2>
            <div>wind direction</div>
          </div>
          <div class="info-card">
            <h2>{weather()?.current.precip_in} in</h2>
            <div>precipitation</div>
          </div>

          <div class="info-card">
            <h2>{weather()?.current.uv}</h2>
            <div>uv index</div>
          </div>

          <div class="info-card">
            <h2>{weather()?.current.vis_miles} mi</h2>
            <div>visibility</div>
          </div>
        </div>

        <hr />
        <div class="hourly-forecast">
          <For each={weather()?.forecast.forecastday[0].hour}>
            {(hour) => (
              <div>
                <div>{hour.temp_f}°F</div>
                <div>{getTime(hour.time)}</div>
                <div>
                  <img src={hour.condition.icon} alt="weather icon" />
                </div>
                <div>{hour.condition.text}</div>
              </div>
            )}
          </For>
        </div>
      </Show>
    </div>
  );
}

export default App;

function getTime(time: string) {
  const date = new Date(time);
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
}
