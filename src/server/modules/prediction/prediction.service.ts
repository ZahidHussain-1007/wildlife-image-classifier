import { Injectable } from '@nestjs/common';
import { CreatePredictionDto } from './dto/create-prediction.dto';

@Injectable()
export class PredictionService {
  createPlaceholder(createPredictionDto: CreatePredictionDto) {
    return {
      status: 'placeholder',
      message: 'Prediction endpoint is ready. Worker inference is not implemented yet.',
      received: {
        imageProvided: Boolean(createPredictionDto.imageId || createPredictionDto.imageUrl),
      },
      prediction: null,
    };
  }
}
