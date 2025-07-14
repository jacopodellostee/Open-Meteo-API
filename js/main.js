let h1 = document.querySelector("h1");

let tbody = document.getElementById("meteoTable");

fetch("https://api.open-meteo.com/v1/forecast?latitude=45.0705&longitude=7.6868&daily=weather_code,sunrise,rain_sum,wind_speed_10m_max&hourly=wind_speed_10m,soil_temperature_0cm,temperature_2m,weather_code&current=temperature_2m,precipitation,weather_code,wind_speed_10m&timeformat=unixtime")
    .then(res => res.json())
    .then(data => {

        console.log(data);

        let precipitazioni = data.current.precipitation;

        let temperatura = data.current.temperature_2m;

        let vento = data.current.wind_speed_10m;

        let dataAttuale = new Date(data.current.time * 1000).toLocaleString('it-IT');

        h1.textContent = "Meteo Torino - Giornata " + dataAttuale;

        // Riempio la tabella HTML
        const rows = [
            ["Precipitazioni", precipitazioni + " " + data.current_units.precipitation],
            ["Temperatura", temperatura + " " + data.current_units.temperature_2m],
            ["Vento", vento + " " + data.current_units.wind_speed_10m],
        ];

        rows.forEach(row => {
            let tr = document.createElement("tr");
            row.forEach(cell => {
                let td = document.createElement("td");
                td.textContent = cell;
                tr.appendChild(td);
            });
            tbody.appendChild(tr);
        });

        // --------------------
        // Grafico Giornaliero
        // --------------------
        const dailyLabels = data.daily.time.map(unix => {
            let date = new Date(unix * 1000);
            return date.toLocaleDateString('it-IT');
        });

        const dailyRain = data.daily.rain_sum;
        const dailyWind = data.daily.wind_speed_10m_max;

        new Chart(document.getElementById("dailyChart"), {
            type: "line",
            data: {
                labels: dailyLabels,
                datasets: [
                    {
                        label: "Pioggia (mm)",
                        data: dailyRain,
                        borderColor: "rgba(54, 162, 235, 1)",
                        backgroundColor: "rgba(54, 162, 235, 0.2)",
                        fill: true,
                        tension: 0.4
                    },
                    {
                        label: "Vento max (km/h)",
                        data: dailyWind,
                        borderColor: "rgba(255, 206, 86, 1)",
                        backgroundColor: "rgba(255, 206, 86, 0.2)",
                        fill: true,
                        tension: 0.4
                    }
                ]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

        // --------------------
        // Grafico Orario
        // --------------------
        const hourlyLabels = data.hourly.time.slice(0, 24).map(unix => {
            let date = new Date(unix * 1000);
            return date.getHours() + ":00";
        });

        const hourlyTemp = data.hourly.temperature_2m.slice(0, 24);

        new Chart(document.getElementById("hourlyChart"), {
            type: "line",
            data: {
                labels: hourlyLabels,
                datasets: [
                    {
                        label: "Temperatura (°C)",
                        data: hourlyTemp,
                        borderColor: "rgba(255, 99, 132, 1)",
                        backgroundColor: "rgba(255, 99, 132, 0.2)",
                        fill: true,
                        tension: 0.4
                    }
                ]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: false
                    }
                }
            }
        });

    })
    .catch(error => console.error("Errore:", error));
