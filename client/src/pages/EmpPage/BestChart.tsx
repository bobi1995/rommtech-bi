import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import numeral from "numeral";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BestChart = ({ data, type }: { data: any; type: string }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Коефициент",
      },
    },
  };
  const myData = {
    labels: data.map((el: any) => el.ItemNo),
    datasets: [
      {
        label: "Коеф.",
        data: data.map((el: any) =>
          numeral(el.AverageCoef * 100).format("0,0")
        ),
        backgroundColor:
          type === "best"
            ? "rgba(63, 195, 128, 0.5)"
            : "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  return <Bar options={options} data={myData} />;
};

export default BestChart;
