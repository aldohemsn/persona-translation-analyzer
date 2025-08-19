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

The system consists of two core components: a set of AI instructions for data generation and a powerful, standalone visualizer for analysis.

### Step 1: AI-Powered Analysis

The analysis is performed by a Large Language Model (e.g., Google's Gemini) that has been given a detailed system prompt.

1.  **Input:** The user provides the AI with one or more translation "triptychs." Each consists of the source text, a draft translation, and a final revised version.
    
2.  **Processing:** The AI, guided by the `ai_instruction_json_generation.md` prompt, analyzes the draft using the calibrated Analyst-Architect-Stylist framework.
    
3.  **Output:** The AI generates a structured `JSON` object. For each identified issue, the JSON captures a complete diagnostic triptych: the `source_segment`, the flawed `draft_segment`, and the corrected `revision_segment`.
    
    ```
    [
      {
        "case_id": "CASE-001",
        "source": "Full source text...",
        "draft": "Full draft text...",
        "revision": "Full revision text...",
        "diagnostics": [
          {
            "persona": "Analyst",
            "source_segment": "The specific, complete semantic unit from the source.",
            "draft_segment": "The corresponding flawed segment from the draft.",
            "revision_segment": "The corresponding corrected segment from the revision."
          }
        ]
      }
    ]
    ```
    

### Step 2: Interactive Visualization (`analyzer.html`)

This tool is a rich, interactive, and fully responsive visualizer for the data produced by the AI.

1.  **Input:** The user loads the `JSON` data, either by pasting it directly into the application or by loading a `.json` file.
    
2.  **Visualization:** The tool renders a comprehensive, single-view report:
    
    -   **Unified Report Layout:** Eliminates panel-switching by presenting each case as a self-contained card in a single, scrollable view.
        
    -   **Side-by-Side Comparison:** Within each case, the **Draft** and **Revision** texts are placed directly next to each other for immediate, intuitive comparison.
        
    -   **Collapsible Source Text:** The source text for each case is housed in a collapsible panel, ensuring it is always available as a reference without cluttering the view.
        
    -   **Segment-to-Segment Highlighting:** Clicking on a highlighted issue in the **Source**, **Draft**, or **Revision** instantly highlights the corresponding segments in the other two columns, creating a tight analytical feedback loop.
        
    -   **Global Persona Filtering:** A streamlined header bar allows users to filter the entire report by persona, instantly focusing the view on specific types of issues across all cases.
        

## Features

-   **Deep, Nuanced Analysis:** Moves beyond simple error-checking to provide qualitative feedback on style and structure.
    
-   **Intuitive Single-View UI:** A streamlined, single-report interface creates a seamless analytical workflow where all components are logically structured.
    
-   **Precise Cross-Highlighting:** Clicking an issue in one text area instantly highlights its counterpart in the others, linking cause and effect.
    
-   **Robust Offline Capability:** The analyzer is a single HTML file that runs entirely in the browser with local assets, requiring no internet connection or complex setup.
    
-   **Responsive Design:** The layout adapts gracefully to any screen size and zoom level, ensuring a consistent and polished experience.
    
-   **Standardized Data Format:** The use of a structured `JSON` input provides a portable and consistent record of the analysis.
    

## Setup and Usage

1.  **Generate Diagnostics:**
    
    -   Using an AI platform of your choice (e.g., Google's AI Studio), provide the AI with the system prompt from `ai_instruction_json_generation.md`.
        
    -   Provide the AI with your translation triptychs.
        
    -   Copy the resulting `JSON` output from the AI.
        
2.  **Review the Analysis:**
    
    -   Open `analyzer.html` in a modern web browser.
        
    -   Click "Paste JSON" to paste the content you copied, or "Load File" to select a `.json` file.
        
    -   Review the interactive report.
        

## Building an Offline Production Version

For use in isolated or secure environments, the `analyzer.html` tool is designed to be fully self-contained.

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

### 2. Dependencies

The analyzer requires **Tailwind CSS** and the **Inter** & **Noto Sans SC** fonts. For offline use, these must be downloaded and placed in the `/assets/` directory as structured above.

### 3. Create Local Stylesheets

-   **`styles.css`:** Create this file in `/assets/css/`. Copy all CSS rules from the `<style>` block in `analyzer.html` and paste them into this new file.
    
-   **`fonts.css`:** Use the CSS content generated by a tool like Google Webfonts Helper for your selected fonts.
    

### 4. Link Local Assets in `analyzer.html`

Modify the `<head>` of `analyzer.html` to link to your local, offline assets. Remove any CDN links and the inline `<style>` block.

**Ensure your links are relative:**

```
<link rel="stylesheet" href="./assets/css/tailwind.min.css">
<link rel="stylesheet" href="./assets/css/fonts.css">
<link rel="stylesheet" href="./assets/css/styles.css">
```

The resulting `analyzer.html` is now a fully portable, production-ready application that will run in any modern browser without an internet connection.