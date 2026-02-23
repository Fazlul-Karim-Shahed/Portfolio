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
      const version = "2.1"; // Internal version for debugging cache
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

      // --- IP EXCLUSION LOGIC START ---
      let isExcluded = false;
      const visitorIpStr = String(visitData.ip || '').trim().toLowerCase();

      // Fail-Close: If we can't get an IP, we don't track (could be the admin behind a VPN/AdBlock)
      if (!visitorIpStr || visitorIpStr === 'unknown') {
        console.log(`[Tracker v${version}] No valid IP detected. Aborting to be safe.`);
        return;
      }

      try {
        // Absolute Cache Bypass: Use timestamp and cache: 'no-store'
        const timestamp = new Date().getTime();
        const apiURL = FIREBASE_API.endsWith('/') 
          ? `${FIREBASE_API}ExcludedIPs.json?t=${timestamp}` 
          : `${FIREBASE_API}/ExcludedIPs.json?t=${timestamp}`;

        const exclRes = await fetch(apiURL, { cache: 'no-store' });
        if (!exclRes.ok) throw new Error("Firebase fetch failed");

        const excludedData = await exclRes.json();
        if (excludedData) {
          const excludedItems = Object.values(excludedData);
          
          isExcluded = excludedItems.some(item => {
            if (!item || !item.ip) return false;
            const targetIp = String(item.ip).trim().toLowerCase();
            // Bi-directional match to handle IPv4-mapped IPv6 (::ffff:x.x.x.x)
            return visitorIpStr === targetIp || 
                   visitorIpStr.includes(targetIp) || 
                   targetIp.includes(visitorIpStr);
          });
        }

        if (isExcluded) {
          console.log(`[Tracker v${version}] Visitor IP ${visitorIpStr} is EXCLUDED. Aborting.`);
          return;
        }
      } catch (e) {
        // Fail-Close: If we can't verify exclusions, we stop.
        console.log(`[Tracker v${version}] Could not verify exclusion list. Aborting safely.`);
        return;
      }
      // --- IP EXCLUSION LOGIC END ---

      // Session Lock for Database Write
      if (sessionStorage.getItem('visitor_confirmed_saved') === 'true') {
        console.log(`[Tracker v${version}] Already saved this session.`);
        return;
      }
      sessionStorage.setItem('visitor_confirmed_saved', 'true');

      // Save to Firebase
      try {
        const visitorsURL = FIREBASE_API.endsWith('/') ? `${FIREBASE_API}Visitors.json` : `${FIREBASE_API}/Visitors.json`
        await axios.post(visitorsURL, visitData)
        console.log(`[Tracker v${version}] Visit logged.`);
      } catch (e) {
        // Firebase save failed
      }

      // REDUNDANT GUARD: Check if visitor email is enabled
      try {
        const settingsURL = FIREBASE_API.endsWith('/') ? `${FIREBASE_API}Settings/visitorEmail.json` : `${FIREBASE_API}/Settings/visitorEmail.json`
        const settingsRes = await axios.get(settingsURL)
        if (settingsRes.data === false || settingsRes.data === 'false') {
          console.log(`[Tracker v${version}] Email alerts are disabled in settings.`);
          return;
        }
      } catch (e) {
        // Settings fetch failed — proceed with default (send email)
      }

      // Re-verify exclusion one last time just in case of any weirdness
      if (isExcluded) return;

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
        console.log(`[Tracker v${version}] Email alert sent.`);
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
