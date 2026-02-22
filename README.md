# Xai — Intelligence Workspace

### Frontend Challenge: Product Experience Prototype

**[Go to the live link](https://xai-tau-two.vercel.app/)**

---

## Video Walkthrough

You can watch the video demonstration from here: **[See Video](https://drive.google.com/file/d/1zGp5WFvg36mly8LTlabBwlewmz5VNFWS/view?usp=drive_link)**

---

## Project Vision

**Xai** is a high-fidelity interactive product experience designed to visualize the transformation of raw data into actionable intelligence. This isn't a marketing landing page—it's a deep dive into **UI/UX clarity, intentional motion, and engineering discipline.**

The experience follows a singular narrative: **Raw Data → Structured Intelligence → Actionable Insight.**

### Key Design Pillars

- **Technical Confidence:** A dark, sophisticated palette with "Stripe-level" polish.
- **Calm Power:** Using motion to guide focus rather than distract.
- **Purposeful Geometry:** Abstract 3D elements that represent data flow and logic.

---

## Tech Stack

| Layer                  | Technology                          |
| :--------------------- | :---------------------------------- |
| **Core Framework**     | Next.js 16                          |
| **3D Rendering**       | Three.js / React Three Fiber / Drei |
| **Animation (Scroll)** | GSAP + ScrollTrigger                |
| **Animation (UI)**     | Framer Motion                       |
| **Styling**            | Tailwind CSS + DaisyUI              |
| **Data Viz**           | Recharts                            |
| **Icons**              | Lucide React                        |

---

## Engineering & Motion Philosophy

### 1. The "WOW" Moment: 3D Data Transformation

The hero section features a **React Three Fiber** canvas where abstract particles (Raw Data) respond to the user's scroll and cursor. This demonstrates an understanding of **math-based motion**, transitioning from high-entropy chaos to a structured 3D grid as the user engages.

### 2. Animation Architecture

I utilized a trio-engine approach to motion:

- **GSAP:** Best-in-class for complex, scroll-bound timelines where multiple elements must sync across the DOM and the 3D Canvas.
- **Three.js:** Powers the core spatial narrative, translating abstract data into high-performance 3D geometries that react dynamically to user input and scroll depth.
- **Framer Motion:** Used for "micro-interactions"—button hovers, sidebar transitions, and spring-based layout animations that make the UI feel tactile and responsive.

### 3. Intelligence Dashboard Preview

Instead of static cards, the dashboard features a **Product-First UI**.

- **Visual Hierarchy:** Clean typography and purposeful spacing.
- **Stateful UI:** Real-time filtering and tab transitions using shared layout headers.
- **Custom Cursor:** A sophisticated custom cursor that changes state based on interactive elements, enhancing the "Workspace" feel.

---

## Local Development

1.  **Clone the Repo**

    ```bash
    git clone https://github.com/3z4z/xai.git
    cd xai
    ```

2.  **Install Dependencies**

    ```bash
    npm install
    ```

3.  **Run Development Server**

    ```bash
    npm run dev
    ```

4.  **Build for Production**
    ```bash
    npm run build
    ```

---
