const ctx = document.getElementById("myChart").getContext("2d");
import jsonData from "./data.json" assert { type: "json" };

var counter = 1;
const labels = [];
while (counter <= jsonData.data.totalsOfCurrentMonth.length) {
  labels.push(counter++);
}

var counter2 = 1;
const labels2 = [];
while (counter2 <= jsonData.data.totalsOfCurrentYear.length) {
  labels2.push(counter2++);
}

let gradient = ctx.createLinearGradient(0, 0, 0, 800);
gradient.addColorStop(0, "#ED89AF");
gradient.addColorStop(1, "rgba(237, 137, 175, 0.1)");

let gradient2 = ctx.createLinearGradient(0, 0, 0, 800);
gradient2.addColorStop(0, "#F36C36");
gradient2.addColorStop(0, "rgba(243, 108, 54, 0.1)");

let gradient3 = ctx.createLinearGradient(0, 0, 0, 800);
gradient3.addColorStop(0, "#2790C3");
gradient3.addColorStop(0, "rgba(39, 144, 195, 0.1)");

const data = {
  labels,
  datasets: [
    {
      data: jsonData.data.totalsOfCurrentMonth.map((data) => {
        return data.totalCashIn.TND;
      }),
      label: "Total transactions for this month",
      fill: true,
      backgroundColor: gradient,
      borderColor: "#E1727C",
      pointBackgroundColor: "#C74F7C",
      tension: 0.2,
    },
    {
      data: jsonData.data.totalsOfCurrentYear.map((data) => {
        return data.totalCashIn.TND;
      }),
      label: "Total transactions for this year",
      fill: true,
      backgroundColor: gradient2,
      borderColor: "#F36C36",
      pointBackgroundColor: "#E74F12",
      tension: 0.2,
      hidden: true,
    },
    {
      data: jsonData.data.totalsOfCurrentWeek.map((data) => {
        return data.totalCashIn.TND;
      }),
      label: "Total transactions for this week",
      fill: true,
      backgroundColor: gradient3,
      borderColor: "#2790C3",
      pointBackgroundColor: "#207AA6",
      tension: 0.2,
      hidden: true,
    },
  ],
};

let delayed;

const config = {
  type: "line",
  data: data,
  options: {
    animation: {
      onComplete: () => {
        delayed = true;
      },
      delay: (context) => {
        let delay = 0;
        if (context.type === "data" && context.mode === "default" && !delayed) {
          delay = context.dataIndex * 30 + context.datasetIndex * 200;
        }
        return delay;
      },
    },
    radius: 4,
    hitRadius: 7,
    hoverRadius: 9,
    responsive: true,
    scales: {
      y: {
        ticks: {
          callback: function (value) {
            return value + " TND";
          },
        },
      },
    },
  },
};

const myChart = new Chart(ctx, config);

console.log(jsonData);
