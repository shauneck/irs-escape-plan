# 🔁 IRS Escape Plan – Emergency Reset & Redeploy Instructions

This file documents how to fully restore or redeploy the app from this GitHub repository if something breaks in Emergent, StackBlitz, or another environment.

---

## 🌐 GitHub Repository

- **Repo:** https://github.com/shauneck/irs-escape-plan.git
- **Branch:** `main-v7` ← use for most work and imports
- **Tag:** `v1.0-complete` ← use to restore this exact stable version

---

## 🚀 Restoring in Emergent

1. Go to: [https://app.emergent.sh](https://app.emergent.sh)
2. In the “Build me an app...” prompt, paste:

```
Please wipe the current project and import from the public GitHub repo:
https://github.com/shauneck/irs-escape-plan.git
Tag: v1.0-complete
Do not retain any previous configuration, files, or prompts. Fully reset the workspace and deploy fresh from this tagged version.
```

3. Wait for Emergent to confirm import and finish compiling.

---

## 🛠 Local Dev Setup (Mac)

If starting fresh locally:

```bash
git clone https://github.com/shauneck/irs-escape-plan.git
cd irs-escape-plan
git checkout v1.0-complete
cd frontend
npm install
npm run dev
```

---

## 🧠 Notes for Safe Updates

- Push all future changes to `main-v7` after testing
- Create feature branches or tags from `main-v7`
- Tag future versions like:
  ```bash
  git tag v1.1-feature-update
  git push origin v1.1-feature-update
  ```

---

**Author:** Quantus Group DevOps  
**Last Updated:** May 31, 2025