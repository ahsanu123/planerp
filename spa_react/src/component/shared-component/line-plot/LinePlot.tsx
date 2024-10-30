import { observer } from "mobx-react-lite";
import { useCallback, useEffect, useRef } from "react";
import { useChartJs } from "../../../shared/hooks/use-chart-js";
import { Chart, registerables } from "chart.js";

const LinePlotComponent: React.FC = () => {

  const {
    chartJsService,
  } = useChartJs();

  const divref = useRef<HTMLDivElement>(null);
  const chartRef = useRef<Chart | null>(null);

  const destroyChart = () => {

    if (chartRef.current) {
      chartRef.current.destroy();
      chartRef.current = null;
    }

  };

  const nodeRef = useCallback((node: HTMLCanvasElement) => {
    if (node) {
      Chart.register(...registerables);
      chartRef.current = new Chart(node, {
        type: 'bar',
        data: {
          labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
          datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        },
      });

    }

  }, []);

  useEffect(() => {
    if (!divref.current) return;
    chartJsService.insertChart(divref.current);
  }, []);

  return (
    <>
      Line Plot Component
      <div
        ref={divref}
      >
      </div>
    </>
  );

};

export const LinePlot = observer(LinePlotComponent);
