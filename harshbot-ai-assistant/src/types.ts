export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  suggestedPrompts?: string[];
}

export interface FeatureCard {
  id: string;
  title: string;
  badge: string;
  description: string;
  iconName: "Code" | "Cpu" | "Binary" | "GitBranch" | "Terminal" | "Award";
  color: string;
  details: string[];
}

export interface MetricItem {
  label: string;
  value: string | number;
  change: string;
  trend: "up" | "down" | "stable";
  color: string;
}

export interface SuggestionPrompt {
  label: string;
  prompt: string;
  category: "python" | "dsa" | "ml" | "github" | "general";
}
