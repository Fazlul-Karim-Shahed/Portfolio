import { useEffect } from 'react'
import axios from 'axios'

const EMAILJS_SERVICE_ID = 'service_yfd5eq5'
const EMAILJS_TEMPLATE_ID = 'template_n94c28v'
const EMAILJS_PUBLIC_KEY = 'bzWngWpH_-HlzsJvf'
const FIREBASE_API = process.env.REACT_APP_BACKEND_API

// Multiple fallback geolocation APIs (all free, HTTPS, no key required)
const GEO_APIS = [
  {
    url: 'https://ipwho.is/',
    parse: (data) => data.success ? {
      ip: data.ip, type: data.type,
      city: data.city, region: data.region, region_code: data.region_code,
      country: data.country, country_code: data.country_code,
      continent: data.continent, continent_code: data.continent_code,
      latitude: data.latitude, longitude: data.longitude,
      postal: data.postal, calling_code: data.calling_code,
      capital: data.capital, borders: data.borders,
      flag_emoji: data.flag?.emoji,
      isp: data.connection?.isp, org: data.connection?.org, asn: data.connection?.asn,
      timezone: data.timezone?.id, utc_offset: data.timezone?.utc,
    } : null,
  },
  {
    url: 'https://ipapi.co/json/',
    parse: (data) => !data.error ? {
      ip: data.ip, type: data.version,
      city: data.city, region: data.region, region_code: data.region_code,
      country: data.country_name, country_code: data.country_code,
      continent_code: data.continent_code,
      latitude: data.latitude, longitude: data.longitude,
      postal: data.postal, timezone: data.timezone, utc_offset: data.utc_offset,
      isp: data.org, asn: data.asn,
    } : null,
  },
  {
    url: 'https://ipinfo.io/json',
    parse: (data) => {
      const [lat, lng] = (data.loc || ',').split(',')
      return {
        ip: data.ip, city: data.city, region: data.region,
        country: data.country, postal: data.postal,
        latitude: lat, longitude: lng,
        timezone: data.timezone, isp: data.org,
      }
    },
  },
]

export default function useVisitorTracker() {
  useEffect(() => {
    if (sessionStorage.getItem('visitor_tracked')) return
    sessionStorage.setItem('visitor_tracked', 'true')

    const trackVisitor = async () => {
      const visitData = {
        browser: getBrowser(),
        os: getOS(),
        time: new Date().toISOString(),
        user_agent: navigator.userAgent,
        screen: `${window.screen.width}x${window.screen.height}`,
        language: navigator.language || 'Unknown',
        referrer: document.referrer || 'Direct',
        page: window.location.pathname,
      }

      // Try each geo API until one works
      let geoSource = 'none'
      for (const api of GEO_APIS) {
        try {
          const controller = new AbortController()
          const timeoutId = setTimeout(() => controller.abort(), 5000)
          const res = await fetch(api.url, { signal: controller.signal })
          clearTimeout(timeoutId)

          if (res.ok) {
            const data = await res.json()
            const parsed = api.parse(data)
            if (parsed && parsed.ip) {
              Object.entries(parsed).forEach(([k, v]) => {
                if (v !== undefined && v !== null && v !== '') {
                  visitData[k] = String(v)
                }
              })
              geoSource = api.url
              break
            }
          }
        } catch (e) {
          // This API failed, try next
        }
      }
      visitData.geo_source = geoSource

      // Save to Firebase
      let saved = false
      try {
        await axios.post(FIREBASE_API + 'Visitors.json', visitData)
        saved = true
      } catch (e) {
        // Firebase save failed
      }

      // Check if visitor email is enabled
      try {
        const settingsRes = await axios.get(FIREBASE_API + 'Settings/visitorEmail.json')
        if (settingsRes.data === false || settingsRes.data === 'false') return
      } catch (e) {
        // Settings fetch failed — send email by default
      }

      // Send email notification
      try {
        const formData = new FormData()
        formData.append('service_id', EMAILJS_SERVICE_ID)
        formData.append('template_id', EMAILJS_TEMPLATE_ID)
        formData.append('user_id', EMAILJS_PUBLIC_KEY)
        formData.append('ip', visitData.ip || 'Unknown')
        formData.append('city', visitData.city || 'Unknown')
        formData.append('region', visitData.region || 'Unknown')
        formData.append('country', visitData.country || 'Unknown')
        formData.append('browser', visitData.browser || 'Unknown')
        formData.append('os', visitData.os || 'Unknown')
        formData.append('time', new Date().toLocaleString())
        formData.append('user_agent', visitData.user_agent || 'Unknown')

        await fetch('https://api.emailjs.com/api/v1.0/email/send-form', {
          method: 'POST',
          body: formData,
        })
      } catch (e) {
        // Email notification failed
      }
    }

    trackVisitor()
  }, [])
}

function getBrowser() {
  const ua = navigator.userAgent
  if (ua.includes('Firefox')) return 'Firefox'
  if (ua.includes('SamsungBrowser')) return 'Samsung Browser'
  if (ua.includes('Opera') || ua.includes('OPR')) return 'Opera'
  if (ua.includes('Edg')) return 'Edge'
  if (ua.includes('Chrome')) return 'Chrome'
  if (ua.includes('Safari')) return 'Safari'
  return 'Unknown'
}

function getOS() {
  const ua = navigator.userAgent
  if (ua.includes('Windows')) return 'Windows'
  if (ua.includes('Mac OS')) return 'macOS'
  if (ua.includes('Linux')) return 'Linux'
  if (ua.includes('Android')) return 'Android'
  if (ua.includes('iPhone') || ua.includes('iPad')) return 'iOS'
  return 'Unknown'
}
