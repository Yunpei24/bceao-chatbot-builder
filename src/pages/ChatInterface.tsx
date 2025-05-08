
import React, { useState, useRef, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  Send, 
  FileUp, 
  Search, 
  BarChart2, 
  FileText, 
  Clock, 
  Download, 
  Copy,
  Bot
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Message {
  id: string;
  content: string | React.ReactNode;
  sender: 'user' | 'bot';
  timestamp: Date;
  attachments?: { type: string; content: any }[];
}

const ChatInterface = () => {
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Bonjour, je suis votre assistant BCEAO. Comment puis-je vous aider aujourd'hui ?",
      sender: 'bot',
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");

    // Simulate bot response
    setTimeout(() => {
      let botResponse: Message;

      if (input.toLowerCase().includes("inflation")) {
        botResponse = {
          id: (Date.now() + 1).toString(),
          content: (
            <div className="space-y-4">
              <p>
                Le taux d'inflation moyen dans l'UEMOA s'est établi à 3,7% en 2023 contre 7,4% en 2022.
                Cette baisse est principalement due à l'atténuation des tensions sur les prix des produits alimentaires et énergétiques.
              </p>
              <div className="bg-bceao-light/50 p-4 rounded-md">
                <h4 className="font-medium mb-2">Évolution de l'inflation par pays</h4>
                <div className="bg-white p-2 rounded border">
                  <img 
                    src="https://via.placeholder.com/500x250?text=Graphique+Inflation" 
                    alt="Graphique d'inflation" 
                    className="w-full h-auto rounded"
                  />
                </div>
              </div>
            </div>
          ),
          sender: 'bot',
          timestamp: new Date(),
          attachments: [
            { type: 'chart', content: 'inflation_data' }
          ]
        };
      } else if (input.toLowerCase().includes("rapport")) {
        botResponse = {
          id: (Date.now() + 1).toString(),
          content: (
            <div className="space-y-4">
              <p>
                Voici un extrait du dernier rapport sur la situation économique de l'UEMOA :
              </p>
              <div className="bg-bceao-light/50 p-4 rounded-md">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">Rapport trimestriel T1 2023</h4>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                      <Copy className="h-3.5 w-3.5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                      <Download className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
                <div className="bg-white p-3 rounded border text-sm">
                  <p className="mb-2">
                    <strong>1. Contexte macroéconomique</strong>
                  </p>
                  <p>L'activité économique dans l'UEMOA a maintenu sa dynamique de croissance au premier trimestre 2023, avec un taux de croissance estimé à 5,2%, contre 5,0% au trimestre précédent.</p>
                  <p className="mt-2">
                    <strong>2. Évolution des prix</strong>
                  </p>
                  <p>Le taux d'inflation s'est établi à 5,5%, poursuivant sa tendance baissière entamée depuis le dernier trimestre 2022 (5,9%).</p>
                </div>
              </div>
            </div>
          ),
          sender: 'bot',
          timestamp: new Date(),
          attachments: [
            { type: 'document', content: 'rapport_t1_2023' }
          ]
        };
      } else {
        botResponse = {
          id: (Date.now() + 1).toString(),
          content: "Je peux vous aider à analyser des données économiques, générer des rapports, ou effectuer des recherches sur des sujets liés à la BCEAO et l'UEMOA. Que souhaitez-vous faire ?",
          sender: 'bot',
          timestamp: new Date(),
        };
      }

      setMessages(prev => [...prev, botResponse]);
    }, 1500);
  };

  const handleNewConversation = () => {
    setMessages([
      {
        id: 'new-1',
        content: "Bonjour, je suis votre assistant BCEAO. Comment puis-je vous aider aujourd'hui ?",
        sender: 'bot',
        timestamp: new Date(),
      }
    ]);
    toast({
      title: "Nouvelle conversation",
      description: "Une nouvelle conversation a été démarrée",
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <Layout className="pb-0 h-screen flex flex-col">
      <div className="flex-1 flex flex-col">
        <div>
          <h1 className="bceao-heading">Chat Enrichi</h1>
          <p className="text-bceao-text mt-2 mb-6">
            Posez vos questions et obtenez des informations économiques.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1">
          <div className="lg:col-span-9 flex flex-col">
            <Card className="bceao-card flex-1 flex flex-col">
              <CardContent className="p-4 flex-1 flex flex-col">
                <Tabs defaultValue="conversation" className="flex-1 flex flex-col">
                  <div className="flex justify-between items-center mb-4">
                    <TabsList>
                      <TabsTrigger value="conversation">Conversation</TabsTrigger>
                      <TabsTrigger value="history">Historique</TabsTrigger>
                    </TabsList>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-xs flex gap-1"
                      onClick={handleNewConversation}
                    >
                      <Clock className="h-3.5 w-3.5" />
                      Nouvelle conversation
                    </Button>
                  </div>
                  
                  <TabsContent value="conversation" className="flex-1 flex flex-col mt-0">
                    <div className="flex-1 overflow-y-auto space-y-4 pr-2 mb-4">
                      {messages.map((message) => (
                        <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                          <div className={`max-w-3xl flex gap-3 ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                            <Avatar className={`h-8 w-8 ${message.sender === 'user' ? 'bg-bceao-primary' : 'bg-bceao-light'}`}>
                              <AvatarFallback className={message.sender === 'user' ? 'text-white' : 'text-bceao-primary'}>
                                {message.sender === 'user' ? 'U' : 'B'}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div 
                                className={`relative px-4 py-3 rounded-lg mb-1 ${
                                  message.sender === 'user' 
                                    ? 'bg-bceao-primary text-white' 
                                    : 'bg-bceao-light/50 text-bceao-text'
                                }`}
                              >
                                <div className="space-y-2">
                                  {message.content}
                                </div>
                              </div>
                              <div 
                                className={`text-xs text-gray-500 ${
                                  message.sender === 'user' ? 'text-right' : 'text-left'
                                }`}
                              >
                                {formatTime(message.timestamp)}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                      <div ref={messagesEndRef} />
                    </div>

                    <div className="mt-auto">
                      <div className="flex gap-2">
                        <Button variant="outline" size="icon">
                          <FileUp className="h-4 w-4" />
                        </Button>
                        <div className="relative flex-1">
                          <Input
                            placeholder="Tapez votre message..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="pr-10"
                          />
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="absolute right-0 top-0 h-full"
                            onClick={handleSendMessage}
                            disabled={!input.trim()}
                          >
                            <Send className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="flex gap-2 mt-3">
                        <Button variant="outline" size="sm" className="text-xs">
                          <Search className="h-3.5 w-3.5 mr-1" />
                          Rechercher
                        </Button>
                        <Button variant="outline" size="sm" className="text-xs">
                          <BarChart2 className="h-3.5 w-3.5 mr-1" />
                          Analyser
                        </Button>
                        <Button variant="outline" size="sm" className="text-xs">
                          <FileText className="h-3.5 w-3.5 mr-1" />
                          Générer un rapport
                        </Button>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="history" className="mt-0 flex-1">
                    <div className="space-y-3">
                      {[1, 2, 3].map((i) => (
                        <Card key={i} className="hover:bg-muted/20 transition-colors cursor-pointer">
                          <CardContent className="p-3">
                            <div className="flex justify-between items-center">
                              <div>
                                <p className="font-medium text-sm">Analyse des tendances d'inflation</p>
                                <p className="text-xs text-bceao-text">5 mai 2025, 14:30</p>
                              </div>
                              <p className="text-xs text-bceao-text">8 messages</p>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-3">
            <Card className="bceao-card">
              <CardContent className="p-4">
                <h3 className="font-medium text-sm mb-3">Suggestions</h3>
                <div className="space-y-2 max-h-[300px] overflow-y-auto">
                  {[
                    "Quelle est la situation de l'inflation dans l'UEMOA ?",
                    "Montrez-moi le dernier rapport trimestriel",
                    "Analysez les tendances de croissance économique"
                  ].map((suggestion, i) => (
                    <Button 
                      key={i}
                      variant="outline" 
                      className="w-full justify-start text-left h-auto p-3 text-sm font-normal whitespace-normal"
                      onClick={() => {
                        setInput(suggestion);
                        setTimeout(() => handleSendMessage(), 100);
                      }}
                    >
                      {suggestion}
                    </Button>
                  ))}
                </div>

                <div className="border-t my-4"></div>

                <h3 className="font-medium text-sm mb-3">Documents récents</h3>
                <div className="space-y-2">
                  {[
                    {
                      title: "Rapport T1 2025",
                      icon: FileText
                    },
                    {
                      title: "Analyse d'inflation",
                      icon: BarChart2
                    }
                  ].map((doc, i) => (
                    <div key={i} className="flex items-center gap-2 p-2 hover:bg-muted/20 rounded-md cursor-pointer">
                      <div className="bg-bceao-primary/10 p-1 rounded">
                        <doc.icon className="h-4 w-4 text-bceao-primary" />
                      </div>
                      <span className="text-sm">{doc.title}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ChatInterface;
