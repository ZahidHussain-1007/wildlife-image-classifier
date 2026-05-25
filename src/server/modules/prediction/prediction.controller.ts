import { Body, Controller, Post } from '@nestjs/common';
import { CreatePredictionDto } from './dto/create-prediction.dto';
import { PredictionService } from './prediction.service';

@Controller('predict')
export class PredictionController {
  constructor(private readonly predictionService: PredictionService) {}

  @Post()
  createPrediction(@Body() createPredictionDto: CreatePredictionDto) {
    return this.predictionService.createPlaceholder(createPredictionDto);
  }
}
