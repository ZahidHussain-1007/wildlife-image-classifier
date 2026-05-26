import { useRef, useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Upload, Image as ImageIcon, Trash2, Clock } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { ScrollArea } from '../components/ui/scroll-area';
import { Badge } from '../components/ui/badge';

interface PredictionHistory {
  id: string;
  imageUrl: string;
  prediction: string;
  confidence: number;
  timestamp: Date;
}

const ANIMAL_TYPES = [
  'Dog', 'Cat', 'Horse', 'Spider', 'Butterfly', 
  'Chicken', 'Sheep', 'Cow', 'Squirrel', 'Elephant'
];

export function MainPage() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [history, setHistory] = useState<PredictionHistory[]>([]);
  const [prediction, setPrediction] = useState<{ animal: string; confidence: number } | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    // Load history from localStorage
    const savedHistory = localStorage.getItem('predictionHistory');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory, (key, value) => {
        if (key === 'timestamp') return new Date(value);
        return value;
      }));
    }
  }, []);

  const saveHistory = (updatedHistory: PredictionHistory[]) => {
    setHistory(updatedHistory);
    localStorage.setItem('predictionHistory', JSON.stringify(updatedHistory));
  };

  const addHistoryItem = (item: PredictionHistory) => {
    setHistory((currentHistory) => {
      const updatedHistory = [item, ...currentHistory];
      localStorage.setItem('predictionHistory', JSON.stringify(updatedHistory));
      return updatedHistory;
    });
  };

  const openImagePicker = () => {
    fileInputRef.current?.click();
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setPrediction(null);
      };
      reader.readAsDataURL(file);
    }
    e.target.value = '';
  };

  const handlePredict = () => {
    if (!selectedImage) return;

    setIsAnalyzing(true);
    
    // Simulate AI prediction with random result
    setTimeout(() => {
      const randomAnimal = ANIMAL_TYPES[Math.floor(Math.random() * ANIMAL_TYPES.length)];
      const randomConfidence = Math.floor(Math.random() * 20) + 80; // 80-100%
      
      const newPrediction = { animal: randomAnimal, confidence: randomConfidence };
      setPrediction(newPrediction);
      setIsAnalyzing(false);

      // Add to history
      const newHistoryItem: PredictionHistory = {
        id: Date.now().toString(),
        imageUrl: selectedImage,
        prediction: randomAnimal,
        confidence: randomConfidence,
        timestamp: new Date(),
      };

      addHistoryItem(newHistoryItem);
    }, 2000);
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('predictionHistory');
  };

  const deleteHistoryItem = (id: string) => {
    saveHistory(history.filter((item) => item.id !== id));
  };

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl mb-2">Animal Species Prediction</h1>
          <p className="text-muted-foreground">
            Upload an image to predict the animal species using advanced AI
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Prediction Area */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Upload Image</CardTitle>
                <CardDescription>
                  Choose an image of an animal to predict its species
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div
                  className="border-2 border-dashed rounded-lg p-8 text-center hover:border-primary transition-colors"
                  role="button"
                  tabIndex={0}
                  onClick={!selectedImage ? openImagePicker : undefined}
                  onKeyDown={(event) => {
                    if (!selectedImage && (event.key === 'Enter' || event.key === ' ')) {
                      event.preventDefault();
                      openImagePicker();
                    }
                  }}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    id="image-upload"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                  {selectedImage ? (
                    <div className="space-y-4">
                      <ImageWithFallback
                        src={selectedImage}
                        alt="Selected animal"
                        className="max-h-64 mx-auto rounded-lg object-contain"
                      />
                      <Button variant="outline" size="sm" type="button" onClick={openImagePicker}>
                        <Upload className="mr-2 h-4 w-4" />
                        Change Image
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex justify-center">
                        <ImageIcon className="h-16 w-16 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="text-lg font-medium">Click to upload</p>
                        <p className="text-sm text-muted-foreground">
                          PNG, JPG, GIF up to 10MB
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {selectedImage && (
                  <Button 
                    onClick={handlePredict} 
                    className="w-full" 
                    size="lg"
                    disabled={isAnalyzing}
                  >
                    {isAnalyzing ? 'Analyzing...' : 'Predict Species'}
                  </Button>
                )}

                {prediction && (
                  <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-primary dark:from-emerald-950/50 dark:to-slate-900 dark:border-emerald-400/50">
                    <CardContent className="pt-6">
                      <div className="text-center space-y-2">
                        <p className="text-sm text-muted-foreground">Predicted Species</p>
                        <p className="text-3xl font-bold text-primary">{prediction.animal}</p>
                        <div className="flex items-center justify-center gap-2">
                          <div className="h-2 w-32 bg-secondary rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-primary transition-all duration-500"
                              style={{ width: `${prediction.confidence}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium">{prediction.confidence}%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>About the Model</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  This prediction model uses VGG-16, a Convolutional Neural Network trained on ImageNet 
                  with over 14 million images. It can identify 10 different animal species: Dog, Cat, Horse, 
                  Spider, Butterfly, Chicken, Sheep, Cow, Squirrel, and Elephant with high accuracy.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* History Sidebar */}
          <div className="lg:col-span-1">
            <Card className="h-full">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>History</CardTitle>
                  {history.length > 0 && (
                    <Button variant="ghost" size="sm" onClick={clearHistory} aria-label="Clear all history">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                <CardDescription>
                  Your recent predictions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[600px] pr-4">
                  {history.length === 0 ? (
                    <div className="text-center py-12 text-muted-foreground">
                      <Clock className="h-12 w-12 mx-auto mb-3 opacity-50" />
                      <p className="text-sm">No predictions yet</p>
                      <p className="text-xs mt-1">Upload an image to get started</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {history.map((item) => (
                        <Card key={item.id} className="overflow-hidden">
                          <div className="relative">
                            <ImageWithFallback
                              src={item.imageUrl}
                              alt={item.prediction}
                              className="w-full h-32 object-cover"
                            />
                            <Button
                              variant="secondary"
                              size="icon"
                              className="absolute right-2 top-2 size-8 shadow-sm"
                              onClick={() => deleteHistoryItem(item.id)}
                              aria-label={`Delete ${item.prediction} prediction`}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                          <CardContent className="p-3 space-y-2">
                            <div className="flex items-center justify-between">
                              <Badge variant="secondary">{item.prediction}</Badge>
                              <span className="text-xs text-muted-foreground">
                                {item.confidence}%
                              </span>
                            </div>
                            <p className="text-xs text-muted-foreground flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {formatTimestamp(item.timestamp)}
                            </p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
