
import React, { useState, useCallback } from "react";
import CodeEditor from "@/components/CodeEditor";
import MetricsDashboard from "@/components/MetricsDashboard";
import CodeDifference from "@/components/CodeDifference";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Copy, Sparkles } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const sampleCode = `function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// Calculate fibonacci for a range
for (let i = 0; i < 10; i++) {
  console.log(fibonacci(i));
}`;

const optimizedCode = `function fibonacci(n) {
  // Use memoization for better performance
  const memo = {};
  
  function fib(n) {
    if (n in memo) return memo[n];
    if (n <= 1) return n;
    
    memo[n] = fib(n-1) + fib(n-2);
    return memo[n];
  }
  
  return fib(n);
}

// Calculate fibonacci for a range
for (let i = 0; i < 10; i++) {
  console.log(fibonacci(i));
}`;

const Dashboard: React.FC = () => {
  const isMobile = useIsMobile();
  const [inputCode, setInputCode] = useState(sampleCode);
  const [outputCode, setOutputCode] = useState(optimizedCode);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [showAnalysis, setShowAnalysis] = useState(false);
  
  const handleOptimize = useCallback(() => {
    setIsOptimizing(true);
    
    // Simulate optimization process
    setTimeout(() => {
      setOutputCode(optimizedCode);
      setIsOptimizing(false);
      toast({
        title: "Optimization complete",
        description: "Your code has been optimized successfully",
      });
    }, 1500);
  }, []);
  
  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(outputCode);
    toast({
      title: "Copied to clipboard",
      description: "The optimized code has been copied to your clipboard",
    });
  }, [outputCode]);
  
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gradient">AI Code Optimizer</h1>
        <div className="flex gap-2 mt-4 md:mt-0">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setShowAnalysis(true)}
            className="text-xs"
          >
            View Analysis
          </Button>
          <Button 
            onClick={handleOptimize} 
            disabled={isOptimizing} 
            className="gap-1 text-xs"
          >
            {isOptimizing ? (
              <>
                <span className="animate-pulse">Optimizing</span>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-foreground opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-foreground"></span>
                </span>
              </>
            ) : (
              <>
                <Sparkles className="h-3.5 w-3.5" /> Optimize Code
              </>
            )}
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="h-[400px]">
          <div className="text-sm font-medium mb-2">Input Code</div>
          <CodeEditor 
            value={inputCode} 
            onChange={setInputCode} 
            language="javascript"
            height="360px"
          />
        </div>
        <div className="h-[400px]">
          <div className="flex justify-between items-center mb-2">
            <div className="text-sm font-medium">Optimized Code</div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleCopy}
              className="h-8 px-2"
            >
              <Copy className="h-3.5 w-3.5" />
              <span className="sr-only">Copy code</span>
            </Button>
          </div>
          <CodeEditor 
            value={outputCode} 
            readOnly={true}
            language="javascript"
            height="360px"
          />
        </div>
      </div>
      
      {!isMobile && (
        <div className="mb-6">
          <div className="text-sm font-medium mb-2">Code Analysis</div>
          <CodeDifference original={inputCode} optimized={outputCode} />
        </div>
      )}
      
      <MetricsDashboard />
      
      {/* Mobile Analysis Dialog */}
      <Dialog open={showAnalysis && isMobile} onOpenChange={setShowAnalysis}>
        <DialogContent className="sm:max-w-[90%] max-h-[80vh]">
          <DialogHeader>
            <DialogTitle>Code Analysis</DialogTitle>
          </DialogHeader>
          <div className="overflow-auto">
            <CodeDifference original={inputCode} optimized={outputCode} />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dashboard;
