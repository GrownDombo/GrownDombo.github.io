import { defineConfig, loadEnv, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';

function googleAnalyticsHtmlPlugin(measurementId: string | undefined): Plugin {
  return {
    name: 'google-analytics-html',
    transformIndexHtml(html) {
      if (!measurementId) {
        return html;
      }

      const encodedMeasurementId = encodeURIComponent(measurementId);
      const serializedMeasurementId = JSON.stringify(measurementId);
      const snippet = `    <script async src="https://www.googletagmanager.com/gtag/js?id=${encodedMeasurementId}"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      window.gtag = gtag;
      gtag('js', new Date());
      gtag('config', ${serializedMeasurementId});
    </script>`;

      return html.replace('  </head>', `${snippet}\n  </head>`);
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', 'VITE_');
  const measurementId = env.VITE_GA_MEASUREMENT_ID?.trim();

  return {
    plugins: [react(), googleAnalyticsHtmlPlugin(measurementId)],
  };
});
