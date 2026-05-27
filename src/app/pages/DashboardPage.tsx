import { useEffect, useState } from 'react';
import { Clock, Image as ImageIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getPredictionHistory, type PredictionHistoryRow } from '../services/predictionHistory';
import { Badge } from '../components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';

export function DashboardPage() {
  const { user } = useAuth();
  const [predictions, setPredictions] = useState<PredictionHistoryRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadPredictions = async () => {
      if (!user) return;

      try {
        const rows = await getPredictionHistory(user.id);
        setPredictions(rows);
      } catch {
        setError('Could not load prediction history.');
      } finally {
        setLoading(false);
      }
    };

    loadPredictions();
  }, [user]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-5xl space-y-6">
        <div>
          <h1 className="text-3xl font-semibold">Dashboard</h1>
          <p className="text-muted-foreground">Your saved wildlife prediction history</p>
        </div>

        {loading ? (
          <Card>
            <CardContent className="p-8 text-center text-muted-foreground">Loading...</CardContent>
          </Card>
        ) : error ? (
          <Card>
            <CardContent className="p-8 text-center text-destructive">{error}</CardContent>
          </Card>
        ) : predictions.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center text-muted-foreground">
              <ImageIcon className="mx-auto mb-3 h-10 w-10 opacity-60" />
              No saved predictions yet.
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {predictions.map((item) => (
              <Card key={item.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between gap-3">
                    <CardTitle className="text-lg">{item.predicted_animal}</CardTitle>
                    <Badge variant="secondary">{item.confidence}%</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.predicted_animal}
                      className="h-40 w-full rounded-md object-cover"
                    />
                  )}
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <p>Uploaded wildlife image</p>
                    <p className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      {new Date(item.created_at).toLocaleString()}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
