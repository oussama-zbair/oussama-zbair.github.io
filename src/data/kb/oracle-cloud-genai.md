# OCI Generative AI Professional

## Overview

This document covers the Oracle Cloud Infrastructure 2025 Generative AI Professional certification (1Z0-1127), focusing on large language models, embeddings, RAG, and OCI AI services.

---

## Core Concepts

### Large Language Models on OCI

OCI Generative AI service provides access to foundation models including Cohere Command, Meta Llama, and Oracle's own models for text generation, summarisation, and embeddings.

### Key Terms

| Term | Definition |
|---|---|
| **Token** | Basic unit of text (~4 chars); models have token limits |
| **Embedding** | Dense vector representation of text for semantic search |
| **RAG** | Retrieval-Augmented Generation — inject retrieved docs into LLM context |
| **Fine-tuning** | Adapt a foundation model to a specific domain with labelled data |
| **Prompt** | Input instruction/context given to the model |

---

## OCI AI Services

- **OCI Generative AI** — managed LLM inference and fine-tuning.
- **OCI AI Language** — NLP: sentiment, key phrases, NER, translation.
- **OCI Vision** — image classification, object detection, document AI.
- **OCI Speech** — transcription and text-to-speech.
- **OCI Anomaly Detection** — time-series anomaly detection.

---

## RAG Architecture

```
User Query → Embedding Model → Vector Search (OCI OpenSearch / 23ai) 
→ Retrieved Chunks → LLM Context → Generated Response
```

---

## Cheat Sheet

```
OCI GenAI: Cohere | Llama | Text generation | Summarisation | Embeddings
RAG pipeline: Embed → Store → Retrieve → Generate
Fine-tuning: T-Few | Vanilla — domain adaptation
```
