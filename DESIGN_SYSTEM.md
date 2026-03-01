# Wavelength Game Design System

This document outlines the standardized aesthetic rules for the Wavelength Game site. These styles focus on a modern, premium "dark mode" look using performant Tailwind CSS classes (no heavy JavaScript animations). 

When creating or updating pages, reference these standard class groupings.

## 1. Glassmorphism Cards
Instead of flat background colors, use a semi-transparent background with a blur effect and subtle borders to create depth.

**Standard Classes:**
- Background: `bg-slate-900/40` or `bg-white/5` (depending on the base color needed)
- Blur: `backdrop-blur-md`
- Border: `border border-white/10` or `border-slate-800`
- Base styling: `rounded-xl` or `rounded-2xl`, `overflow-hidden`

*Example Usage:*
```tsx
<div className="bg-slate-900/40 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden p-6">
  {/* Card Content */}
</div>
```

## 2. Micro-interactions (Hover States)
Interactive elements (like game mode cards and buttons) should feel responsive without distracting animations.

**Standard Classes for Clickable Cards:**
- Transition: `transition-all duration-300 ease-out`
- Hover Lift: `hover:-translate-y-1`
- Hover Border: `hover:border-white/20` or `hover:border-primary/50`
- Hover Glow (Optional): `hover:shadow-[0_0_20px_rgba(255,255,255,0.05)]`

*Example Usage:*
```tsx
<div className="transition-all duration-300 ease-out hover:-translate-y-1 hover:border-white/20 bg-slate-900/40 backdrop-blur-md border border-white/10 rounded-2xl p-6 cursor-pointer">
  {/* Card Content */}
</div>
```

## 3. Typographic Hierarchy & Contrast
Ensure strong contrast between primary headings and secondary descriptions to guide the user's eye.

**Standard Classes:**
- Primary Headings/Titles: `text-white` or `text-foreground`, `font-bold`
- Secondary Subtitles/Text: `text-slate-400` or `text-white/60`
- Text Shadow (High-impact headings only): `drop-shadow-sm` or `drop-shadow-md`

*Example Usage:*
```tsx
<h1 className="text-4xl font-bold text-white drop-shadow-sm">Main Title</h1>
<p className="text-xl text-slate-400 mt-2">Are you on the same wavelength?</p>
```

## 4. Gradient Text Accents
Use gradient text to make key brand elements or distinct features pop.

**Standard Classes:**
- Base: `bg-clip-text text-transparent`
- Gradient: `bg-gradient-to-r from-white to-slate-400` (Subtle Silver)
- Alternative Gradient: `bg-gradient-to-r from-slate-200 to-slate-500`

*Example Usage:*
```tsx
<span className="bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent font-bold">
  Wavelength
</span>
```

## 5. Glow and Ambient Shadows
Instead of pure black shadows, use faint colored shadows to make elements feel illuminated.

**Standard Classes:**
- Background Glow (Behind primary elements): `shadow-[0_0_30px_-10px_rgba(255,255,255,0.1)]`
- Primary Button Glow: `shadow-[0_0_15px_rgba(255,255,255,0.1)]`

*Example Usage:*
```tsx
<button className="bg-white text-black rounded-full px-6 py-2 shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all hover:scale-105 hover:shadow-[0_0_25px_rgba(255,255,255,0.2)]">
  Play Now
</button>
```

## Application Checklist
When reviewing a page for aesthetic compliance, ensure:
1. [ ] Solid flat blocks (like `bg-slate-900`) are replaced with glassmorphism (`bg-slate-900/40 backdrop-blur-md border border-white/10`).
2. [ ] Primary text is pure white `text-white`/`text-foreground` while secondary text is distinctly muted `text-slate-400`/`text-muted-foreground`.
3. [ ] All interactive cards have `transition-all duration-300 hover:-translate-y-1 hover:border-white/20`.
4. [ ] The main page title/logo utilizes either subtle gradient text or a drop-shadow.
