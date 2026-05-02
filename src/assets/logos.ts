export const lightWrittenLogoUrl = new URL('./logos/light-reverie-written-logo.png', import.meta.url).href;
export const lightIconLogoUrl    = new URL('./logos/light-reverie-logo.png',         import.meta.url).href;
export const darkWrittenLogoUrl  = new URL('./logos/dark-reverie-written-logo.png',  import.meta.url).href;
export const darkIconLogoUrl     = new URL('./logos/dark-reverie-logo.png',          import.meta.url).href;

export function getLogoByTheme(isDark: boolean, type: 'written' | 'icon'): string {
  if (type === 'written') return isDark ? darkWrittenLogoUrl : lightWrittenLogoUrl;
  return isDark ? darkIconLogoUrl : lightIconLogoUrl;
}

// Legacy aliases — kept to avoid breaking residual imports
export const writtenLogoUrl = lightWrittenLogoUrl;
export const iconLogoUrl    = lightIconLogoUrl;
