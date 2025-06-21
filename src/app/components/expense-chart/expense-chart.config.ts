import {
  ApexChart,
  ApexLegend,
  ApexResponsive,
  ApexXAxis,
  ApexTitleSubtitle,
  ApexNonAxisChartSeries,
  ApexAxisChartSeries,
  ApexDataLabels,
  ApexPlotOptions,
  ApexFill,
  ApexStroke,
  ApexTooltip,
  ApexGrid,
  ApexYAxis,
} from 'ng-apexcharts';
import { Expense } from '../../models/expense.model';

export type ChartOptions = {
  series: ApexAxisChartSeries | ApexNonAxisChartSeries;
  chart: ApexChart;
  labels?: string[];
  xaxis?: ApexXAxis;
  responsive?: ApexResponsive[];
  legend?: ApexLegend;
  title?: ApexTitleSubtitle;
  plotOptions?: ApexPlotOptions;
  dataLabels?: ApexDataLabels;
  fill?: ApexFill;
  stroke?: ApexStroke;
  tooltip?: ApexTooltip;
  grid?: ApexGrid;
  yaxis?: ApexYAxis;
};

export const pieChartConfig = (
  labels: string[],
  values: number[]
): Partial<ChartOptions> => ({
  series: values,
  chart: {
    type: 'pie',
    width: '100%',
    height: 300,
  },
  labels,
  legend: {
    position: 'right',
    fontSize: '14px',
  },
  responsive: [
    {
      breakpoint: 768,
      options: {
        chart: { height: 250 },
        legend: { position: 'bottom' },
      },
    },
  ],
});

export const lineChartConfig = (
  labels: string[],
  data: number[]
): Partial<ChartOptions> => ({
  series: [{ name: 'Expenses', data }],
  chart: { type: 'line', width: '100%', height: 350 },
  xaxis: { categories: labels },
  legend: { position: 'top', fontSize: '14px' },
  responsive: [
    {
      breakpoint: 768,
      options: {
        chart: { height: 280 },
        legend: { position: 'bottom' },
      },
    },
  ],
});

export function getMonthlyLineChartData(
  expenses: Expense[]
): Partial<ChartOptions> {
  const monthlyMap = new Map<string, number>();

  for (const exp of expenses) {
    const date = new Date(exp.date);
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
      2,
      '0'
    )}`;
    monthlyMap.set(key, (monthlyMap.get(key) || 0) + exp.amount);
  }

  const sorted = Array.from(monthlyMap.entries()).sort(
    ([a], [b]) => new Date(a + '-01').getTime() - new Date(b + '-01').getTime()
  );

  const labels = sorted.map(([key]) => {
    const [year, month] = key.split('-').map(Number);
    return new Date(year, month - 1).toLocaleString('default', {
      month: 'short',
      year: 'numeric',
    });
  });

  const data = sorted.map(([, value]) => value);

  return lineChartConfig(labels, data);
}

export function getStackedMonthlyBreakdownData(
  expenses: Expense[]
): Partial<ChartOptions> {
  const categoryMap: Record<string, Record<string, number>> = {};

  for (const expense of expenses) {
    const date = new Date(expense.date);
    const month = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
      2,
      '0'
    )}`;

    if (!categoryMap[expense.category]) {
      categoryMap[expense.category] = {};
    }

    categoryMap[expense.category][month] =
      (categoryMap[expense.category][month] || 0) + expense.amount;
  }

  const allMonths = Array.from(
    new Set(
      Object.values(categoryMap)
        .flatMap((map) => Object.keys(map))
        .sort(
          (a, b) =>
            new Date(a + '-01').getTime() - new Date(b + '-01').getTime()
        )
    )
  );

  const series = Object.entries(categoryMap).map(([category, dataMap]) => ({
    name: category,
    data: allMonths.map((month) => dataMap[month] || 0),
  }));

  const labels = allMonths.map((m) =>
    new Date(m + '-01').toLocaleString('default', {
      month: 'short',
      year: 'numeric',
    })
  );

  return {
    series,
    chart: {
      type: 'bar',
      stacked: true,
      height: 350,
    },
    xaxis: {
      categories: labels,
    },
    legend: {
      position: 'top',
      fontSize: '14px',
    },
  };
}
