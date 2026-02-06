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
  const data = await loadCSV("/site/data/prevalence.csv");

  const labels = data.map(d => d.year);
  const values = data.map(d => d.people_with_diabetes_millions);

  const ctx = document.getElementById("prevalenceChart");
  if (!ctx) return;

  new Chart(ctx, {
    type: "line",
    data: {
      labels,
      datasets: [{
        label: "People living with diabetes (millions)",
        data: values,
        tension: 0.3
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
      },
      scales: {
        y: {
          title: {
            display: true,
            text: "Millions of people"
          }
        }
      }
    }
  });
}


renderPrevalenceChart();
