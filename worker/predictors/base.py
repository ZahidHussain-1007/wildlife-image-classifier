"""Base predictor abstraction placeholder."""


class BasePredictor:
    model_name: str = "base"

    def predict(self, payload: object) -> dict[str, object]:
        raise NotImplementedError("Inference is not implemented yet.")
