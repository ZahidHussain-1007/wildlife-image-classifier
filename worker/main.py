"""Placeholder entry point for the future FastAPI worker service."""

from core.orchestrator import describe_orchestrator


def describe_worker() -> dict[str, object]:
    return {
        "service": "animal-species-worker",
        "status": "placeholder",
        "orchestrator": describe_orchestrator(),
    }
