# Google AI Professional

## Overview

The Google AI Professional Certificate validates knowledge of machine learning concepts, Vertex AI, responsible AI, and practical ML workflows on Google Cloud. Completed March 2026.

---

## Core ML Concepts

### Supervised vs Unsupervised Learning

| Type | Definition | Examples |
|---|---|---|
| **Supervised** | Train on labelled data (input + correct output) | Classification, Regression |
| **Unsupervised** | Find patterns in unlabelled data | Clustering, Dimensionality Reduction |
| **Reinforcement** | Agent learns by reward/penalty from environment actions | Game AI, Robotics |

### The ML Workflow

1. **Define the problem** — classification, regression, generation?
2. **Collect and prepare data** — clean, label, split (train/val/test).
3. **Choose and train model** — select architecture, tune hyperparameters.
4. **Evaluate** — accuracy, precision, recall, F1, AUC-ROC.
5. **Deploy** — serve predictions via API.
6. **Monitor** — track data drift, model degradation.

### Key Metrics

| Metric | Formula | Use When |
|---|---|---|
| Accuracy | TP+TN / Total | Balanced classes |
| Precision | TP / (TP+FP) | Cost of false positives is high |
| Recall | TP / (TP+FN) | Cost of false negatives is high |
| F1 | 2 × P×R / (P+R) | Balance precision and recall |
| AUC-ROC | Area under ROC curve | Binary classification ranking |

---

## Neural Networks & Deep Learning

### Architecture Basics

- **Input layer** → **Hidden layers** → **Output layer**
- Each neuron: weighted sum of inputs + bias → activation function.
- **Activation functions:** ReLU (hidden layers), Sigmoid/Softmax (output).
- **Backpropagation:** chain rule to compute gradients, update weights via gradient descent.

### Common Architectures

| Architecture | Best For |
|---|---|
| **Dense / MLP** | Tabular data |
| **CNN** | Images — convolutional layers detect local features |
| **RNN / LSTM** | Sequential data — time series, text |
| **Transformer** | NLP, vision — attention mechanism, parallelisable |

### Overfitting & Regularisation

- **Overfitting** — model memorises training data, fails on unseen data.
- **Solutions:** Dropout, L1/L2 regularisation, data augmentation, early stopping, more training data.

---

## Generative AI & LLMs

### Large Language Models

LLMs (GPT, Gemini, LLaMA) are transformer-based models trained on massive text corpora. They predict the next token given a context window.

Key concepts:
- **Tokens** — sub-word units (~4 chars average in English).
- **Context window** — maximum token length the model processes at once.
- **Temperature** — controls randomness (0 = deterministic, >1 = creative).
- **Prompt engineering** — crafting inputs to steer model output.

### Prompt Engineering Techniques

| Technique | Description |
|---|---|
| **Zero-shot** | Ask directly with no examples |
| **Few-shot** | Provide 2-5 examples in the prompt |
| **Chain-of-thought** | Ask the model to "think step by step" |
| **RAG** | Retrieval-Augmented Generation — inject relevant docs into context |
| **System prompts** | Define model persona and constraints |

### Embeddings

Embeddings are dense vector representations of text. Similar meaning = similar vectors (close in vector space). Used for:
- Semantic search
- Recommendation systems
- Clustering documents
- RAG retrieval step

---

## Google Cloud AI Services

| Service | Purpose |
|---|---|
| **Vertex AI** | Unified ML platform — training, deployment, AutoML, MLOps |
| **Gemini API** | Access Google's Gemini LLMs |
| **Vision AI** | Pre-trained image classification, OCR, object detection |
| **Natural Language API** | Sentiment, entity extraction, syntax analysis |
| **Speech-to-Text / Text-to-Speech** | Audio transcription and synthesis |
| **Translation API** | 100+ language translation |
| **AutoML** | Train custom models without writing ML code |

### Vertex AI Pipeline

```
Data → Feature Store → Training Job → Model Registry → Endpoint → Monitoring
```

---

## Responsible AI

Google's responsible AI principles:

1. **Be socially beneficial**
2. **Avoid creating or reinforcing unfair bias**
3. **Be built and tested for safety**
4. **Be accountable to people**
5. **Incorporate privacy design principles**
6. **Uphold high standards of scientific excellence**
7. **Be made available for uses that accord with these principles**

### Fairness & Bias

- **Data bias** — training data over-represents certain groups.
- **Label bias** — human annotators introduce subjective bias.
- **Evaluation:** Measure model performance across demographic slices.
- **Mitigation:** Re-sample data, use fairness-aware algorithms, audit regularly.

### Explainability

- **SHAP** — game-theoretic feature importance.
- **LIME** — local linear approximation of model decisions.
- Vertex AI Explainable AI provides feature attributions for predictions.

---

## Best Practices

- Split data before any preprocessing to prevent data leakage.
- Always establish a simple baseline before complex models.
- Version datasets and models (not just code).
- Monitor production models for data drift and concept drift.
- Document model cards — describe purpose, limitations, fairness evaluation.

---

## Common Mistakes

- Evaluating only on accuracy with imbalanced classes.
- Training on the test set — invalidates evaluation.
- Deploying without monitoring — models degrade silently.
- Ignoring feature engineering — often more impactful than model choice.

---

## Interview Questions

**Q: What is the bias-variance tradeoff?**  
Bias = error from wrong assumptions (underfitting). Variance = sensitivity to noise in training data (overfitting). Increasing model complexity reduces bias but increases variance. The goal is to find the sweet spot that minimises total error on unseen data.

**Q: Explain how transformers work.**  
Transformers process all tokens in parallel using a self-attention mechanism that computes how relevant each token is to every other token. This enables capturing long-range dependencies better than RNNs, and allows efficient parallelisation during training.

**Q: What is RAG and why is it useful?**  
Retrieval-Augmented Generation combines an LLM with a retrieval system. At inference time, relevant documents are fetched from a vector store and injected into the LLM's context. This grounds the model in factual, up-to-date information without retraining.

---

## Cheat Sheet

```
Supervised: Classification | Regression
Unsupervised: Clustering | Dimensionality Reduction

Metrics: Accuracy | Precision | Recall | F1 | AUC-ROC
Overfitting fixes: Dropout | L1/L2 | Augmentation | Early stopping

LLM concepts: Tokens | Context window | Temperature | Embeddings
Prompt types: Zero-shot | Few-shot | CoT | RAG

GCP AI: Vertex AI | Gemini | Vision AI | AutoML | Natural Language API
Responsible AI: Fairness | Explainability | Privacy | Safety
```

---

## My Preparation Strategy

**Duration:** 8 weeks  
**Completed:** March 2026

I combined the official Google Cloud Skills Boost learning path with hands-on labs in Vertex AI. The most valuable practice was building a RAG pipeline with Vertex AI Vector Search and Gemini — it made the theoretical concepts concrete.

**Hardest topics:** Understanding transformer attention mechanisms deeply, Vertex AI MLOps pipeline configuration, and the nuances of responsible AI evaluation frameworks.
