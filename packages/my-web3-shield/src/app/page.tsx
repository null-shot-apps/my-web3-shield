'use client';

import { useState } from 'react';
import { Shield, Search, AlertTriangle, CheckCircle, XCircle, TrendingUp, Users, Database } from 'lucide-react';

export default function Home() {
  const [url, setUrl] = useState('');
  const [address, setAddress] = useState('');
  const [urlResult, setUrlResult] = useState<any>(null);
  const [addressResult, setAddressResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const checkUrl = async () => {
    if (!url) return;
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      const isScam = url.toLowerCase().includes('scam') || url.toLowerCase().includes('phish');
      setUrlResult({
        url,
        status: isScam ? 'danger' : 'safe',
        risk: isScam ? 'high' : 'low',
        reports: isScam ? 47 : 0,
        message: isScam ? 'This site has been reported as a scam' : 'No threats detected'
      });
      setLoading(false);
    }, 800);
  };

  const checkAddress = async () => {
    if (!address) return;
    setLoading(true);
    setTimeout(() => {
      const isScam = address.toLowerCase().includes('bad') || address.length < 20;
      setAddressResult({
        address,
        status: isScam ? 'danger' : 'safe',
        risk: isScam ? 'high' : 'low',
        reports: isScam ? 23 : 0,
        message: isScam ? 'This address has been flagged as suspicious' : 'Address appears safe'
      });
      setLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield className="w-8 h-8 text-purple-400" />
              <h1 className="text-2xl font-bold text-white">Web3 Shield</h1>
            </div>
            <nav className="flex gap-6">
              <a href="#check" className="text-white/80 hover:text-white transition">Check</a>
              <a href="#report" className="text-white/80 hover:text-white transition">Report</a>
              <a href="#stats" className="text-white/80 hover:text-white transition">Stats</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 text-sm mb-6">
          <Shield className="w-4 h-4" />
          <span>Real-time Web3 Scam Protection</span>
        </div>
        <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
          Protect Yourself from<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
            Crypto Scams
          </span>
        </h2>
        <p className="text-xl text-white/70 max-w-2xl mx-auto mb-12">
          Check websites and wallet addresses against our real-time scam database. Stay safe in Web3.
        </p>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-16">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
            <Database className="w-8 h-8 text-purple-400 mx-auto mb-3" />
            <div className="text-3xl font-bold text-white mb-1">12,847</div>
            <div className="text-white/60">Known Scams</div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
            <Users className="w-8 h-8 text-blue-400 mx-auto mb-3" />
            <div className="text-3xl font-bold text-white mb-1">45,293</div>
            <div className="text-white/60">Protected Users</div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
            <TrendingUp className="w-8 h-8 text-green-400 mx-auto mb-3" />
            <div className="text-3xl font-bold text-white mb-1">$8.2M</div>
            <div className="text-white/60">Losses Prevented</div>
          </div>
        </div>
      </section>

      {/* Check Section */}
      <section id="check" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid md:grid-cols-2 gap-6">
          {/* URL Checker */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <Search className="w-6 h-6 text-purple-400" />
              <h3 className="text-2xl font-bold text-white">Check Website</h3>
            </div>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Enter URL (e.g., https://example.com)"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && checkUrl()}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-purple-500 transition"
              />
              <button
                onClick={checkUrl}
                disabled={loading || !url}
                className="w-full px-6 py-3 bg-purple-600 hover:bg-purple-700 disabled:bg-white/10 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition"
              >
                {loading ? 'Checking...' : 'Check URL'}
              </button>

              {urlResult && (
                <div className={`mt-6 p-4 rounded-lg border ${
                  urlResult.status === 'danger' 
                    ? 'bg-red-500/10 border-red-500/30' 
                    : 'bg-green-500/10 border-green-500/30'
                }`}>
                  <div className="flex items-start gap-3">
                    {urlResult.status === 'danger' ? (
                      <XCircle className="w-6 h-6 text-red-400 flex-shrink-0 mt-0.5" />
                    ) : (
                      <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" />
                    )}
                    <div className="flex-1">
                      <div className="font-semibold text-white mb-1">{urlResult.message}</div>
                      <div className="text-sm text-white/70">
                        Risk Level: <span className="font-medium">{urlResult.risk.toUpperCase()}</span>
                      </div>
                      {urlResult.reports > 0 && (
                        <div className="text-sm text-white/70">
                          Community Reports: <span className="font-medium">{urlResult.reports}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Address Checker */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="w-6 h-6 text-blue-400" />
              <h3 className="text-2xl font-bold text-white">Check Address</h3>
            </div>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Enter wallet address (0x...)"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && checkAddress()}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-blue-500 transition font-mono text-sm"
              />
              <button
                onClick={checkAddress}
                disabled={loading || !address}
                className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-white/10 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition"
              >
                {loading ? 'Checking...' : 'Check Address'}
              </button>

              {addressResult && (
                <div className={`mt-6 p-4 rounded-lg border ${
                  addressResult.status === 'danger' 
                    ? 'bg-red-500/10 border-red-500/30' 
                    : 'bg-green-500/10 border-green-500/30'
                }`}>
                  <div className="flex items-start gap-3">
                    {addressResult.status === 'danger' ? (
                      <XCircle className="w-6 h-6 text-red-400 flex-shrink-0 mt-0.5" />
                    ) : (
                      <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" />
                    )}
                    <div className="flex-1">
                      <div className="font-semibold text-white mb-1">{addressResult.message}</div>
                      <div className="text-sm text-white/70">
                        Risk Level: <span className="font-medium">{addressResult.risk.toUpperCase()}</span>
                      </div>
                      {addressResult.reports > 0 && (
                        <div className="text-sm text-white/70">
                          Community Reports: <span className="font-medium">{addressResult.reports}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Report Section */}
      <section id="report" className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <AlertTriangle className="w-6 h-6 text-yellow-400" />
            <h3 className="text-2xl font-bold text-white">Report a Scam</h3>
          </div>
          <p className="text-white/70 mb-6">
            Help protect the community by reporting suspicious websites or wallet addresses.
          </p>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="URL or wallet address"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-yellow-500 transition"
            />
            <textarea
              placeholder="Describe the scam (optional)"
              rows={4}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-yellow-500 transition resize-none"
            />
            <button className="w-full px-6 py-3 bg-yellow-600 hover:bg-yellow-700 text-white font-semibold rounded-lg transition">
              Submit Report
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-white/60 text-sm">
            <p className="mb-2">Web3 Shield - Protecting the crypto community</p>
            <p>Always verify transactions and never share your private keys</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

