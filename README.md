
# Persona Translation Analyzer

A sophisticated, client-side tool for AI-powered translation quality assessment, moving beyond literal accuracy to diagnose issues of style, structure, and nuance through a calibrated analytical framework.

## The Core Concept: A Three-Persona Framework

Traditional translation analysis often focuses on grammatical correctness and literal equivalence. This project introduces a more holistic model, evaluating a translation from three distinct cognitive roles, or "Personas." This framework allows for a deeper, more actionable critique that mirrors the complex cognitive process of a professional human translator, identifying not just _what_ is wrong, but _why_ it went wrong.

1.  **The Analyst (Source Comprehension Expert):** This persona is singularly focused on the **source text**. Its mission is to conduct a thorough investigation of the original material, ensuring a complete and precise understanding of its facts, intent, style, and subtext.
    
    -   **Primary Failure Mode:** `Knowledge Deficit`, stemming from a lack of domain-specific knowledge or a failure to grasp subtle linguistic cues.
        
2.  **The Architect (Transfer & Deverbalization Strategist):** This persona acts as an architect of the **target language structure**. Its role is to "deverbalize" the meaning extracted by the Analyst and re-design it within a natural, logical, and idiomatic framework in the target language.
    
    -   **Primary Failure Mode:** `Process Discipline Failure`, a failure of mental habit where the Architect defaults to replicating the source structure out of inertia.
        
3.  **The Stylist (Target-Language Polish Expert):** This persona is the final arbiter of **stylistic finish** in the **target text**. Its duty is to polish the final draft with precise vocabulary, authentic flair, and appropriate register.
    
    -   **Failure Modes:** A `Resource Gap` (lexical awkwardness) or a `Process Failure` (a lapse in diligence and polish).
        

## How It Works: A Streamlined Workflow

The system has been refactored into two core components: a set of AI instructions and a powerful, standalone visualizer.

### Step 1: AI-Powered Analysis

The analysis is performed by a Large Language Model (e.g., Google's Gemini) that has been given a detailed system prompt.

1.  **Input:** The user provides the AI with one or more translation "triptychs." Each triplet consists of the source text, a draft translation, and a final revised version.
    
2.  **Processing:** The AI, guided by the `ai_instruction_json_generation.md` prompt, analyzes the draft using the calibrated Analyst-Architect-Stylist framework.
    
3.  **Output:** The AI generates a structured `JSON` object containing the detailed analysis, which the user then copies.
    

### Step 2: Interactive Visualization (`analyzer.html`)

This tool is a rich, interactive, and fully responsive visualizer for the data produced by the AI.

1.  **Input:** The user loads the `JSON` data, either by pasting it directly into the application or by loading a `.json` file.
    
2.  **Visualization:** The tool renders a comprehensive and interactive report:
    
    -   **Two-Panel Layout:** A fluid, responsive layout presents the case list on the left and a dedicated, context-aware "Critique Panel" on the right.
        
    -   **Side-by-Side Comparison:** On larger screens, each case card displays the source, draft, and revision in a three-column format for immediate comparison.
        
    -   **Interactive Diagnostics:** Clicking on a case, a highlighted phrase in the text, or a specific diagnostic card in the critique panel instantly focuses the relevant information across the entire interface.
        
    -   **Persona Filtering:** A header dashboard allows users to filter the entire report by persona, automatically scrolling to the first relevant case.
        
    -   **At-a-Glance Indicators:** Color-coded dots in each case header provide a quick visual map of the diagnostic types within, enhancing scannability when filtering.
        

## Features

-   **Deep, Nuanced Analysis:** Moves beyond simple error-checking to provide qualitative feedback on style and structure.
    
-   **Fully Interactive UI:** A dynamic, two-panel interface creates a seamless analytical workflow where all components are interconnected.
    
-   **Responsive Design:** The layout adapts gracefully to any screen size, from large desktop monitors to mobile devices, ensuring a polished experience.
    
-   **Enhanced Readability:** A focus on clear typography, with increased font sizes and optimized line height, makes for comfortable long-form reading and analysis.
    
-   **Client-Side Operation:** The analyzer runs entirely in the browser with no server-side dependencies or complex setup required.
    
-   **Standardized Data Format:** The use of a structured `JSON` input provides a portable and consistent record of the analysis.
    

## Setup and Usage

1.  **Generate Diagnostics:**
    
    -   Using an AI platform of your choice (e.g., Google's AI Studio), provide the AI with the system prompt from `ai_instruction_json_generation.md`.
        
    -   Provide the AI with your translation triptychs.
        
    -   Copy the resulting `JSON` output from the AI.
        
2.  **Review the Analysis:**
    
    -   Open `analyzer.html` in a modern web browser.
        
    -   Click "Paste JSON" to paste the content you copied, or save the content as a `.json` file and load it via the "Load File" button.
        
    -   Review the interactive report.
        

## Building an Offline Production Version

For use in isolated or secure environments, the `analyzer.html` tool can be made fully self-contained.

### 1. Project Structure

Organize your files as follows:

```
/persona-translation-analyzer-offline/
|-- analyzer.html
|-- /assets/
|   |-- /css/
|   |   |-- tailwind.min.css
|   |   |-- fonts.css
|   |   |-- styles.css
|   |-- /fonts/
|   |   |-- (all .woff2 font files)
```

### 2. Download Dependencies

The analyzer requires **Tailwind CSS** and the **Inter** & **Noto Sans SC** fonts.

-   **Tailwind CSS:** Download the pre-compiled `tailwind.min.css` file from the [official releases](https://github.com/tailwindlabs/tailwindcss/releases "null") and place it in `/assets/css/`.
    
-   **Fonts:** Use a tool like [Google Webfonts Helper](https://gwfh.mranftl.com/fonts "null") to download the necessary font files (`.woff2` format).
    
    -   **Fonts to select:** `Inter` and `Noto Sans SC`.
        
    -   **Character sets:** `latin`, `latin-ext` (for Spanish/European languages), and `chinese-simplified`.
        
    -   **Organization:** Place all `.woff2` files in `/assets/fonts/`. Copy the CSS provided by the tool into `/assets/css/fonts.css`.
        

### 3. Create Local Stylesheets

-   **`styles.css`:** Create this file in `/assets/css/`. Copy all CSS rules from the `<style>` block in `analyzer.html` and paste them into this new file.
    
-   **`fonts.css`:** Use the CSS content from the font download step. For optimal multi-language support, structure this file as a "font stack" that prioritizes `Noto Sans SC` for Chinese characters before falling back to `Inter` for Latin scripts.
    

### 4. Update `analyzer.html`

Modify the `<head>` of `analyzer.html` to link to your local, offline assets. Remove the CDN links and the inline `<style>` block.

**Replace this:**

```
<script src="[https://cdn.tailwindcss.com](https://cdn.tailwindcss.com)"></script>
<link rel="preconnect" href="[https://fonts.googleapis.com](https://fonts.googleapis.com)">
<link rel="preconnect" href="[https://fonts.gstatic.com](https://fonts.gstatic.com)" crossorigin>
<link href="[https://fonts.googleapis.com/css2?family=Inter...&display=swap](https://fonts.googleapis.com/css2?family=Inter...&display=swap)" rel="stylesheet">
<style>
    /* ... inline styles ... */
</style>
```

**With this:**

```
<link rel="stylesheet" href="./assets/css/tailwind.min.css">
<link rel="stylesheet" href="./assets/css/fonts.css">
<link rel="stylesheet" href="./assets/css/styles.css">
```

The resulting folder is now a fully portable, production-ready application that will run in any modern browser without an internet connection.
