
# Persona Translation Analyzer

A sophisticated, two-part system for AI-powered translation quality assessment, moving beyond literal accuracy to diagnose issues of style, structure, and nuance.

## The Core Concept: A Three-Persona Framework

Traditional translation analysis often focuses on grammatical correctness and literal equivalence. This project introduces a more holistic model, evaluating a translation from three distinct cognitive roles, or "Personas." This framework allows for a deeper, more actionable critique that mirrors the complex cognitive process of a professional human translator.

1.  **The Analyst (Source Comprehension Expert):** This persona is singularly focused on the **source text**. Its mission is to conduct a thorough investigation of the original material, ensuring a complete and precise understanding of its facts, intent, style, and subtext.
    
    -   **Primary Failure Mode:** `Knowledge Deficit`, stemming from a lack of domain-specific knowledge or a failure to grasp subtle linguistic cues.
        
2.  **The Architect (Transfer & Deverbalization Strategist):** This persona acts as an architect of the **target language structure**. Its role is to "deverbalize" the meaning extracted by the Analyst and re-design it within a natural, logical, and idiomatic framework in the target language.
    
    -   **Primary Failure Mode:** `Process Discipline Failure`, a failure of mental habit where the Architect defaults to replicating the source structure out of inertia.
        
3.  **The Stylist (Target-Language Polish Expert):** This persona is the final arbiter of **stylistic finish** in the **target text**. Its duty is to polish the final draft with precise vocabulary, authentic flair, and appropriate register.
    
    -   **Failure Modes:** A `Resource Gap` (lexical awkwardness) or a `Process Failure` (a lapse in diligence and polish).
        

## How It Works: A Two-Step Workflow

The system is composed of two distinct, client-side tools that work in tandem.

### Step 1: Generation (`generator.html`)

This tool leverages a Large Language Model (Google's Gemini) to perform the diagnostic analysis.

1.  **Input:** The user provides a `.txt` file containing translation "triptychs." Each triplet consists of the source text, a draft translation, and a final revised version.
    
2.  **Configuration:** The user enters their Gemini API key.
    
3.  **Processing:** The tool sends the triplets to the AI, along with a detailed system prompt that instructs it to analyze the draft using the calibrated Analyst-Architect-Stylist framework.
    
4.  **Output:** The tool generates a structured `cases.json` file containing the detailed analysis, which the user then downloads.
    

### Step 2: Analysis (`analyzer.html`)

This tool is a rich, interactive visualizer for the data produced by the Generator.

1.  **Input:** The user loads the `cases.json` file generated in the previous step.
    
2.  **Visualization:** The tool renders a comprehensive, continuous report:
    
    -   A clean, three-column layout displays the source, draft, and revision side-by-side for easy comparison.
        
    -   Within the draft translation, problematic phrases and sentences are highlighted with color-coded ribbons corresponding to the responsible Persona.
        
    -   Hovering over any highlighted text reveals a detailed tooltip with the specific cause and the AI's full explanation.
        

## Features

-   **Deep, Nuanced Analysis:** Moves beyond simple error-checking to provide qualitative feedback on style and structure based on a calibrated analytical framework.
    
-   **Interactive Diagnostic Identifiers:** Replaces a static count with interactive, color-coded dots in each case header. Hovering over an identifier instantly highlights the corresponding error in the text, providing a fluid way to locate issues, especially overlapping ones.
    
-   **Focus Control:** A toggle allows the user to show or hide the "Revised Text" column, enabling focused comparison between the source and the draft translation while preserving the layout.
    
-   **Cohesive Reading Experience:** Presents cases as a single, continuous document to facilitate in-context understanding of sequential texts.
    
-   **Client-Side Operation:** No server or complex setup required. Both tools run directly in your web browser.
    
-   **Standardized Data Format:** The `cases.json` output provides a structured, portable record of the analysis.
    

## Setup and Usage

1.  **Prepare Your Data:** Create a `.txt` file. For each translation case you want to analyze, add the source text, the draft translation, and the final revision, each on its own line. Separate each three-line case with a blank line.
    
2.  **Generate Diagnostics:**
    
    -   Open `generator.html` in a modern web browser.
        
    -   Paste your Gemini API key into the designated field.
        
    -   Upload your `.txt` file.
        
    -   Click "Run Analysis" and wait for the process to complete.
        
    -   Download the resulting `cases.json` file.
        
3.  **Review the Analysis:**
    
    -   Open `analyzer.html` in your browser.
        
    -   Drag-and-drop or click to load the `cases.json` file.
        
    -   Review the interactive report.
        

## Technical Details

-   **Stack:** Vanilla JavaScript, Tailwind CSS, HTML5
    
-   **Dependencies:** None, apart from the browser's native capabilities. The Generator requires an internet connection to access the Gemini API.
    

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.
