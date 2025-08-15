export type BasePromptV1Response = {
  style_similarity: number;
  appearance_similarity: number;
  weight_similarity: number;
  age_similarity: number;
  overall_similarity: number;
  explanation: number;
  style: {
    appearance: number;
    weight: number;
    age: number;
  };
  style_based_message: string;
};

export type OpenAiReviewType = { score: number; review_details: string };
