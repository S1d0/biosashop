'use client'

import { onCLS, onFCP, onINP, onLCP, onTTFB } from 'web-vitals'

function sendToAnalytics(metric: any) {
  // You can integrate this with your analytics service
  // For now, we'll just log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log('[Web Vitals]', metric)
  }
  
  // Example: Send to Google Analytics
  // gtag('event', metric.name, {
  //   custom_parameter_1: metric.value,
  //   custom_parameter_2: metric.id,
  //   custom_parameter_3: metric.name,
  // })
  
  // Example: Send to your own analytics endpoint
  // fetch('/api/analytics/web-vitals', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(metric),
  // })
}

export function reportWebVitals() {
  try {
    onCLS(sendToAnalytics)
    onINP(sendToAnalytics) // INP replaces FID
    onFCP(sendToAnalytics)
    onLCP(sendToAnalytics)
    onTTFB(sendToAnalytics)
  } catch (err) {
    console.error('Error reporting web vitals:', err)
  }
}
