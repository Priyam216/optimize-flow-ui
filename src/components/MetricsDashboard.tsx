
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  BarChart,
  Bar,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip,
  Legend 
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import MetricsCard from "./MetricsCard";
import { Code, Clock, MemoryStick } from "lucide-react";

const performanceData = [
  { name: 'Before', timeComplexity: 100, spaceComplexity: 80, runtime: 120 },
  { name: 'After', timeComplexity: 45, spaceComplexity: 40, runtime: 52 },
];

const memoryAllocationData = [
  { name: 'Before', heap: 65, stack: 35 },
  { name: 'After', heap: 40, stack: 22 },
];

interface MetricsDashboardProps {
  executionTime?: number;
  memoryUsage?: number;
  codeSize?: number;
}

const MetricsDashboard: React.FC<MetricsDashboardProps> = ({
  executionTime = 52,
  memoryUsage = 40,
  codeSize = 45,
}) => {
  const chartConfig = {
    timeComplexity: { label: "Time Complexity" },
    spaceComplexity: { label: "Space Complexity" },
    runtime: { label: "Runtime (ms)" },
    heap: { label: "Heap Memory" },
    stack: { label: "Stack Memory" },
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
      <MetricsCard 
        title="Execution Time" 
        value={`${executionTime} ms`}
        description="Runtime performance"
        trend={-57}
        icon={<Clock className="h-4 w-4" />}
      />
      
      <MetricsCard 
        title="Memory Usage" 
        value={`${memoryUsage} MB`}
        description="Heap and Stack"
        trend={-50}
        icon={<MemoryStick className="h-4 w-4" />}
      />
      
      <MetricsCard 
        title="Code Size" 
        value={`${codeSize}%`}
        description="Optimized size"
        trend={-55}
        icon={<Code className="h-4 w-4" />}
      />
      
      <Card className="md:col-span-2 border-border bg-muted/30 backdrop-blur-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Performance Comparison</CardTitle>
        </CardHeader>
        <CardContent className="p-2">
          <ChartContainer config={chartConfig} className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                <Bar dataKey="timeComplexity" name="Time Complexity" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                <Bar dataKey="spaceComplexity" name="Space Complexity" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} />
                <Bar dataKey="runtime" name="Runtime (ms)" fill="hsl(var(--destructive))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
      
      <Card className="border-border bg-muted/30 backdrop-blur-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Memory Allocation</CardTitle>
        </CardHeader>
        <CardContent className="p-2">
          <ChartContainer config={chartConfig} className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={memoryAllocationData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                <Area type="monotone" dataKey="heap" name="Heap Memory" stroke="hsl(var(--primary))" fill="hsl(var(--primary)/0.3)" />
                <Area type="monotone" dataKey="stack" name="Stack Memory" stroke="hsl(var(--accent))" fill="hsl(var(--accent)/0.3)" />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default MetricsDashboard;
