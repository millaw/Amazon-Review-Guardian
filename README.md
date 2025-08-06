# Amazon Review Guardian

Amazon Review Guardian is a lightweight browser extension that helps users detect trustworthy reviews on Amazon by assigning **letter grades (A–F)** to individual reviews based on their content and trust signals — without scraping or violating platform policies.

## 🔍 What It Does

- Grades each Amazon review from **A** (most trustworthy) to **F** (least trustworthy)
- Adds visible colored badges directly next to each review title
- Helps shoppers make smarter decisions based on **review quality**, not just star ratings

## 🎯 Grading Criteria

| Condition                                 | Points |
|-------------------------------------------|--------|
| Verified Purchase                         | +2     |
| Review Length > 300 characters            | +2     |
| Review Length > 100 characters            | +1     |
| Neutral Star Rating (3 stars)             | +1     |
| Extreme Star Rating (1 or 5 stars)        | –1     |
| Contains Negative Words (e.g. “scam”)     | –2     |
| Contains Positive Words (e.g. “love”)     | +1     |

| Score | Grade |
|-------|-------|
| ≥ 4   | A     |
| 3     | B     |
| 2     | C     |
| 1     | D     |
| ≤ 0   | F     |

## 🧠 Why It Matters

Amazon is full of real and fake reviews. This extension helps:
- Highlight reviews that feel more authentic
- Spot suspicious reviews quickly
- Save you from regretful purchases and frustrating returns

No personal data is collected. No scraping. Safe and privacy-conscious.

## 🖥️ How to Install (Developer Mode)

1. Clone or download this repo
2. Open **Chrome** or **Edge** → `chrome://extensions` or `edge://extensions`
3. Enable **Developer Mode**
4. Click **"Load unpacked"** and select the project folder
5. Go to Amazon and see the badges appear!

## 📦 File Structure

amazon-review-guardian/
├── background.js
├── contentScript.js
├── popup.html
├── popup.css
├── icon.png
├── manifest.json
└── README.md

---

## 🔐 Privacy

- Does not send or store any data
- Runs 100% in the browser
- No analytics, no cookies, no tracking

---

## 📄 License

MIT License — open-source and community supported.

---

Created with ❤️ to help shoppers avoid fake reviews.
