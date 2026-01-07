# AI-Assisted Text Classification API

## Description
This project provides a REST API that classifies input text into predefined
categories such as **Complaint**, **Query**, **Feedback**, or **Other**.

## Endpoint
POST /api/classify-text

## Request
{
  "text": "I am unhappy with the service"
}

## Response
{
  "category": "Complaint",
  "confidence": 0.9
}

## Setup
npm install
npm start

## AI Usage
The service uses the Hugging Face Inference API for AI-based text classification.
A zero-shot classification model (`facebook/bart-large-mnli`) is used to classify
input text into predefined categories.

If the AI provider returns confidence scores, they are used directly.
If confidence is not returned, a predefined confidence mapping is applied
to ensure consistent API output.




