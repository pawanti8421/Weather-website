Overview:

This project is a dynamic and interactive weather website created using HTML, CSS, and JavaScript. 
It leverages the OpenWeather API to fetch real-time weather data for any location in the world. 
The site is designed to provide users with an intuitive and visually appealing interface to check current weather conditions, forecasts, and other meteorological information.


Features:

Real-Time Weather Data: The website fetches up-to-date weather information including temperature, humidity, wind speed, and atmospheric pressure.

Location Search: Users can search for weather information by entering a city name, and the website will display the weather details for that location.

Geolocation: The site can automatically detect the user's location (with permission) and display the local weather.

Weather Forecast: In addition to current conditions, the site provides a 5-day weather forecast, giving users an outlook on future weather.

Responsive Design: The website is fully responsive, ensuring a seamless experience on both desktop and mobile devices.

Interactive UI: With the use of JavaScript, the website offers interactive elements such as dynamic content updates, animations, and more.


Technologies Used:

HTML: Structures the content and layout of the website.

CSS: Styles the website, ensuring it is visually appealing and user-friendly. This includes the use of Flexbox and Grid for layout, as well as media queries for responsiveness.

JavaScript: Handles the functionality and interactivity of the website. This includes fetching data from the OpenWeather API, updating the DOM with weather information, and managing user interactions.
OpenWeather API: Provides the weather data used by the website, including current conditions and forecasts.


User Experience:

The homepage welcomes users with a clean and simple design. A search bar allows users to enter a city name, and with a click of a button, the weather information for that city is displayed. If users grant location access, the site will automatically display weather data for their current location.

Weather details are presented in a well-organized manner, with icons and colors to represent different weather conditions, making the information easy to understand at a glance. The forecast section provides a visual representation of the upcoming weather, helping users plan their activities accordingly.


How It Works:

Fetching Data: When a user enters a location or the site detects the user's geolocation, a request is sent to the OpenWeather API.

Processing Data: The received data is processed to extract relevant information such as temperature, weather description, and forecast details.

Updating the UI: The processed data is used to update the HTML elements dynamically, providing the user with real-time weather updates without needing to reload the page.
