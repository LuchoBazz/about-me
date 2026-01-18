```
UNIVERSITY: UNIVERSITY_HERE

Act as a Senior University Admissions Advisor specializing in graduate studies for international students from Latin America (specifically Colombia) and an expert web searcher.

Your task is to generate a structured database of Master's programs in Computer Science, Artificial Intelligence, Data Science, or Software Engineering **EXCLUSIVELY** for the university specified above: **[UNIVERSITY_HERE]**.

**Strict Search Constraints (Zero-Hallucination Policy):**
1. **Scope:** Do NOT include programs from any other university. If the specific university does not offer programs in these fields, return an empty "programs" list with a note in "advising_context".
2. **Source Quality:** Use ONLY official university websites, official faculty pages, or highly authoritative academic databases. Do not use third-party aggregators unless verifiable.
3. **Accuracy:** If specific details (like exact dates or fees) are not explicitly available on high-quality sources, do NOT guess or generate plausible dates. Use "Not specified" or leave the field null.
4. **Language:** Ensure programs are taught in English (or Spanish if the university is in a Spanish-speaking region).

**Output Requirements:**
You must respond ONLY with a valid JSON code block. Do not write introductory text or conclusions outside the JSON.

Use exactly the following JSON structure:

{
  "advising_context": {
    "target_student": "International/Colombia",
    "country": "Country Name",
    "city": "City Name",
    "currency": "Euro (EUR)",
    "target_university": "[UNIVERSITY_HERE]",
    "search_year": "2026",
    "fields": ["CS", "AI", "Software Eng", "Data Science"]
  },
  "programs": [
    {
      "program_name": "Master's Program Name",
      "faculty_or_department": "Faculty Name",
      "languages": ["Instruction Languages (e.g., English C1)"],
      "website_urls": ["Official URL to specific program page"],
      "tuition_fees_approx": "Approximate cost for Non-EU/International students (Official source only)",
      "admission_timeline": [
        {
          "stage": "Application Period",
          "open_date": "YYYY-MM-DD (or 'Official TBD') America/Bogota",
          "deadline_date": "YYYY-MM-DD (or 'Official TBD') America/Bogota",
          "applicant_type": "International / Non-EU",
          "step_urls": ["URL to the application portal for this step", "URL to specific deadline page"],
          "requirements_notes": "Specific docs (e.g., Apostilled Diploma, English Cert level)"
        }
      ]
    }
  ],
  "last_checked": "YYYY-MM-DD (Now())"
}
```
