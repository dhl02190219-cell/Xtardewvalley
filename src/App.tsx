/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import MapPage from './components/MapPage';

export default function App() {
  const [view, setView] = useState<'landing' | 'map'>('landing');

  return (
    <div className="min-h-screen flex items-center justify-center p-2 sm:p-8">
      {view === 'landing' ? (
        <LandingPage onEnter={() => setView('map')} />
      ) : (
        <MapPage onBack={() => setView('landing')} />
      )}
    </div>
  );
}
