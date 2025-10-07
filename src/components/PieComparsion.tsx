import ReactECharts from 'echarts-for-react';
import React from 'react';

interface PieChartDatum {
  label: string;
  value: number;
}

interface FormatterParams {
  name: string;
  value: number;
  percent?: number;
}

interface Props {
  data: PieChartDatum[];
  colors: string[];
  title?: string;
  showInside?: boolean;
  insideFormatter?: (_params: FormatterParams) => string;
  outsideFormatter?: (_params: FormatterParams) => string;
}

const PieComparisonChart: React.FC<Props> = ({
  data,
  colors = [],
  title = '',
  showInside = true,
  insideFormatter,
  outsideFormatter,
}) => {
  const seriesData = data.map((item, index) => ({
    value: item.value,
    name: item.label,
    itemStyle: {
      color: colors[index] || undefined,
    },
  }));

  const transparentData = data.map(item => ({
    value: item.value,
    name: item.label,
    itemStyle: {
      color: 'transparent',
    },
  }));

  const option = {
    title: {
      text: title,
      left: 'center',
      top: 10,
      textStyle: {
        fontSize: 18,
        fontWeight: 'bold',
      },
    },
    tooltip: {
      trigger: 'item',
      formatter: ({ name, value }: { name: string; value: number }) =>
        `${name}: ${value.toLocaleString()}`,
    },
    legend: {
      orient: 'horizontal',
      bottom: 0,
      textStyle: {
        fontSize: 13,
      },
    },
    series: [
      {
        name: 'Data',
        type: 'pie',
        radius: ['0%', '60%'],
        avoidLabelOverlap: true,
        label: {
          show: showInside,
          position: 'inside',
          formatter: insideFormatter,
          fontSize: 14,
          fontWeight: 'bold',
          color: '#fff',
        },
        labelLine: {
          show: false,
        },
        data: seriesData,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.3)',
          },
        },
      },
      {
        name: 'Labels',
        type: 'pie',
        radius: ['60%', '60%'],
        label: {
          show: true,
          position: 'outside',
          formatter: outsideFormatter,
          fontSize: 13,
          fontWeight: 'bold',
          color: '#555',
        },
        labelLine: {
          show: true,
          length: 20,
          length2: 30,
          lineStyle: {
            color: '#888',
            width: 1.5,
          },
        },
        data: transparentData,
        emphasis: {
          disabled: true,
        },
        tooltip: {
          show: false,
        },
      },
    ],
  };

  return (
    <ReactECharts option={option} style={{ height: 400, width: '100%' }} />
  );
};

export default PieComparisonChart;
