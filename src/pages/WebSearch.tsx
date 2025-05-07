
import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import { Search, ExternalLink, Copy, CornerLeftUp } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const SearchResult = ({
  title,
  url,
  snippet,
}: {
  title: string;
  url: string;
  snippet: string;
}) => {
  const { toast } = useToast();

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(url);
    toast({
      title: "URL copiée",
      description: "L'URL a été copiée dans le presse-papiers.",
    });
  };

  return (
    <Card className="bceao-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold text-bceao-primary">
          {title}
        </CardTitle>
        <div className="text-xs text-bceao-text/70 truncate">
          {url}
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="text-sm text-bceao-text">{snippet}</p>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button
          variant="outline"
          size="sm"
          className="text-xs"
          onClick={handleCopyUrl}
        >
          <Copy className="h-3.5 w-3.5 mr-1" />
          Copier la source
        </Button>
        <Button
          variant="default"
          size="sm"
          className="text-xs"
          onClick={() => window.open(url, "_blank")}
        >
          <ExternalLink className="h-3.5 w-3.5 mr-1" />
          Ouvrir
        </Button>
      </CardFooter>
    </Card>
  );
};

const WebSearch = () => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [isSearching, setIsSearching] = React.useState(false);
  const [results, setResults] = React.useState<Array<{
    title: string;
    url: string;
    snippet: string;
  }>>([]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSearching(true);

    // Simuler une recherche avec un délai
    setTimeout(() => {
      setResults([
        {
          title: "BCEAO - Rapport annuel 2023",
          url: "https://www.bceao.int/rapports/2023/annuel",
          snippet: "Le rapport annuel 2023 de la BCEAO présente l'évolution économique et monétaire des pays de l'Union ainsi que les activités de la Banque Centrale.",
        },
        {
          title: "Politique monétaire de la BCEAO - Perspectives 2024",
          url: "https://www.bceao.int/politique-monetaire/2024",
          snippet: "Analyse des perspectives économiques et des décisions de politique monétaire pour l'année 2024 dans la zone UEMOA.",
        },
        {
          title: "Analyse des marchés financiers de l'UEMOA",
          url: "https://www.bceao.int/analyses/marches-financiers",
          snippet: "Étude détaillée sur l'évolution des marchés financiers de l'UEMOA et leurs interactions avec le cadre macroéconomique régional.",
        },
      ]);
      setIsSearching(false);
    }, 1500);
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="bceao-heading">Recherche Web Enrichie</h1>
          <p className="text-bceao-text mt-2">
            Effectuez des recherches web sur des documents et sujets précis.
          </p>
        </div>

        <Card className="bceao-card">
          <CardContent className="pt-6">
            <form onSubmit={handleSearch} className="flex gap-2">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                <Input
                  placeholder="Rechercher des documents, rapports, ou sujets économiques..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button type="submit" disabled={isSearching}>
                {isSearching ? "Recherche..." : "Rechercher"}
              </Button>
            </form>

            <div className="mt-4 flex flex-wrap gap-2">
              <Button variant="outline" size="sm" onClick={() => setSearchQuery("Rapport BCEAO 2023")}>
                Rapport BCEAO 2023
              </Button>
              <Button variant="outline" size="sm" onClick={() => setSearchQuery("Politique monétaire UEMOA")}>
                Politique monétaire UEMOA
              </Button>
              <Button variant="outline" size="sm" onClick={() => setSearchQuery("Inflation zone franc")}>
                Inflation zone franc
              </Button>
            </div>
          </CardContent>
        </Card>

        {results.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium text-bceao-primary">Résultats ({results.length})</h2>
              <Button variant="ghost" size="sm" className="text-xs" onClick={() => setResults([])}>
                <CornerLeftUp className="h-3.5 w-3.5 mr-1" />
                Nouvelle recherche
              </Button>
            </div>
            <div className="space-y-4">
              {results.map((result, index) => (
                <SearchResult
                  key={index}
                  title={result.title}
                  url={result.url}
                  snippet={result.snippet}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default WebSearch;
