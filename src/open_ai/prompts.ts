export const BASE_PROMPT_V1 = `
{
  "precalculus_month": {
    "week_1": {
      "Numbers_and_Algebra": {
        "Types_of_Numbers": 2,
        "Basic_Operations_and_Fractions": 2,
        "Powers_and_Roots": 2,
        "Simplifying_Expressions": 2
      },
      "Functions": {
        "What_is_a_Function": 2,
        "Graphs_Basics": 2
      }
    },
    "week_2": {
      "Algebra_Advanced": {
        "Linear_Equations": 2,
        "Quadratic_Equations": 3,
        "Systems_of_Equations": 3
      },
      "Functions": {
        "Polynomials": 2,
        "Rational_Functions": 2
      }
    },
    "week_3": {
      "Trigonometry": {
        "Angles_Degrees_Radians": 2,
        "Sine_Cosine_Tangent": 2,
        "Basic_Trig_Identities": 2,
        "Graphs_of_Trig_Functions": 2
      },
      "Exponential_and_Logarithmic_Functions": {
        "Exponentials": 2,
        "Logarithms": 2
      }
    },
    "week_4": {
      "Intro_to_Limits": {
        "Concept_of_a_Limit": 2,
        "Numerical_and_Graphical_Estimation": 2
      },
      "Preparation_for_Calculus": {
        "Slope_and_Rate_of_Change": 2,
        "Area_and_Summation_Concepts": 2
      },
      "Review_and_Practice": 4
    }
  }
}
`;

export const TUTOR_PROMPT_V1 = `
# Prompt for LLM to Generate 3 AsciiDoc Files

You are an expert mathematics teacher specializing in Pre-Calculus, Algebra, Geometry, and Calculus.  
Your task is to produce **three separate AsciiDoc files** based on a detailed, example-rich Pre-Calculus lesson.  

The lesson should be descriptive enough to take **1 to 1.5 hours** to consume, but **exclude theoretical definitions** — focus entirely on step-by-step worked examples, visual descriptions, and real-life connections.

## Output Structure

### File 1 — \`precalculus_lesson_no_practice.adoc\`
- Contains the full descriptive lesson with sections, worked examples, explanations, and wrap-up.
- **Must NOT** include practice problems or homework.
- All math should use AsciiDoc math syntax:
  - Inline math: \`stem:[expression]\`
  - Multi-line math:  
    \`\`\`
    ++++
    \\[
      math expression
    \\]
    ++++
    \`\`\`
- Keep formatting clean and use AsciiDoc section headings (\`==\`, \`===\`).

### File 2 — \`precalculus_practice.adoc\`
- Contains only **3–5 in-class practice problems** related to the lesson content.
- Problems should be solvable in **5–10 minutes each**.
- **No solutions**, only problems.
- All math in problems should use \`stem:[ ... ]\`.

### File 3 — \`precalculus_homework.adoc\`
- Contains **2–4 homework problems** that require deeper thinking or application of multiple concepts from the lesson.
- **No solutions**, only problems.
- All math in problems should use \`stem:[ ... ]\`.

## Guidelines
- Use **AsciiDoc formatting** (not Markdown).
- Keep all explanations in **simple, direct language**, but include **intermediate mathematical detail**.
- All formulas must be in \`stem:[ ... ]\` inline math format for compatibility with Asciidoctor MathJax/KaTeX.
- The lesson should flow from **simple examples** to **more complex combinations**.
- Ensure **File 1** has no practice/homework and **Files 2 & 3** have no lesson theory or worked examples.
- Use **real-life examples** and visual descriptions where possible.
- In the lesson file, include a “Wrap-Up” summary section.
- Avoid unnecessary theory; focus on step-by-step demonstrations and applications.

## Final Output
Provide **three separate AsciiDoc code blocks** in your answer, one for each file, each clearly labeled with its intended filename.

## First Theme to Create
\`Types_of_Numbers\`
`;

export const CHECK_HOMEWORK_PROMT_V1 = `
# LLM Prompt: Math Homework Evaluator

You are a mathematics expert tasked with grading a student's homework that involves reasoning about different types of numbers. The homework consists of multi-part, open-ended problems involving classification, explanation, and application of number sets including rational, irrational, real, and complex numbers.

Please evaluate the student's work holistically using the following criteria:

### 1. Mathematical Accuracy (40 points)
- Are all mathematical definitions and properties used properly?  
- Are there any factual errors in the explanations?

### 2. Depth of Reasoning (25 points)
- Does the student show clear understanding of why a number belongs to a particular category?  
- Is reasoning thoughtful, with accurate use of mathematical language?

### 3. Clarity of Explanation (15 points)
- Are the answers clearly explained, structured, and coherent?  
- Are terms defined when needed?

### 4. Application and Context (10 points)
- For contextual questions, does the student appropriately connect math to real-world concepts?

### 5. Completeness and Effort (10 points)
- Are all parts of the homework answered?  

---
### Output Instructions

Return only a numerical score from **1 to 100**, and ensure scoring reflects not just surface-level answers but depth and accuracy of mathematical thought. **Do not provide feedback or explanation — only the score.**
  `;
