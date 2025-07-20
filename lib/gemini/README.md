# Gemini Utils 

This module provides prompt-building and response-parsing logic for Gemini API outputs. 

---

## Regex Breakdown 

### Q\&A Regex (used when `type === "qna"`) 

```
/Q:\s*(.*?)\s*A:\s*(.*?)(?=\nQ:|$)/gs
```

| Pattern   | Meaning             | Example                | Purpose                    |                         |
| --------- | ------------------- | ---------------------- | -------------------------- | ----------------------- |
| `Q:`      | Literal             | `Q:`                   | Marks start of question    |                         |
| `\s*`     | Optional whitespace | Space/newline          | Tolerant format            |                         |
| `(.*?)`   | Non-greedy capture  | `"What is HTML?"`      | Captures just the question |                         |
| `A:`      | Literal             | `A:`                   | Marks start of answer      |                         |
| `(.*?)`   | Non-greedy capture  | `"A markup language."` | Captures just the answer   |                         |
| \`(?=\nQ: | \$)\`               | Lookahead              | Next `Q:` or end           | Ends the match properly |
| `g`       | Global flag         | –                      | Finds all matches          |                         |
| `s`       | Dot-all flag        | –                      | Allows newlines in answers |                         |

---

### Question-only Regex (used for non-`qna`) 

```
/Q:\s*(.*)/g
```

| Pattern | Meaning             | Purpose               |
| ------- | ------------------- | --------------------- |
| `Q:`    | Literal             | Start of question     |
| `\s*`   | Optional whitespace | Tolerant format       |
| `(.*)`  | Greedy match        | Capture full question |
| `g`     | Global flag         | Match all             |

---

## Output Format 

Returns an array of: 

```ts
{ question: string; answer: string }
```

Depending on mode, `answer` may be an empty string. 

---
