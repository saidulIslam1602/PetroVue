/**
 * Chart Component
 * Data visualization component using Recharts
 * Designed for oil & gas industry operational metrics
 */

import React from 'react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { ChartContainer, ChartTitle, ChartError } from './Chart.styles';

export interface ChartData {
  name: string;
  value: number;
  [key: string]: string | number;
}

export interface ChartProps {
  type: 'line' | 'area' | 'bar' | 'pie';
  data: ChartData[];
  title?: string;
  width?: string | number;
  height?: string | number;
  xAxisKey?: string;
  yAxisKey?: string;
  colors?: string[];
  showLegend?: boolean;
  showGrid?: boolean;
  loading?: boolean;
  error?: string;
  className?: string;
  'data-testid'?: string;
}

const defaultColors = ['#0066cc', '#ff6600', '#4caf50', '#ff9800', '#f44336', '#2196f3'];

export const Chart: React.FC<ChartProps> = ({
  type,
  data,
  title,
  width = '100%',
  height = 300,
  xAxisKey = 'name',
  yAxisKey = 'value',
  colors = defaultColors,
  showLegend = true,
  showGrid = true,
  loading = false,
  error,
  className,
  'data-testid': testId,
}) => {
  if (loading) {
    return (
      <ChartContainer className={className} data-testid={testId}>
        {title && <ChartTitle>{title}</ChartTitle>}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          height: typeof height === 'number' ? `${height}px` : height,
          color: '#666'
        }}>
          Loading chart data...
        </div>
      </ChartContainer>
    );
  }

  if (error) {
    return (
      <ChartContainer className={className} data-testid={testId}>
        {title && <ChartTitle>{title}</ChartTitle>}
        <ChartError>{error}</ChartError>
      </ChartContainer>
    );
  }

  const renderChart = () => {
    const commonProps = {
      width: typeof width === 'number' ? width : undefined,
      height: typeof height === 'number' ? height : undefined,
      data,
    };

    switch (type) {
      case 'line':
        return (
          <LineChart {...commonProps}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />}
            <XAxis dataKey={xAxisKey} stroke="#666" />
            <YAxis stroke="#666" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#fff', 
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }} 
            />
            {showLegend && <Legend />}
            {Object.keys(data[0] || {}).filter(key => key !== xAxisKey).map((key, index) => (
              <Line
                key={key}
                type="monotone"
                dataKey={key}
                stroke={colors[index % colors.length]}
                strokeWidth={2}
                dot={{ fill: colors[index % colors.length], strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: colors[index % colors.length], strokeWidth: 2 }}
              />
            ))}
          </LineChart>
        );

      case 'area':
        return (
          <AreaChart {...commonProps}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />}
            <XAxis dataKey={xAxisKey} stroke="#666" />
            <YAxis stroke="#666" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#fff', 
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }} 
            />
            {showLegend && <Legend />}
            {Object.keys(data[0] || {}).filter(key => key !== xAxisKey).map((key, index) => (
              <Area
                key={key}
                type="monotone"
                dataKey={key}
                stackId="1"
                stroke={colors[index % colors.length]}
                fill={colors[index % colors.length]}
                fillOpacity={0.6}
              />
            ))}
          </AreaChart>
        );

      case 'bar':
        return (
          <BarChart {...commonProps}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />}
            <XAxis dataKey={xAxisKey} stroke="#666" />
            <YAxis stroke="#666" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#fff', 
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }} 
            />
            {showLegend && <Legend />}
            {Object.keys(data[0] || {}).filter(key => key !== xAxisKey).map((key, index) => (
              <Bar
                key={key}
                dataKey={key}
                fill={colors[index % colors.length]}
                radius={[4, 4, 0, 0]}
              />
            ))}
          </BarChart>
        );

      case 'pie':
        return (
          <PieChart {...commonProps}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={showLegend ? false : true}
              outerRadius={80}
              fill="#8884d8"
              dataKey={yAxisKey}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#fff', 
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }} 
            />
            {showLegend && <Legend />}
          </PieChart>
        );

      default:
        return null;
    }
  };

  const chartElement = renderChart();
  
  if (!chartElement) {
    return (
      <ChartContainer className={className} data-testid={testId}>
        {title && <ChartTitle>{title}</ChartTitle>}
        <div>No chart data available</div>
      </ChartContainer>
    );
  }

  return (
    <ChartContainer className={className} data-testid={testId}>
      {title && <ChartTitle>{title}</ChartTitle>}
      <ResponsiveContainer width={width} height={height}>
        {chartElement}
      </ResponsiveContainer>
    </ChartContainer>
  );
};

export default Chart;
