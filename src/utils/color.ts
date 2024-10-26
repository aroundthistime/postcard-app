export function hexToHSL(hex: string): { h: number; s: number; l: number } {
  // Remove the hash at the start if it's there
  hex = hex.replace(/^#/, "");

  // Parse r, g, b values
  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;

  // Find the maximum and minimum values to calculate lightness
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h: number,
    s: number,
    l = (max + min) / 2;

  if (max === min) {
    // Achromatic
    h = s = 0; // achromatic
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - (max + min)) : d / (max + min);

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
      default:
        h = 0; // Fallback
    }
    h /= 6;
  }

  // Convert to percentage for saturation and lightness
  s = s * 100;
  l = l * 100;

  // Return the HSL values as an object
  return {
    h: Math.round(h * 360), // Hue in degrees
    s: Math.round(s), // Saturation in percentage
    l: Math.round(l), // Lightness in percentage
  };
}
