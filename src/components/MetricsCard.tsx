
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface MetricsCardProps {
  title: string;
  value: string | number;
  description: string;
  trend?: number;
  icon?: React.ReactNode;
}

const MetricsCard = ({ title, value, description, trend, icon }: MetricsCardProps) => {
  return (
    <Card className="border-border bg-muted/30 backdrop-blur-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon && <div className="w-4 h-4 text-accent">{icon}</div>}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <CardDescription className="flex items-center mt-1 text-xs">
          {description}
          {trend !== undefined && (
            <Badge variant={trend >= 0 ? "default" : "destructive"} className="ml-2">
              {trend >= 0 ? "+" : ""}{trend}%
            </Badge>
          )}
        </CardDescription>
      </CardContent>
    </Card>
  );
};

export default MetricsCard;
