let h1 = document.querySelector("h1");

fetch("https://api.open-meteo.com/v1/forecast?latitude=45.0705&longitude=7.6868&daily=weather_code,sunrise,rain_sum,wind_speed_10m_max&hourly=wind_speed_10m,soil_temperature_0cm,temperature_2m,weather_code&current=temperature_2m,precipitation,weather_code,wind_speed_10m&timeformat=unixtime")
    .then(res => res.json())
    .then(data => {

        console.log(data);

        let precipitazioni = data.current.precipitation;
        
        let temperatura = data.current.temperature_2m;

        let vento = data.current.wind_speed_10m;

        let dataAttuale = new Date(data.current.time * 1000).toLocaleString('it-IT');

        h1.textContent = "Meteo Torino - Giornata " + dataAttuale;

        const meteoAttuale = document.getElementById('meteoAttuale').getContext('2d');

        new Chart(meteoAttuale, {
            type: 'bar', // GRAFICO A BARRE tipo tabella
            data: {
                labels: ['Precipitazioni', 'Temperatura', 'Vento'],
                datasets: [{
                    label: 'Valori attuali',
                    data: [precipitazioni, temperatura, vento],
                    backgroundColor: [
                        'rgba(54, 162, 235, 0.5)',
                        'rgba(255, 99, 132, 0.5)',
                        'rgba(255, 206, 86, 0.5)'
                    ],
                    borderColor: [
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 99, 132, 1)',
                        'rgba(255, 206, 86, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                indexAxis: 'x', // Se vuoi le barre orizzontali come tabella
                scales: {
                    x: {
                        beginAtZero: true
                    }
                }
            }
        });

    })
    .catch(error => console.error("Errore:", error));
