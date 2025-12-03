---
sidebar_position: 3
---

# LaTeX Math Formulas

Docusaurus supports LaTeX math equations using KaTeX. You can write both inline and block-level mathematical expressions.

## Inline Equations

Use single dollar signs `$...$` for inline math:

- Einstein's mass-energy equivalence: $E = mc^2$
- Pythagorean theorem: $a^2 + b^2 = c^2$
- Quadratic formula: $x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$

## Block Equations

Use double dollar signs `$$...$$` for centered block equations:

$$
\int_0^\infty e^{-x^2} dx = \frac{\sqrt{\pi}}{2}
$$

### Summations and Products

$$
\sum_{n=1}^{\infty} \frac{1}{n^2} = \frac{\pi^2}{6}
$$

$$
\prod_{i=1}^{n} x_i = x_1 \cdot x_2 \cdot \ldots \cdot x_n
$$

### Limits and Derivatives

$$
\lim_{x \to \infty} \frac{1}{x} = 0
$$

$$
\frac{d}{dx} \sin(x) = \cos(x)
$$

## Matrices

$$
A = \begin{bmatrix}
a_{11} & a_{12} & a_{13} \\
a_{21} & a_{22} & a_{23} \\
a_{31} & a_{32} & a_{33}
\end{bmatrix}
$$

## Systems of Equations

$$
\begin{cases}
x + y = 5 \\
2x - y = 1
\end{cases}
$$

## Greek Letters and Symbols

Common symbols: $\alpha$, $\beta$, $\gamma$, $\Delta$, $\theta$, $\lambda$, $\pi$, $\sigma$, $\Omega$

Set notation: $\in$, $\notin$, $\subset$, $\subseteq$, $\cup$, $\cap$, $\emptyset$

Logic: $\forall$, $\exists$, $\neg$, $\land$, $\lor$, $\implies$, $\iff$

## Advanced Examples

### Taylor Series

$$
e^x = \sum_{n=0}^{\infty} \frac{x^n}{n!} = 1 + x + \frac{x^2}{2!} + \frac{x^3}{3!} + \cdots
$$

### Fourier Transform

$$
\mathcal{F}(f)(w) = \int_{-\infty}^{\infty} f(x) e^{-iwx} dx
$$

### Probability

$$
P(A \mid B) = \frac{P(B \mid A) \cdot P(A)}{P(B)}
$$
