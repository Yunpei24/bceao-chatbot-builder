
import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  BarChart as BarChartIcon, 
  LineChart as LineChartIcon, 
  PieChart as PieChartIcon,
  Download,
  RefreshCw,
  Settings
} from "lucide-react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

const sampleEconomicData = [
  { trimestre: "T1 2023", croissance: 4.2, inflation: 7.1, exportations: 145, importations: 160 },
  { trimestre: "T2 2023", croissance: 4.5, inflation: 6.8, exportations: 155, importations: 158 },
  { trimestre: "T3 2023", croissance: 4.7, inflation: 6.3, exportations: 160, importations: 162 },
  { trimestre: "T4 2023", croissance: 5.0, inflation: 5.9, exportations: 165, importations: 168 },
  { trimestre: "T1 2024", croissance: 5.2, inflation: 5.5, exportations: 170, importations: 172 },
  { trimestre: "T2 2024", croissance: 5.4, inflation: 4.8, exportations: 175, importations: 170 },
];

const COLORS = ['#003366', '#1A73E8', '#D4AF37', '#34A853', '#EA4335'];

const ChartGenerator = () => {
  const [chartType, setChartType] = useState<string>("bar");
  const [primaryMetric, setPrimaryMetric] = useState<string>("croissance");
  const [secondaryMetric, setSecondaryMetric] = useState<string>("inflation");

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div>
            <h1 className="bceao-heading">Génération de Graphiques</h1>
            <p className="text-bceao-text mt-2">
              Créez des visualisations à partir de données économiques.
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Actualiser
            </Button>
            <Button variant="default">
              <Download className="h-4 w-4 mr-2" />
              Exporter
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <Card className="bceao-card lg:col-span-4">
            <CardHeader>
              <CardTitle className="text-lg">Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="text-sm font-medium text-bceao-text block mb-2">
                  Type de graphique
                </label>
                <Tabs defaultValue={chartType} onValueChange={setChartType} className="w-full">
                  <TabsList className="grid grid-cols-3 w-full">
                    <TabsTrigger value="bar" className="flex items-center gap-1">
                      <BarChartIcon className="h-4 w-4" />
                      <span className="hidden sm:inline">Barres</span>
                    </TabsTrigger>
                    <TabsTrigger value="line" className="flex items-center gap-1">
                      <LineChartIcon className="h-4 w-4" />
                      <span className="hidden sm:inline">Lignes</span>
                    </TabsTrigger>
                    <TabsTrigger value="pie" className="flex items-center gap-1">
                      <PieChartIcon className="h-4 w-4" />
                      <span className="hidden sm:inline">Secteur</span>
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              <div>
                <label className="text-sm font-medium text-bceao-text block mb-2">
                  Métrique principale
                </label>
                <Select value={primaryMetric} onValueChange={setPrimaryMetric}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="croissance">Croissance (%)</SelectItem>
                    <SelectItem value="inflation">Inflation (%)</SelectItem>
                    <SelectItem value="exportations">Exportations (Mds FCFA)</SelectItem>
                    <SelectItem value="importations">Importations (Mds FCFA)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {chartType !== "pie" && (
                <div>
                  <label className="text-sm font-medium text-bceao-text block mb-2">
                    Métrique secondaire
                  </label>
                  <Select value={secondaryMetric} onValueChange={setSecondaryMetric}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="croissance">Croissance (%)</SelectItem>
                      <SelectItem value="inflation">Inflation (%)</SelectItem>
                      <SelectItem value="exportations">Exportations (Mds FCFA)</SelectItem>
                      <SelectItem value="importations">Importations (Mds FCFA)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div>
                <Button variant="outline" className="w-full" size="sm">
                  <Settings className="h-4 w-4 mr-2" />
                  Options avancées
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bceao-card lg:col-span-8">
            <CardHeader>
              <CardTitle className="text-lg">Visualisation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                {chartType === "bar" && (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={sampleEconomicData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="trimestre" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey={primaryMetric} fill="#003366" name={primaryMetric === "croissance" ? "Croissance (%)" : primaryMetric === "inflation" ? "Inflation (%)" : primaryMetric === "exportations" ? "Exportations (Mds FCFA)" : "Importations (Mds FCFA)"} />
                      <Bar dataKey={secondaryMetric} fill="#D4AF37" name={secondaryMetric === "croissance" ? "Croissance (%)" : secondaryMetric === "inflation" ? "Inflation (%)" : secondaryMetric === "exportations" ? "Exportations (Mds FCFA)" : "Importations (Mds FCFA)"} />
                    </BarChart>
                  </ResponsiveContainer>
                )}

                {chartType === "line" && (
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={sampleEconomicData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="trimestre" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey={primaryMetric} stroke="#003366" strokeWidth={2} name={primaryMetric === "croissance" ? "Croissance (%)" : primaryMetric === "inflation" ? "Inflation (%)" : primaryMetric === "exportations" ? "Exportations (Mds FCFA)" : "Importations (Mds FCFA)"} />
                      <Line type="monotone" dataKey={secondaryMetric} stroke="#D4AF37" strokeWidth={2} name={secondaryMetric === "croissance" ? "Croissance (%)" : secondaryMetric === "inflation" ? "Inflation (%)" : secondaryMetric === "exportations" ? "Exportations (Mds FCFA)" : "Importations (Mds FCFA)"} />
                    </LineChart>
                  </ResponsiveContainer>
                )}

                {chartType === "pie" && (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={sampleEconomicData.map(item => ({ name: item.trimestre, value: item[primaryMetric as keyof typeof item] }))}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {sampleEconomicData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="bceao-card">
          <CardHeader>
            <CardTitle className="text-lg">Données source</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="p-2 text-left border">Trimestre</th>
                    <th className="p-2 text-left border">Croissance (%)</th>
                    <th className="p-2 text-left border">Inflation (%)</th>
                    <th className="p-2 text-left border">Exportations (Mds FCFA)</th>
                    <th className="p-2 text-left border">Importations (Mds FCFA)</th>
                  </tr>
                </thead>
                <tbody>
                  {sampleEconomicData.map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-muted/20"}>
                      <td className="p-2 border">{row.trimestre}</td>
                      <td className="p-2 border">{row.croissance}</td>
                      <td className="p-2 border">{row.inflation}</td>
                      <td className="p-2 border">{row.exportations}</td>
                      <td className="p-2 border">{row.importations}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default ChartGenerator;
