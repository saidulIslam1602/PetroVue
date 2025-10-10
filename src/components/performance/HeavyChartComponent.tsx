/**
 * Heavy Chart Component - Lazy loaded for performance
 * Demonstrates code splitting and performance optimization
 */

import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface ProductionData {
  id: string;
  facilityId: string;
  timestamp: string;
  oilProduction: number;
  gasProduction: number;
  efficiency: number;
}

interface HeavyChartComponentProps {
  data: ProductionData[];
}

const HeavyChartComponent: React.FC<HeavyChartComponentProps> = ({ data }) => {
  // Transform data for chart display
  const chartData = React.useMemo(() => {
    return data.slice(0, 100).map(item => ({
      timestamp: new Date(item.timestamp).toLocaleDateString('nb-NO'),
      oil: item.oilProduction,
      gas: item.gasProduction,
      efficiency: item.efficiency,
    }));
  }, [data]);

  return (
    <div className="heavy-chart-component">
      <h3>Production Trends</h3>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="timestamp" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="oil" 
            stroke="#0066cc" 
            name="Oil Production (bbl/day)"
          />
          <Line 
            type="monotone" 
            dataKey="gas" 
            stroke="#38a169" 
            name="Gas Production (mcf/day)"
          />
          <Line 
            type="monotone" 
            dataKey="efficiency" 
            stroke="#ffb02e" 
            name="Efficiency (%)"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HeavyChartComponent;