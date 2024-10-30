import { Chart, registerables } from 'chart.js';
class ChartJsService {
  private chart: Chart;

  constructor() {

    Chart.register(...registerables);
    const chartContainer = document.createElement('canvas');
    this.chart = new Chart(chartContainer, {
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
  insertChart(container: HTMLDivElement) {
    container.appendChild(this.chart.canvas);
  }
}

const defaultChartJsService = new ChartJsService();

export const useChartJs = () => ({
  chartJsService: defaultChartJsService,
});

