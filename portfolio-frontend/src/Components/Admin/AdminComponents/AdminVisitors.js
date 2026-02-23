import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';

export default function AdminVisitors() {
  const [visitors, setVisitors] = useState(null);
  const [selectedVisitor, setSelectedVisitor] = useState(null);
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [emailLoading, setEmailLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('stats');
  const [excludedIPs, setExcludedIPs] = useState(null);
  const [newExcludedIP, setNewExcludedIP] = useState('');
  const [newExcludedReason, setNewExcludedReason] = useState('');

  const fetchVisitors = () => {
    axios.get(process.env.REACT_APP_BACKEND_API + 'Visitors.json')
      .then(res => {
        if (res.data) {
          const list = Object.entries(res.data).map(([id, data]) => ({ id, ...data }));
          list.sort((a, b) => new Date(b.time) - new Date(a.time));
          setVisitors(list);
        } else {
          setVisitors([]);
        }
      });
  };

  const fetchExcludedIPs = () => {
    axios.get(process.env.REACT_APP_BACKEND_API + 'ExcludedIPs.json')
      .then(res => {
        if (res.data) {
          const list = Object.entries(res.data).map(([id, data]) => ({ id, ...data }));
          list.sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));
          setExcludedIPs(list);
        } else {
          setExcludedIPs([]);
        }
      });
  };

  const fetchEmailSetting = () => {
    setEmailLoading(true);
    axios.get(process.env.REACT_APP_BACKEND_API + 'Settings/visitorEmail.json')
      .then(res => {
        setEmailEnabled(res.data !== false && res.data !== 'false');
        setEmailLoading(false);
      })
      .catch(() => { setEmailEnabled(true); setEmailLoading(false); });
  };

  const toggleEmail = () => {
    const newVal = !emailEnabled;
    setEmailEnabled(newVal);
    fetch(process.env.REACT_APP_BACKEND_API + 'Settings/visitorEmail.json', {
      method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(newVal),
    });
  };

  const addExclusion = (e) => {
    e?.preventDefault();
    const cleanIP = newExcludedIP.trim();
    if (!cleanIP) return;
    const data = { ip: cleanIP, reason: newExcludedReason.trim() || 'Manual Exclusion', date: new Date().toISOString() };
    const apiBase = process.env.REACT_APP_BACKEND_API ? String(process.env.REACT_APP_BACKEND_API).replace(/\/+$/, '') : '';
    axios.post(`${apiBase}/ExcludedIPs.json`, data).then(res => {
      setExcludedIPs(prev => [{ id: res.data.name, ...data }, ...(prev || [])]);
      setNewExcludedIP('');
      setNewExcludedReason('');
    });
  };

  const removeExclusion = (id) => {
    if (window.confirm('Remove this IP from exclusions? it will be tracked again.')) {
      const apiBase = process.env.REACT_APP_BACKEND_API ? String(process.env.REACT_APP_BACKEND_API).replace(/\/+$/, '') : '';
      axios.delete(`${apiBase}/ExcludedIPs/${id}.json`).then(() => {
        setExcludedIPs(prev => prev.filter(e => e.id !== id));
      });
    }
  };

  const excludeVisitorIP = (v) => {
    const cleanIP = String(v.ip || '').trim();
    if (!cleanIP) return;
    if (window.confirm(`Exclude IP: ${cleanIP}? Future visits won't be tracked.`)) {
      const data = { ip: cleanIP, reason: `${v.city || 'Unknown'}, ${v.browser || 'Unknown'} (from history)`, date: new Date().toISOString() };
      const apiBase = process.env.REACT_APP_BACKEND_API ? String(process.env.REACT_APP_BACKEND_API).replace(/\/+$/, '') : '';
      axios.post(`${apiBase}/ExcludedIPs.json`, data).then(res => {
        setExcludedIPs(prev => [{ id: res.data.name, ...data }, ...(prev || [])]);
        setActiveTab('exclusions');
      });
    }
  };

  useEffect(() => { fetchVisitors(); fetchEmailSetting(); fetchExcludedIPs(); }, []);

  const clearAll = () => {
    if (window.confirm('Delete all visitor records?')) {
      axios.delete(process.env.REACT_APP_BACKEND_API + 'Visitors.json').then(() => setVisitors([]));
    }
  };

  const deleteOne = (id) => {
    if (window.confirm('Delete this record?')) {
      axios.delete(process.env.REACT_APP_BACKEND_API + `Visitors/${id}.json`).then(() => {
        setVisitors(prev => prev.filter(v => v.id !== id));
        setSelectedVisitor(null);
      });
    }
  };

  // ─── Filtered visitors covering search & exclusions ───
  const filteredVisitors = useMemo(() => {
    if (!visitors) return [];
    
    // First, filter out any IP that exists in the exclusions list
    let activeVisitors = visitors;
    if (excludedIPs && excludedIPs.length > 0) {
      activeVisitors = visitors.filter(v => {
        if (!v.ip) return true;
        const vIp = String(v.ip).trim().toLowerCase();
        // Check if vIp matches any excluded IP
        return !excludedIPs.some(e => {
          if (!e.ip) return false;
          const eIp = String(e.ip).trim().toLowerCase();
          return vIp === eIp || vIp.includes(eIp) || eIp.includes(vIp);
        });
      });
    }

    if (!searchQuery.trim()) return activeVisitors;
    const q = searchQuery.toLowerCase();
    return activeVisitors.filter(v =>
      Object.values(v).some(val => val && String(val).toLowerCase().includes(q))
    );
  }, [visitors, searchQuery, excludedIPs]);

  // ─── Statistics calculations ───
  const stats = useMemo(() => {
    if (!filteredVisitors || filteredVisitors.length === 0) return null;

    const now = new Date();
    const today = now.toISOString().split('T')[0];

    // Unique IPs
    const ipCounts = {};
    filteredVisitors.forEach(v => { if (v.ip) ipCounts[v.ip] = (ipCounts[v.ip] || 0) + 1; });
    const uniqueIPs = Object.keys(ipCounts).length;
    const topIPs = Object.entries(ipCounts).sort((a, b) => b[1] - a[1]).slice(0, 8);

    // Today's visitors
    const todayCount = filteredVisitors.filter(v => v.time && v.time.startsWith(today)).length;

    // This week
    const weekAgo = new Date(now); weekAgo.setDate(weekAgo.getDate() - 7);
    const weekCount = filteredVisitors.filter(v => v.time && new Date(v.time) >= weekAgo).length;

    // Daily chart (last 14 days)
    const dailyCounts = {};
    for (let i = 13; i >= 0; i--) {
      const d = new Date(now); d.setDate(d.getDate() - i);
      dailyCounts[d.toISOString().split('T')[0]] = 0;
    }
    filteredVisitors.forEach(v => {
      if (v.time) {
        const day = v.time.split('T')[0];
        if (dailyCounts.hasOwnProperty(day)) dailyCounts[day]++;
      }
    });
    const dailyData = Object.entries(dailyCounts).map(([date, count]) => ({ date, count }));
    const maxDaily = Math.max(...dailyData.map(d => d.count), 1);

    // Countries
    const countryCounts = {};
    filteredVisitors.forEach(v => {
      const c = v.country || 'Unknown';
      countryCounts[c] = (countryCounts[c] || 0) + 1;
    });
    const topCountries = Object.entries(countryCounts).sort((a, b) => b[1] - a[1]).slice(0, 8);

    // Cities
    const cityCounts = {};
    filteredVisitors.forEach(v => {
      const c = v.city || 'Unknown';
      cityCounts[c] = (cityCounts[c] || 0) + 1;
    });
    const topCities = Object.entries(cityCounts).sort((a, b) => b[1] - a[1]).slice(0, 8);

    // Browsers
    const browserCounts = {};
    filteredVisitors.forEach(v => { const b = v.browser || 'Unknown'; browserCounts[b] = (browserCounts[b] || 0) + 1; });
    const topBrowsers = Object.entries(browserCounts).sort((a, b) => b[1] - a[1]);

    // OS
    const osCounts = {};
    filteredVisitors.forEach(v => { const o = v.os || 'Unknown'; osCounts[o] = (osCounts[o] || 0) + 1; });
    const topOS = Object.entries(osCounts).sort((a, b) => b[1] - a[1]);

    // Referrers
    const refCounts = {};
    filteredVisitors.forEach(v => { const r = v.referrer || 'Direct'; refCounts[r] = (refCounts[r] || 0) + 1; });
    const topReferrers = Object.entries(refCounts).sort((a, b) => b[1] - a[1]).slice(0, 5);

    // Peak hour
    const hourCounts = new Array(24).fill(0);
    filteredVisitors.forEach(v => {
      if (v.time) { hourCounts[new Date(v.time).getHours()]++; }
    });
    const peakHour = hourCounts.indexOf(Math.max(...hourCounts));

    // Screens
    const screenCounts = {};
    filteredVisitors.forEach(v => { if (v.screen) screenCounts[v.screen] = (screenCounts[v.screen] || 0) + 1; });
    const topScreens = Object.entries(screenCounts).sort((a, b) => b[1] - a[1]).slice(0, 5);

    // Top country name
    const topCountry = topCountries.length > 0 ? topCountries[0][0] : 'N/A';

    return {
      total: filteredVisitors.length, uniqueIPs, todayCount, weekCount,
      topIPs, dailyData, maxDaily, topCountries, topCities,
      topBrowsers, topOS, topReferrers, peakHour, topScreens, topCountry,
      hourCounts,
    };
  }, [filteredVisitors]);

  // ─── Chart colors ───
  const barColors = ['#00c6ff', '#0072ff', '#7c3aed', '#f472b6', '#fbbf24', '#34d399', '#f97316', '#ef4444'];
  const pieColors = ['#00c6ff', '#0072ff', '#7c3aed', '#f472b6', '#fbbf24', '#34d399', '#f97316', '#ef4444'];

  // ─── Detail groups for modal ───
  const detailGroups = [
    {
      title: '🌐 Network', fields: [
        { label: 'IP Address', key: 'ip' }, { label: 'IP Type', key: 'type' },
        { label: 'ISP', key: 'isp' }, { label: 'Organization', key: 'org' }, { label: 'ASN', key: 'asn' },
      ]
    },
    {
      title: '📍 Location', fields: [
        { label: 'Flag', key: 'flag_emoji' }, { label: 'City', key: 'city' },
        { label: 'Region', key: 'region' }, { label: 'Region Code', key: 'region_code' },
        { label: 'Country', key: 'country' }, { label: 'Country Code', key: 'country_code' },
        { label: 'Continent', key: 'continent' }, { label: 'Capital', key: 'capital' },
        { label: 'Postal Code', key: 'postal' }, { label: 'Calling Code', key: 'calling_code' },
        { label: 'Latitude', key: 'latitude' }, { label: 'Longitude', key: 'longitude' },
        { label: 'Timezone', key: 'timezone' }, { label: 'UTC Offset', key: 'utc_offset' },
      ]
    },
    {
      title: '🖥️ Device', fields: [
        { label: 'Browser', key: 'browser' }, { label: 'OS', key: 'os' },
        { label: 'Screen', key: 'screen' }, { label: 'Language', key: 'language' },
        { label: 'User Agent', key: 'user_agent' },
      ]
    },
    {
      title: '🔗 Visit', fields: [
        { label: 'Time', key: 'time', format: v => new Date(v).toLocaleString() },
        { label: 'Page', key: 'page' }, { label: 'Referrer', key: 'referrer' },
        { label: 'Geo Source', key: 'geo_source' },
      ]
    },
  ];

  // ─── CSS Bar Chart Component ───
  const BarChart = ({ data, maxVal, label }) => (
    <div>
      {data.map(([name, count], i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', marginBottom: '6px', gap: '8px' }}>
          <span style={{ minWidth: '100px', fontSize: '0.8rem', color: 'var(--text-secondary)', textAlign: 'right', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {name}
          </span>
          <div style={{ flex: 1, background: 'var(--bg-secondary)', borderRadius: '4px', height: '22px', overflow: 'hidden', position: 'relative' }}>
            <div style={{
              width: `${(count / maxVal) * 100}%`, height: '100%', borderRadius: '4px',
              background: `linear-gradient(90deg, ${barColors[i % barColors.length]}, ${barColors[(i + 1) % barColors.length]})`,
              transition: 'width 0.8s ease', minWidth: count > 0 ? '2px' : '0',
            }} />
          </div>
          <span style={{ minWidth: '30px', fontSize: '0.8rem', fontWeight: '700', color: barColors[i % barColors.length] }}>
            {count}
          </span>
        </div>
      ))}
    </div>
  );

  // ─── Donut segment component ───
  const DonutChart = ({ data, total }) => {
    let cumPct = 0;
    const segments = data.map(([name, count], i) => {
      const pct = (count / total) * 100;
      const start = cumPct;
      cumPct += pct;
      return { name, count, pct, start, color: pieColors[i % pieColors.length] };
    });
    const gradientStr = segments.map(s => `${s.color} ${s.start}% ${s.start + s.pct}%`).join(', ');

    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
        <div style={{
          width: '120px', height: '120px', borderRadius: '50%', flexShrink: 0,
          background: `conic-gradient(${gradientStr})`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <div style={{
            width: '70px', height: '70px', borderRadius: '50%', background: 'var(--bg-card)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.1rem', fontWeight: '700', color: 'var(--accent)',
          }}>{total}</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
          {segments.map((s, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem' }}>
              <div style={{ width: '10px', height: '10px', borderRadius: '2px', background: s.color, flexShrink: 0 }} />
              <span style={{ color: 'var(--text-secondary)' }}>{s.name}</span>
              <span style={{ fontWeight: '700', color: s.color }}>{s.count}</span>
              <span style={{ color: 'var(--text-secondary)', fontSize: '0.7rem' }}>({s.pct.toFixed(0)}%)</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div style={S.container}>
      <h2 className='text-center fw-bold mb-4' style={S.gradientText}>👁️ Visitor Analytics</h2>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '0', marginBottom: '1.5rem', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
        {[['stats', '📊 Statistics'], ['history', '📋 History'], ['exclusions', '🚫 Exclusions']].map(([key, label]) => (
          <button key={key} onClick={() => setActiveTab(key)} style={{
            flex: 1, padding: '0.7rem 1.5rem', border: 'none', cursor: 'pointer', fontWeight: '600', fontSize: '0.9rem',
            background: activeTab === key ? 'linear-gradient(135deg, #00c6ff, #0072ff)' : 'var(--bg-card)',
            color: activeTab === key ? '#fff' : 'var(--text-secondary)',
            transition: 'all 0.3s ease',
          }}>{label}</button>
        ))}
      </div>

      {visitors === null || excludedIPs === null ? (
        <div className='text-center py-5'>
          <div className='spinner-border' style={{ color: 'var(--accent)' }} role='status' />
          <p className='mt-3' style={{ color: 'var(--text-secondary)' }}>Loading analytics...</p>
        </div>
      ) : activeTab === 'stats' ? (
        /* ═══ STATISTICS TAB ═══ */
        visitors.length === 0 || !stats ? (
          <div className='text-center py-5'>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>No visitor records yet.</p>
          </div>
        ) : (
          <div style={{ width: '100%' }}>

            {/* Overview Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
              {[
                { label: 'Total Visits', value: stats.total, icon: '👁️', color: '#00c6ff' },
                { label: 'Unique IPs', value: stats.uniqueIPs, icon: '🔗', color: '#0072ff' },
                { label: 'Today', value: stats.todayCount, icon: '📅', color: '#34d399' },
                { label: 'This Week', value: stats.weekCount, icon: '📆', color: '#f472b6' },
                { label: 'Top Country', value: stats.topCountry, icon: '🌍', color: '#fbbf24', isText: true },
                { label: 'Peak Hour', value: `${stats.peakHour}:00`, icon: '⏰', color: '#7c3aed', isText: true },
              ].map((card, i) => (
                <div key={i} style={S.statCard}>
                  <div style={{ fontSize: '1.5rem' }}>{card.icon}</div>
                  <div style={{ fontSize: card.isText ? '1.1rem' : '1.6rem', fontWeight: '800', color: card.color }}>
                    {card.value}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: '600' }}>{card.label}</div>
                </div>
              ))}
            </div>

            {/* Daily Visitors Chart */}
            <div style={S.chartCard}>
              <h6 style={S.chartTitle}>📈 Daily Visitors (Last 14 Days)</h6>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px', height: '160px', padding: '0 4px' }}>
                {stats.dailyData.map((d, i) => (
                  <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-end' }}>
                    <span style={{ fontSize: '0.65rem', fontWeight: '700', color: '#00c6ff', marginBottom: '2px' }}>
                      {d.count > 0 ? d.count : ''}
                    </span>
                    <div style={{
                      width: '100%', maxWidth: '36px', borderRadius: '4px 4px 0 0',
                      height: `${Math.max((d.count / stats.maxDaily) * 130, d.count > 0 ? 4 : 0)}px`,
                      background: d.date === new Date().toISOString().split('T')[0]
                        ? 'linear-gradient(180deg, #34d399, #059669)'
                        : `linear-gradient(180deg, #00c6ff, #0072ff)`,
                      transition: 'height 0.8s ease',
                    }} />
                    <span style={{ fontSize: '0.55rem', color: 'var(--text-secondary)', marginTop: '4px', transform: 'rotate(-45deg)', transformOrigin: 'top left', whiteSpace: 'nowrap' }}>
                      {new Date(d.date).toLocaleDateString('en', { month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1rem' }}>
              {/* Top IPs */}
              <div style={S.chartCard}>
                <h6 style={S.chartTitle}>🔝 Most Frequent IPs</h6>
                <BarChart data={stats.topIPs} maxVal={stats.topIPs[0]?.[1] || 1} />
              </div>

              {/* Countries */}
              <div style={S.chartCard}>
                <h6 style={S.chartTitle}>🌍 Top Countries</h6>
                <BarChart data={stats.topCountries} maxVal={stats.topCountries[0]?.[1] || 1} />
              </div>

              {/* Cities */}
              <div style={S.chartCard}>
                <h6 style={S.chartTitle}>🏙️ Top Cities</h6>
                <BarChart data={stats.topCities} maxVal={stats.topCities[0]?.[1] || 1} />
              </div>

              {/* Browsers */}
              <div style={S.chartCard}>
                <h6 style={S.chartTitle}>🌐 Browsers</h6>
                <DonutChart data={stats.topBrowsers} total={stats.total} />
              </div>

              {/* OS */}
              <div style={S.chartCard}>
                <h6 style={S.chartTitle}>💻 Operating Systems</h6>
                <DonutChart data={stats.topOS} total={stats.total} />
              </div>

              {/* Referrers */}
              <div style={S.chartCard}>
                <h6 style={S.chartTitle}>🔗 Top Referrers</h6>
                <BarChart data={stats.topReferrers} maxVal={stats.topReferrers[0]?.[1] || 1} />
              </div>

              {/* Screens */}
              <div style={S.chartCard}>
                <h6 style={S.chartTitle}>📱 Screen Resolutions</h6>
                <BarChart data={stats.topScreens} maxVal={stats.topScreens[0]?.[1] || 1} />
              </div>

              {/* Hourly Heatmap */}
              <div style={S.chartCard}>
                <h6 style={S.chartTitle}>⏰ Visits by Hour</h6>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '3px' }}>
                  {stats.hourCounts.map((count, h) => {
                    const max = Math.max(...stats.hourCounts, 1);
                    const intensity = count / max;
                    return (
                      <div key={h} title={`${h}:00 — ${count} visits`} style={{
                        aspectRatio: '1', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '0.6rem', fontWeight: '600', cursor: 'default',
                        background: intensity > 0 ? `rgba(0, 198, 255, ${0.15 + intensity * 0.85})` : 'var(--bg-secondary)',
                        color: intensity > 0.5 ? '#fff' : 'var(--text-secondary)',
                      }}>
                        {h}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )
      ) : activeTab === 'history' ? (
        /* ═══ HISTORY TAB ═══ */
        <div style={{ width: '100%' }}>
          <div style={S.chartCard}>
            <div className='d-flex justify-content-between align-items-center mb-3 flex-wrap gap-3'>
              <div className='d-flex align-items-center gap-3'>
                <h5 className='mb-0'>📋 Visitor History</h5>
                <span style={S.badge}>{filteredVisitors.length} {searchQuery ? 'found' : 'total'}</span>
              </div>
              <div className='d-flex align-items-center gap-3 flex-wrap'>
                {/* Email Toggle */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', fontWeight: '600' }}>✉️ Alerts</span>
                  {emailLoading ? (
                    <div className='spinner-border spinner-border-sm' style={{ color: 'var(--accent)' }} />
                  ) : (
                    <div style={S.toggleTrack(emailEnabled)} onClick={toggleEmail}
                      title={emailEnabled ? 'ON — click to disable' : 'OFF — click to enable'}>
                      <div style={S.toggleThumb(emailEnabled)} />
                    </div>
                  )}
                  <span style={{ fontSize: '0.75rem', color: emailEnabled ? '#00c6ff' : 'var(--text-secondary)', fontWeight: '600' }}>
                    {emailEnabled ? 'ON' : 'OFF'}
                  </span>
                </div>
                {visitors.length > 0 && (
                  <button style={S.clearBtn} onClick={clearAll}>🗑️ Clear All</button>
                )}
              </div>
            </div>

            {/* Search Bar */}
            <div style={{ position: 'relative', marginBottom: '1rem' }}>
              <input
                type='text'
                placeholder='🔍 Search by IP, city, country, browser, OS...'
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                style={S.searchInput}
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} style={S.searchClear}>✕</button>
              )}
            </div>

            {/* Table */}
            {visitors.length === 0 ? (
              <div className='text-center py-4'>
                <p style={{ color: 'var(--text-secondary)' }}>No visitor records yet.</p>
              </div>
            ) : filteredVisitors.length === 0 ? (
              <div className='text-center py-4'>
                <p style={{ color: 'var(--text-secondary)' }}>No results for "{searchQuery}"</p>
              </div>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={S.table}>
                  <thead>
                    <tr>
                      {['#', 'IP', 'Location', 'Browser', 'OS', 'Time', 'Actions'].map(h => (
                        <th key={h} style={S.th}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredVisitors.map((v, i) => (
                      <tr key={v.id}
                        onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-secondary)'}
                        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                        <td style={S.td}>{i + 1}</td>
                        <td style={S.td}>{v.ip || '—'}</td>
                        <td style={S.td}>{[v.flag_emoji, v.city, v.country].filter(x => x && x !== 'Unknown').join(' ') || '—'}</td>
                        <td style={S.td}>{v.browser || '—'}</td>
                        <td style={S.td}>{v.os || '—'}</td>
                        <td style={S.td}>{v.time ? new Date(v.time).toLocaleString() : '—'}</td>
                        <td style={S.td}>
                          <button style={S.detailBtn} onClick={() => setSelectedVisitor(v)}>🔍</button>
                          <button style={{ ...S.detailBtn, background: 'linear-gradient(135deg, #f59e0b, #d97706)', marginLeft: '0.3rem' }} onClick={() => excludeVisitorIP(v)} title="Exclude from future tracking">🚫</button>
                          <button style={S.deleteBtn} onClick={() => deleteOne(v.id)}>🗑️</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* ═══ EXCLUSIONS TAB ═══ */
        <div style={{ width: '100%' }}>
          <div style={S.chartCard}>
            <div className='d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3'>
              <h5 className='mb-0'>🚫 Excluded IP Addresses</h5>
              <span style={S.badge}>{excludedIPs.length} Excluded</span>
            </div>

            <form onSubmit={addExclusion} className='mb-4' style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <input
                type='text'
                placeholder='IP Address (e.g. 192.168.1.1)'
                value={newExcludedIP}
                onChange={e => setNewExcludedIP(e.target.value)}
                style={{ ...S.searchInput, width: 'auto', flex: '1', minWidth: '200px' }}
                required
              />
              <input
                type='text'
                placeholder='Reason (optional)'
                value={newExcludedReason}
                onChange={e => setNewExcludedReason(e.target.value)}
                style={{ ...S.searchInput, width: 'auto', flex: '2', minWidth: '200px' }}
              />
              <button type='submit' style={{ ...S.detailBtn, padding: '0.65rem 1.5rem', fontSize: '0.9rem' }}>
                Add Exclusion
              </button>
            </form>

            {excludedIPs.length === 0 ? (
              <div className='text-center py-4'>
                <p style={{ color: 'var(--text-secondary)' }}>No IPs currently excluded.</p>
              </div>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={S.table}>
                  <thead>
                    <tr>
                      <th style={S.th}>IP Address</th>
                      <th style={S.th}>Reason</th>
                      <th style={S.th}>Date Added</th>
                      <th style={S.th}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {excludedIPs.map((e) => (
                      <tr key={e.id}
                        onMouseEnter={ev => ev.currentTarget.style.background = 'var(--bg-secondary)'}
                        onMouseLeave={ev => ev.currentTarget.style.background = 'transparent'}>
                        <td style={S.td}><strong>{e.ip}</strong></td>
                        <td style={S.td}>{e.reason || '—'}</td>
                        <td style={S.td}>{e.date ? new Date(e.date).toLocaleString() : '—'}</td>
                        <td style={S.td}>
                          <button style={S.deleteBtn} onClick={() => removeExclusion(e.id)}>Remove Excl.</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Details Modal */}
      {selectedVisitor && (
        <div style={S.overlay} onClick={() => setSelectedVisitor(null)}>
          <div style={S.modal} onClick={e => e.stopPropagation()}>
            <div className='d-flex justify-content-between align-items-center mb-2'>
              <h5 className='mb-0' style={{ color: 'var(--accent)' }}>📋 Visitor Details</h5>
              <button onClick={() => setSelectedVisitor(null)} style={S.closeBtn}>✕</button>
            </div>
            {detailGroups.map((group, gi) => {
              const hasData = group.fields.some(f => selectedVisitor[f.key]);
              if (!hasData) return null;
              return (
                <div key={gi}>
                  <div style={S.sectionTitle}>{group.title}</div>
                  {group.fields.map((field, fi) => {
                    const val = selectedVisitor[field.key];
                    if (!val && val !== 0) return null;
                    return (
                      <div key={fi} style={S.detailRow}>
                        <span style={S.detailLabel}>{field.label}</span>
                        <span style={S.detailValue}>{field.format ? field.format(val) : String(val)}</span>
                      </div>
                    );
                  })}
                </div>
              );
            })}
            <div className='d-flex justify-content-end mt-3 gap-2'>
              <button style={S.deleteBtn} onClick={() => deleteOne(selectedVisitor.id)}>🗑️ Delete</button>
              <button style={{ ...S.detailBtn, padding: '0.4rem 1.2rem' }} onClick={() => setSelectedVisitor(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Styles ───
const S = {
  container: {
    minHeight: '100vh', background: 'var(--bg-primary)', color: 'var(--text-primary)',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    padding: '2rem 0.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center',
    transition: 'all 0.4s ease',
  },
  gradientText: {
    background: 'linear-gradient(45deg, #00c6ff, #0072ff)',
    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
  },
  statCard: {
    background: 'var(--bg-card)', borderRadius: '14px', padding: '1.2rem',
    border: '1px solid var(--border-color)', boxShadow: 'var(--shadow)',
    textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px',
    transition: 'all 0.3s ease',
  },
  chartCard: {
    background: 'var(--bg-card)', borderRadius: '16px', padding: '1.2rem',
    border: '1px solid var(--border-color)', boxShadow: 'var(--shadow)',
    marginBottom: '1rem', transition: 'all 0.4s ease', overflowX: 'auto',
  },
  chartTitle: {
    color: 'var(--accent)', fontWeight: '700', marginBottom: '0.8rem', fontSize: '0.95rem',
  },
  badge: {
    background: 'linear-gradient(135deg, #00c6ff, #0072ff)', color: '#fff',
    padding: '0.3rem 0.9rem', borderRadius: '20px', fontSize: '0.85rem', fontWeight: '600',
  },
  searchInput: {
    width: '100%', padding: '0.65rem 1rem', paddingRight: '2.5rem',
    borderRadius: '12px', border: '1px solid var(--border-color)',
    background: 'var(--bg-secondary)', color: 'var(--text-primary)',
    fontSize: '0.9rem', outline: 'none', transition: 'border-color 0.3s ease',
  },
  searchClear: {
    position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)',
    background: 'transparent', border: 'none', color: 'var(--text-secondary)',
    fontSize: '1rem', cursor: 'pointer',
  },
  clearBtn: {
    background: 'linear-gradient(135deg, #ff4b4b, #ff0844)', border: 'none',
    padding: '0.4rem 1rem', borderRadius: '10px', color: '#fff',
    fontWeight: '600', fontSize: '0.8rem', cursor: 'pointer',
    boxShadow: '0 0 10px rgba(255, 8, 68, 0.3)', transition: 'all 0.3s ease',
  },
  detailBtn: {
    background: 'linear-gradient(135deg, #00c6ff, #0072ff)', border: 'none',
    padding: '0.3rem 0.7rem', borderRadius: '8px', color: '#fff',
    fontWeight: '600', fontSize: '0.78rem', cursor: 'pointer', transition: 'all 0.3s ease',
  },
  deleteBtn: {
    background: 'linear-gradient(135deg, #ff4b4b, #ff0844)', border: 'none',
    padding: '0.3rem 0.7rem', borderRadius: '8px', color: '#fff',
    fontWeight: '600', fontSize: '0.78rem', cursor: 'pointer', marginLeft: '0.3rem',
    transition: 'all 0.3s ease',
  },
  toggleTrack: (on) => ({
    width: '44px', height: '24px', borderRadius: '12px', cursor: 'pointer', position: 'relative',
    background: on ? 'linear-gradient(135deg, #00c6ff, #0072ff)' : 'var(--bg-secondary)',
    border: '1px solid var(--border-color)', transition: 'all 0.3s ease', flexShrink: 0,
  }),
  toggleThumb: (on) => ({
    width: '18px', height: '18px', borderRadius: '50%', background: '#fff',
    position: 'absolute', top: '2px', left: on ? '23px' : '3px',
    transition: 'left 0.3s ease', boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
  }),
  table: { width: '100%', borderCollapse: 'separate', borderSpacing: '0' },
  th: {
    background: 'var(--bg-secondary)', color: 'var(--accent)', padding: '0.65rem 0.6rem',
    textAlign: 'left', fontWeight: '600', fontSize: '0.78rem', textTransform: 'uppercase',
    letterSpacing: '0.5px', borderBottom: '2px solid var(--border-color)', whiteSpace: 'nowrap',
  },
  td: {
    padding: '0.55rem 0.6rem', borderBottom: '1px solid var(--border-color)',
    fontSize: '0.82rem', color: 'var(--text-secondary)', whiteSpace: 'nowrap',
  },
  overlay: {
    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
    background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)',
    display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 9999, padding: '1rem',
  },
  modal: {
    background: 'var(--bg-card)', border: '1px solid var(--border-color)',
    borderRadius: '16px', boxShadow: '0 0 40px rgba(0,0,0,0.3)',
    maxWidth: '600px', width: '100%', maxHeight: '85vh', overflowY: 'auto', padding: '1.5rem',
  },
  closeBtn: {
    background: 'transparent', border: 'none', color: 'var(--text-secondary)',
    fontSize: '1.5rem', cursor: 'pointer', lineHeight: 1,
  },
  sectionTitle: {
    color: 'var(--accent)', fontSize: '0.9rem', fontWeight: '700',
    marginTop: '0.8rem', marginBottom: '0.4rem', paddingBottom: '0.3rem',
    borderBottom: '1px solid var(--border-color)',
  },
  detailRow: {
    display: 'flex', justifyContent: 'space-between', padding: '0.3rem 0',
    fontSize: '0.82rem', borderBottom: '1px dashed var(--border-color)',
  },
  detailLabel: { color: 'var(--text-secondary)', fontWeight: '600', minWidth: '110px' },
  detailValue: { color: 'var(--text-primary)', textAlign: 'right', wordBreak: 'break-all', maxWidth: '60%' },
};
