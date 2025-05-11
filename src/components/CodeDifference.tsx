
import React, { useMemo } from 'react';
import { Card, CardHeader, CardContent } from "@/components/ui/card";

interface CodeDifferenceProps {
  original: string;
  optimized: string;
}

const CodeDifference: React.FC<CodeDifferenceProps> = ({ original, optimized }) => {
  const renderDifference = useMemo(() => {
    if (!original || !optimized) return null;
    
    // Simple line-by-line comparison
    const origLines = original.split('\n');
    const optLines = optimized.split('\n');
    
    // Find added, removed, and changed lines
    const result = [];
    const maxLen = Math.max(origLines.length, optLines.length);
    
    for (let i = 0; i < maxLen; i++) {
      const origLine = origLines[i] || '';
      const optLine = optLines[i] || '';
      
      if (origLine === optLine) {
        result.push(
          <div key={`line-${i}`} className="flex">
            <div className="w-8 flex-shrink-0 text-muted-foreground text-right pr-2">{i+1}</div>
            <pre className="pl-2 whitespace-pre-wrap">{origLine}</pre>
          </div>
        );
      } else {
        result.push(
          <div key={`removed-${i}`} className="flex bg-red-900/20">
            <div className="w-8 flex-shrink-0 text-muted-foreground text-right pr-2">{i+1}</div>
            <pre className="pl-2 whitespace-pre-wrap text-red-400">{origLine}</pre>
          </div>
        );
        
        result.push(
          <div key={`added-${i}`} className="flex bg-green-900/20">
            <div className="w-8 flex-shrink-0 text-muted-foreground text-right pr-2">{i+1}</div>
            <pre className="pl-2 whitespace-pre-wrap text-green-400">{optLine}</pre>
          </div>
        );
      }
    }
    
    return result;
  }, [original, optimized]);

  return (
    <Card className="overflow-hidden border-border bg-muted/30 backdrop-blur-sm h-full">
      <CardHeader className="py-3 px-4 bg-muted/50">
        <h3 className="text-sm font-medium">Code Analysis</h3>
      </CardHeader>
      <CardContent className="p-0 overflow-auto max-h-[400px]">
        <div className="p-4 font-mono text-xs">
          {renderDifference}
        </div>
      </CardContent>
    </Card>
  );
};

export default CodeDifference;
