import { useState, useEffect } from 'react';
import { SunIcon, CloudIcon, BoltIcon, MoonIcon } from '@heroicons/react/24/outline';
import { Link } from '@inertiajs/react';

interface WeatherData {
  temp: number;
  feels_like: number;
  humidity: number;
  wind_speed: number;
  weather: {
    main: string;
    description: string;
    icon: string;
  }[];
  sunrise: number;
  sunset: number;
}

export default function WeatherWidget() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [location, setLocation] = useState<{ lat: number; lon: number } | null>(null);


  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude
          });
        },
        (err) => {
          setError('Location access denied. Using default location.');
          setLocation({ lat: 40.7128, lon: -74.0060 });
        }
      );
    } else {
      setError('Geolocation is not supported by this browser. Using default location.');
      setLocation({ lat: 40.7128, lon: -74.0060 });
    }
  }, []);

  useEffect(() => {
    if (!location) return;

    const fetchWeather = async () => {
      try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&units=imperial&appid=${import.meta.env.VITE_OPENWEATHER_API_KEY}`
        );
        console.log('response', response);

        if (!response.ok) {
          throw new Error('Failed to fetch weather data');
        }

        const data = await response.json();
        setWeather({
          temp: data.main.temp,
          feels_like: data.main.feels_like,
          humidity: data.main.humidity,
          wind_speed: data.wind.speed,
          weather: data.weather,
          sunrise: data.sys.sunrise,
          sunset: data.sys.sunset
        });
      } catch (err) {
        setError('Failed to load weather data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [location]);

  const getWeatherIcon = (main: string) => {
    switch (main.toLowerCase()) {
      case 'clear':
        return <SunIcon className="h-6 w-6 text-yellow-500" />;
      case 'clouds':
        return <CloudIcon className="h-6 w-6 text-gray-400" />;
      case 'rain':
        return <svg className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
        </svg>;
      case 'thunderstorm':
        return <BoltIcon className="h-6 w-6 text-yellow-400" />;
      default:
        return <SunIcon className="h-6 w-6 text-yellow-500" />;
    }
  };

  const formatTime = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="rounded-lg bg-white shadow dark:bg-gray-800">
      <div className="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">Weather Conditions</h3>
          {error && (
            <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
              {error}
            </span>
          )}
        </div>
      </div>
      <div className="p-6">
        {loading ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        ) : weather ? (
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                {weather.weather.length > 0 ? getWeatherIcon(weather.weather[0].main) : <SunIcon className="h-6 w-6 text-yellow-500" />}
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Current</p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  {Math.round(weather.temp)}°F
                  <span className="ml-2 text-sm font-normal text-gray-500 dark:text-gray-400">
                    (Feels like {Math.round(weather.feels_like)}°F)
                  </span>
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">
                  {weather.weather.length > 0 ? weather.weather[0].description : 'Clear sky'}
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-700 dark:text-gray-300">
                <span>Humidity</span>
                <span className="font-medium">{weather.humidity}%</span>
              </div>
              <div className="flex justify-between text-sm text-gray-700 dark:text-gray-300">
                <span>Wind</span>
                <span className="font-medium">{Math.round(weather.wind_speed)} mph</span>
              </div>
              <div className="flex justify-between text-sm text-gray-700 dark:text-gray-300">
                <span className="flex items-center">
                  <SunIcon className="h-4 w-4 text-yellow-500 mr-1" />
                  Sunrise
                </span>
                <span className="font-medium">{formatTime(weather.sunrise)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-700 dark:text-gray-300">
                <span className="flex items-center">
                  <MoonIcon className="h-4 w-4 text-indigo-500 mr-1" />
                  Sunset
                </span>
                <span className="font-medium">{formatTime(weather.sunset)}</span>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Weather data not available
          </p>
        )}
      </div>
      <div className="px-4 py-4 sm:px-6 border-t border-gray-200 dark:border-gray-700">
        <Link
          href="#"
          className="text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
        >
          View detailed forecast
          <span aria-hidden="true"> &rarr;</span>
        </Link>
      </div>
    </div>
  );
}
