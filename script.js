// Substitua 'YOUR_API_KEY' pela sua chave da API do OpenWeatherMap
const apiKey = 'YOUR_API_KEY';

// Seleciona os elementos do DOM
const weatherForm = document.getElementById('weather-form');
const cityInput = document.getElementById('city-input');
const weatherResult = document.getElementById('weather-result');
const cityNameElement = document.getElementById('city-name');
const temperatureElement = document.getElementById('temperature');
const descriptionElement = document.getElementById('description');
const humidityElement = document.getElementById('humidity');
const windSpeedElement = document.getElementById('wind-speed');

// Adiciona o evento de submit ao formulário
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const city = cityInput.value.trim();
    if (city) {
        fetchWeatherData(city);
    }
});

// Função para buscar os dados do clima usando a API OpenWeatherMap
async function fetchWeatherData(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=pt&appid=${apiKey}`);
        if (!response.ok) {
            throw new Error('Cidade não encontrada');
        }
        const data = await response.json();
        displayWeatherData(data);
    } catch (error) {
        alert(error.message);
    }
}

// Função para exibir os dados do clima na interface
function displayWeatherData(data) {
    cityNameElement.textContent = data.name;
    temperatureElement.textContent = Math.round(data.main.temp);
    descriptionElement.textContent = data.weather[0].description;
    humidityElement.textContent = data.main.humidity;
    windSpeedElement.textContent = (data.wind.speed * 3.6).toFixed(1); // Converte m/s para km/h
    weatherResult.classList.remove('hidden');
}
