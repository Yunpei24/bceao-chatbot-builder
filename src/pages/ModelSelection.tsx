
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Layout from "@/components/layout/Layout";
import { AppWindow, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const ModelCard = ({ 
  name, 
  description, 
  icon: Icon,
  capabilities
}: { 
  name: string; 
  description: string; 
  icon: React.ElementType;
  capabilities: string[];
}) => (
  <Card className="bceao-card transition-all hover:shadow-lg">
    <CardHeader className="pb-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-bceao-primary/10 p-2 rounded-full">
            <Icon className="h-6 w-6 text-bceao-primary" />
          </div>
          <CardTitle className="text-lg">{name}</CardTitle>
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon">
                <Info className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top" className="w-80">
              <p>{description}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <CardDescription className="mt-2 line-clamp-2">{description}</CardDescription>
    </CardHeader>
    <CardContent className="pt-0">
      <div className="text-sm text-bceao-text">
        <p className="font-medium text-bceao-primary mb-2">Capacités principales :</p>
        <ul className="list-disc pl-5 space-y-1">
          {capabilities.map((cap, index) => (
            <li key={index}>{cap}</li>
          ))}
        </ul>
      </div>
    </CardContent>
  </Card>
);

const ModelSelection = () => {
  const models = [
    {
      name: "LLaVA",
      description: "Large Language and Vision Assistant. Modèle capable de comprendre à la fois le texte et l'image.",
      icon: AppWindow,
      capabilities: ["Analyse d'images", "Génération de texte", "Compréhension multimodale"]
    },
    {
      name: "BakLLaVA",
      description: "Version spécialisée de LLaVA adaptée pour les besoins bancaires et financiers.",
      icon: AppWindow,
      capabilities: ["Analyse financière", "Reconnaissance de documents bancaires", "Traitement multimodal"]
    },
    {
      name: "CLIP",
      description: "Contrastive Language-Image Pre-training. Excellente compréhension des relations texte-image.",
      icon: AppWindow,
      capabilities: ["Classification d'images", "Recherche par similarité", "Encodage multimodal"]
    },
  ];

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="bceao-heading">Sélection du Modèle Multimodal</h1>
            <p className="text-bceao-text mt-2">
              Choisissez un modèle d'intelligence artificielle open source pour vos analyses.
            </p>
          </div>
        </div>

        <div className="mt-6">
          <label className="text-sm font-medium text-bceao-text block mb-2">
            Sélectionner un modèle
          </label>
          <Select defaultValue="llava">
            <SelectTrigger className="w-full md:w-80">
              <SelectValue placeholder="Sélectionnez un modèle" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="llava">LLaVA</SelectItem>
              <SelectItem value="bakllava">BakLLaVA</SelectItem>
              <SelectItem value="clip">CLIP</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {models.map((model) => (
            <ModelCard 
              key={model.name}
              name={model.name}
              description={model.description}
              icon={model.icon}
              capabilities={model.capabilities}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ModelSelection;
