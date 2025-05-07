
import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileDown, FileText, Calendar, Users, Save } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const DocumentEditor = () => {
  const { toast } = useToast();
  const [editorContent, setEditorContent] = useState<string>(
    "# Rapport économique BCEAO\n\n## 1. Introduction\n\nCe document présente une analyse de la situation économique de l'UEMOA.\n\n## 2. Analyse macroéconomique\n\n### 2.1 Croissance économique\n\nLa croissance du PIB réel de l'Union est estimée à 5,7% en 2023 contre 5,9% en 2022.\n\n### 2.2 Inflation\n\nLe taux d'inflation moyen annuel s'est établi à 3,7% contre 7,4% en 2022.\n\n## 3. Politique monétaire\n\nLa BCEAO a maintenu une politique monétaire accommodante pour soutenir la reprise économique.\n\n## 4. Conclusion\n\nLes perspectives économiques restent globalement favorables malgré les incertitudes liées au contexte international."
  );

  const [documentTitle, setDocumentTitle] = useState<string>("Rapport économique BCEAO - Mai 2025");

  const handleExport = (format: string) => {
    toast({
      title: `Export en ${format.toUpperCase()}`,
      description: `Le document "${documentTitle}" a été exporté au format ${format.toUpperCase()}.`,
    });
  };

  const handleSave = () => {
    toast({
      title: "Document sauvegardé",
      description: "Toutes les modifications ont été enregistrées.",
    });
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div>
            <h1 className="bceao-heading">Rédaction de Documents</h1>
            <p className="text-bceao-text mt-2">
              Créez et éditez des documents au format BCEAO.
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleSave}>
              <Save className="h-4 w-4 mr-2" />
              Sauvegarder
            </Button>
            <Button variant="outline" onClick={() => handleExport("pdf")}>
              <FileDown className="h-4 w-4 mr-2" />
              PDF
            </Button>
            <Button variant="default" onClick={() => handleExport("docx")}>
              <FileDown className="h-4 w-4 mr-2" />
              DOCX
            </Button>
          </div>
        </div>

        <Card className="bceao-card">
          <CardHeader className="pb-2">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-bceao-primary" />
                <input
                  type="text"
                  value={documentTitle}
                  onChange={(e) => setDocumentTitle(e.target.value)}
                  className="text-lg font-semibold text-bceao-primary bg-transparent border-none focus:outline-none focus:ring-0 p-0"
                />
              </div>
              <div className="flex items-center gap-4 text-sm text-bceao-text">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>7 mai 2025</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>Analyste BCEAO</span>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="edit" className="w-full">
              <TabsList className="grid grid-cols-2 mb-4 w-[200px]">
                <TabsTrigger value="edit">Éditer</TabsTrigger>
                <TabsTrigger value="preview">Aperçu</TabsTrigger>
              </TabsList>
              <TabsContent value="edit" className="mt-0">
                <div className="relative min-h-[500px] rounded-md border">
                  <div className="flex gap-2 bg-muted/50 p-2 rounded-t-md border-b">
                    <Button variant="ghost" size="sm" className="h-8 px-2">
                      <strong>B</strong>
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 px-2 italic">
                      <i>I</i>
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 px-2 underline">
                      <u>U</u>
                    </Button>
                    <div className="h-6 w-px bg-border mx-1"></div>
                    <Button variant="ghost" size="sm" className="h-8">
                      H1
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8">
                      H2
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8">
                      H3
                    </Button>
                    <div className="h-6 w-px bg-border mx-1"></div>
                    <Button variant="ghost" size="sm" className="h-8">
                      Liste
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8">
                      Table
                    </Button>
                  </div>
                  <textarea
                    value={editorContent}
                    onChange={(e) => setEditorContent(e.target.value)}
                    className="w-full min-h-[500px] p-4 bg-white rounded-b-md focus:outline-none border-0 resize-none font-mono text-sm"
                  />
                </div>
              </TabsContent>
              <TabsContent value="preview" className="mt-0">
                <div className="bg-white min-h-[500px] p-6 rounded-md border">
                  <div className="prose max-w-none">
                    <h1>Rapport économique BCEAO</h1>
                    <h2>1. Introduction</h2>
                    <p>Ce document présente une analyse de la situation économique de l'UEMOA.</p>
                    <h2>2. Analyse macroéconomique</h2>
                    <h3>2.1 Croissance économique</h3>
                    <p>La croissance du PIB réel de l'Union est estimée à 5,7% en 2023 contre 5,9% en 2022.</p>
                    <h3>2.2 Inflation</h3>
                    <p>Le taux d'inflation moyen annuel s'est établi à 3,7% contre 7,4% en 2022.</p>
                    <h2>3. Politique monétaire</h2>
                    <p>La BCEAO a maintenu une politique monétaire accommodante pour soutenir la reprise économique.</p>
                    <h2>4. Conclusion</h2>
                    <p>Les perspectives économiques restent globalement favorables malgré les incertitudes liées au contexte international.</p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className="mt-6">
          <h2 className="bceao-subheading mb-4">Modèles de documents</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card className="bceao-card cursor-pointer hover:bg-muted/20 transition-colors">
              <CardContent className="p-4 flex items-center gap-3">
                <FileText className="h-10 w-10 text-bceao-primary" />
                <div>
                  <CardTitle className="text-sm">Rapport trimestriel</CardTitle>
                  <p className="text-xs text-bceao-text">Modèle standard pour les rapports trimestriels</p>
                </div>
              </CardContent>
            </Card>
            <Card className="bceao-card cursor-pointer hover:bg-muted/20 transition-colors">
              <CardContent className="p-4 flex items-center gap-3">
                <FileText className="h-10 w-10 text-bceao-primary" />
                <div>
                  <CardTitle className="text-sm">Note économique</CardTitle>
                  <p className="text-xs text-bceao-text">Format pour les notes d'analyse économique</p>
                </div>
              </CardContent>
            </Card>
            <Card className="bceao-card cursor-pointer hover:bg-muted/20 transition-colors">
              <CardContent className="p-4 flex items-center gap-3">
                <FileText className="h-10 w-10 text-bceao-primary" />
                <div>
                  <CardTitle className="text-sm">Mémo politique monétaire</CardTitle>
                  <p className="text-xs text-bceao-text">Structure pour mémo sur la politique monétaire</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DocumentEditor;
