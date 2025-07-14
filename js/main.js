fetch("https://api.open-meteo.com/v1/forecast?latitude=45.0705&longitude=7.6868&daily=weather_code,sunrise,rain_sum,wind_speed_10m_max&hourly=wind_speed_10m,soil_temperature_0cm,temperature_2m,weather_code&current=temperature_2m,precipitation,weather_code,wind_speed_10m")
  .then(res => res.json())
  .then(data => {

    console.log(data);

  })
  .catch(error => console.error("Errore:", error));
