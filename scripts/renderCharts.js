async function loadCSV(path) {
  const response = await fetch(path);
  const text = await response.text();
  const rows = text.trim().split("\n").slice(1);

  return rows.map(row => {
    const [region, year, value] = row.split(",");
    return {
      region,
      year: Number(year),
      value: Number(value)
    };
  });
}

async function renderPrevalenceChart() {
  const data = await loadCSV("/data/prevalence.csv");

  const labels = data.map(d => d.year);
  const values = data.map(d => d.value);

  const ctx = document.getElementById("prevalenceChart");

  new Chart(ctx, {
    type: "line",
    data: {
      labels,
      datasets: [{
        label: "People living with diabetes (millions)",
        data: values
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false },
        title: {
          display: true,
          text: "Global diabetes prevalence (estimated)"
        }
      }
    }
  });
}

renderPrevalenceChart();
