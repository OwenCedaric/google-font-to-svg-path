import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Output from './Output';
import { loadGoogleFonts, renderSvg } from '../lib/fontUtils';
import { defaultState } from '../store/appStore';
import { getI18n, type Lang } from '../i18n/translations';

interface AppProps {
  lang?: Lang;
}

export default function App({ lang = 'en' }: AppProps) {
  const t = getI18n(lang).ui;
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
        <Output state={state} lang={lang} />
      </main>

      <div className={`drawer ${isDrawerOpen ? 'open' : ''}`}>
        <Sidebar state={state} setState={setState} lang={lang} />
      </div>

      <button 
        className={`menu-toggle ${isDrawerOpen ? 'drawer-open' : ''}`} 
        onClick={toggleDrawer}
        aria-label={isDrawerOpen ? t.closeSettings : t.openSettings}
      >
        <i className={isDrawerOpen ? "ri-arrow-right-s-line" : "ri-arrow-left-s-line"} style={{ fontSize: '22px' }} />
      </button>
    </div>
  );
}
