import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Output from './Output';
import { loadGoogleFonts, renderSvg } from '../lib/fontUtils';
import { defaultState } from '../store/appStore';
import { ChevronRight, ChevronLeft } from 'lucide-react';

export default function App() {
  const [state, setState] = useState(defaultState);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    loadGoogleFonts().then(data => {
      setState(prev => ({ ...prev, fontList: data }));
    });
  }, []);

  useEffect(() => {
    if (state.fontList && state.fontFamily && state.fontVariant) {
      renderSvg(state).then(result => {
        setState(prev => ({ ...prev, ...result }));
      });
    }
  }, [
    state.fontList,
    state.fontFamily,
    state.fontVariant,
    state.customFont,
    state.text,
    state.size,
    state.lineHeight,
    state.union,
    state.filled,
    state.kerning,
    state.separate,
    state.bezierAccuracy,
    state.dxfUnits,
    state.fill,
    state.stroke,
    state.strokeWidth,
    state.strokeNonScaling,
    state.fillRule,
  ]);

  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);
  const closeDrawer = () => setIsDrawerOpen(false);

  return (
    <div className="app-container">
      <div 
        className={`drawer-overlay ${isDrawerOpen ? 'active' : ''}`} 
        onClick={closeDrawer}
      />

      <main className="main-content">
        <Output state={state} />
      </main>

      <div className={`drawer ${isDrawerOpen ? 'open' : ''}`}>
        <Sidebar state={state} setState={setState} />
      </div>

      <button 
        className={`menu-toggle ${isDrawerOpen ? 'drawer-open' : ''}`} 
        onClick={toggleDrawer}
        aria-label={isDrawerOpen ? "Close settings" : "Open settings"}
      >
        {isDrawerOpen ? <ChevronRight size={24} /> : <ChevronLeft size={24} />}
      </button>
    </div>
  );
}
