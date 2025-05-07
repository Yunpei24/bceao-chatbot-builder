
import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Database, Table as TableIcon, FilterX, FileSpreadsheet, BarChart2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Sample data
const sampleData = [
  { id: 1, pays: "Bénin", pib: 15.93, croissance: 5.7, inflation: 3.2, dette: 46.1 },
  { id: 2, pays: "Burkina Faso", pib: 18.88, croissance: 3.8, inflation: 2.9, dette: 52.4 },
  { id: 3, pays: "Côte d'Ivoire", pib: 70.99, croissance: 6.7, inflation: 3.8, dette: 51.7 },
  { id: 4, pays: "Guinée-Bissau", pib: 1.64, croissance: 4.5, inflation: 3.3, dette: 76.1 },
  { id: 5, pays: "Mali", pib: 19.14, croissance: 4.8, inflation: 4.1, dette: 49.5 },
  { id: 6, pays: "Niger", pib: 14.91, croissance: 5.8, inflation: 3.7, dette: 55.2 },
  { id: 7, pays: "Sénégal", pib: 28.47, croissance: 5.5, inflation: 3.0, dette: 68.8 },
  { id: 8, pays: "Togo", pib: 8.41, croissance: 5.3, inflation: 3.6, dette: 61.9 }
];

const DataAnalysis = () => {
  const { toast } = useToast();
  const [query, setQuery] = useState<string>('SELECT * FROM uemoa_data WHERE croissance > 5.0 ORDER BY pib DESC');
  const [fileImported, setFileImported] = useState<boolean>(false);
  const [filteredData, setFilteredData] = useState<any[]>([]);

  const handleImport = () => {
    toast({
      title: "Fichier importé",
      description: "Les données ont été importées avec succès.",
    });
    setFileImported(true);
  };

  const executeQuery = () => {
    // Simulate SQL query execution
    let results;
    try {
      if (query.toLowerCase().includes('where croissance > 5.0')) {
        results = sampleData.filter(item => item.croissance > 5.0).sort((a, b) => b.pib - a.pib);
      } else if (query.toLowerCase().includes('where dette > 60')) {
        results = sampleData.filter(item => item.dette > 60);
      } else if (query.toLowerCase().includes('average')) {
        // Just return the data and we'll pretend this is the result of an aggregation
        results = sampleData;
      } else {
        results = sampleData;
      }
      
      setFilteredData(results);
      toast({
        title: "Requête exécutée",
        description: `${results.length} résultats trouvés.`,
      });
    } catch (error) {
      toast({
        title: "Erreur dans la requête",
        description: "La syntaxe de votre requête est incorrecte.",
        variant: "destructive",
      });
    }
  };

  const calculateStatistics = () => {
    const avgPIB = sampleData.reduce((acc, curr) => acc + curr.pib, 0) / sampleData.length;
    const avgCroissance = sampleData.reduce((acc, curr) => acc + curr.croissance, 0) / sampleData.length;
    const avgInflation = sampleData.reduce((acc, curr) => acc + curr.inflation, 0) / sampleData.length;
    const avgDette = sampleData.reduce((acc, curr) => acc + curr.dette, 0) / sampleData.length;
    
    return {
      avgPIB: avgPIB.toFixed(2),
      avgCroissance: avgCroissance.toFixed(1),
      avgInflation: avgInflation.toFixed(1),
      avgDette: avgDette.toFixed(1),
    };
  };

  const stats = calculateStatistics();

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="bceao-heading">Analyse de Base de Données</h1>
          <p className="text-bceao-text mt-2">
            Importez et analysez des données économiques.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bceao-card">
            <CardContent className="p-4 flex flex-col items-center justify-center text-center h-full">
              <div className="bg-bceao-primary/10 p-3 rounded-full mb-3">
                <FileSpreadsheet className="h-6 w-6 text-bceao-primary" />
              </div>
              <h3 className="font-medium mb-2">Importer Excel/CSV</h3>
              <p className="text-sm text-bceao-text mb-4">Chargez vos données depuis un fichier Excel ou CSV</p>
              <Button onClick={handleImport}>Importer</Button>
            </CardContent>
          </Card>

          <Card className="bceao-card">
            <CardContent className="p-4 flex flex-col items-center justify-center text-center h-full">
              <div className="bg-bceao-primary/10 p-3 rounded-full mb-3">
                <Database className="h-6 w-6 text-bceao-primary" />
              </div>
              <h3 className="font-medium mb-2">Connexion SQL</h3>
              <p className="text-sm text-bceao-text mb-4">Connectez-vous à une base de données SQL</p>
              <Button variant="outline">Configurer</Button>
            </CardContent>
          </Card>

          <Card className="bceao-card">
            <CardContent className="p-4 flex flex-col items-center justify-center text-center h-full">
              <div className="bg-bceao-primary/10 p-3 rounded-full mb-3">
                <BarChart2 className="h-6 w-6 text-bceao-primary" />
              </div>
              <h3 className="font-medium mb-2">Analyse Rapide</h3>
              <p className="text-sm text-bceao-text mb-4">Statistiques descriptives et visualisations</p>
              <Button variant="outline" onClick={() => setFileImported(true)}>Analyser</Button>
            </CardContent>
          </Card>
        </div>

        {fileImported && (
          <>
            <Card className="bceao-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TableIcon className="h-5 w-5" />
                  Données économiques UEMOA (2023)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Pays</TableHead>
                        <TableHead>PIB (Mds $)</TableHead>
                        <TableHead>Croissance (%)</TableHead>
                        <TableHead>Inflation (%)</TableHead>
                        <TableHead>Dette/PIB (%)</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {sampleData.map((row) => (
                        <TableRow key={row.id}>
                          <TableCell>{row.id}</TableCell>
                          <TableCell className="font-medium">{row.pays}</TableCell>
                          <TableCell>{row.pib}</TableCell>
                          <TableCell>{row.croissance}</TableCell>
                          <TableCell>{row.inflation}</TableCell>
                          <TableCell>{row.dette}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

            <Card className="bceao-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  Analyse SQL
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="font-mono text-sm mb-4"
                  rows={3}
                />
                <div className="flex gap-2 mb-4">
                  <Button onClick={executeQuery}>Exécuter</Button>
                  <Button variant="outline" onClick={() => setQuery('SELECT * FROM uemoa_data')}>
                    <FilterX className="h-4 w-4 mr-2" />
                    Réinitialiser
                  </Button>
                </div>

                <Tabs defaultValue="results">
                  <TabsList>
                    <TabsTrigger value="results">Résultats</TabsTrigger>
                    <TabsTrigger value="statistics">Statistiques</TabsTrigger>
                  </TabsList>
                  <TabsContent value="results">
                    {filteredData.length > 0 ? (
                      <div className="overflow-auto border rounded-md mt-4">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Pays</TableHead>
                              <TableHead>PIB (Mds $)</TableHead>
                              <TableHead>Croissance (%)</TableHead>
                              <TableHead>Inflation (%)</TableHead>
                              <TableHead>Dette/PIB (%)</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {filteredData.map((row) => (
                              <TableRow key={row.id}>
                                <TableCell className="font-medium">{row.pays}</TableCell>
                                <TableCell>{row.pib}</TableCell>
                                <TableCell>{row.croissance}</TableCell>
                                <TableCell>{row.inflation}</TableCell>
                                <TableCell>{row.dette}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    ) : (
                      <div className="text-center py-8 text-bceao-text">
                        Exécutez une requête pour voir les résultats
                      </div>
                    )}
                  </TabsContent>
                  <TabsContent value="statistics">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                      <Card>
                        <CardContent className="p-4">
                          <div className="text-sm text-bceao-text">PIB Moyen</div>
                          <div className="text-2xl font-bold">{stats.avgPIB} Mds $</div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4">
                          <div className="text-sm text-bceao-text">Croissance Moyenne</div>
                          <div className="text-2xl font-bold">{stats.avgCroissance}%</div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4">
                          <div className="text-sm text-bceao-text">Inflation Moyenne</div>
                          <div className="text-2xl font-bold">{stats.avgInflation}%</div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4">
                          <div className="text-sm text-bceao-text">Dette/PIB Moyenne</div>
                          <div className="text-2xl font-bold">{stats.avgDette}%</div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </Layout>
  );
};

export default DataAnalysis;
