import { supabase } from '../../lib/supabase';

export interface PredictionHistoryRow {
  id: string;
  user_id: string;
  image: string | null;
  predicted_animal: string;
  confidence: number;
  created_at: string;
}

interface SavePredictionInput {
  userId: string;
  image: string;
  predictedAnimal: string;
  confidence: number;
}

export async function savePrediction(input: SavePredictionInput) {
  const { error } = await supabase.from('prediction_history').insert({
    user_id: input.userId,
    image: input.image,
    predicted_animal: input.predictedAnimal,
    confidence: input.confidence,
  });

  if (error) {
    throw error;
  }
}

export async function getPredictionHistory(userId: string) {
  const { data, error } = await supabase
    .from('prediction_history')
    .select('id, user_id, image, predicted_animal, confidence, created_at')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    throw error;
  }

  return (data ?? []) as PredictionHistoryRow[];
}
