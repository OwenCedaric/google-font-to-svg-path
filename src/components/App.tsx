import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Output from './Output';
import { loadGoogleFonts, renderSvg } from '../lib/fontUtils';
import { defaultState, type AppState } from '../store/appStore';
import { getI18n, type Lang } from '../i18n/translations';

interface AppProps {
  lang?: Lang;
  initialFont?: string;
  initialText?: string;
  initialUnion?: boolean;
  initialSize?: number;
  initialDxfUnits?: string;
  initialFilled?: boolean;
}

export default function App({
  lang = 'en',
  initialFont,
  initialText,
  initialUnion,
  initialSize,
  initialDxfUnits,
  initialFilled,
}: AppProps) {
  const t = getI18n(lang).ui;
  const [state, setState] = useState<AppState>(() => {
    const s = { ...defaultState };
    if (initialFont) s.fontFamily = initialFont;
    if (initialText !== undefined) s.text = initialText;
    if (initialUnion !== undefined) s.union = initialUnion;
    if (initialSize !== undefined) s.size = initialSize;
    if (initialDxfUnits !== undefined) s.dxfUnits = initialDxfUnits;
    if (initialFilled !== undefined) s.filled = initialFilled;
    return s;
  });

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Initialize from URL search parameters if available in browser
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const updates: Partial<AppState> = {};

    const qFont = params.get('font') || params.get('fontFamily');
    if (qFont) updates.fontFamily = qFont;

    const qVariant = params.get('variant') || params.get('fontVariant');
    if (qVariant) updates.fontVariant = qVariant;

    const qText = params.get('text');
    if (qText !== null) updates.text = qText;

    const qUnion = params.get('union');
    if (qUnion !== null) updates.union = qUnion === 'true' || qUnion === '1';

    const qSize = params.get('size');
    if (qSize && !isNaN(Number(qSize))) updates.size = Number(qSize);

    const qFilled = params.get('filled');
    if (qFilled !== null) updates.filled = qFilled === 'true' || qFilled === '1';

    const qUnits = params.get('dxfUnits') || params.get('units');
    if (qUnits) updates.dxfUnits = qUnits;

    const qFill = params.get('fill');
    if (qFill) updates.fill = qFill;

    const qStroke = params.get('stroke');
    if (qStroke) updates.stroke = qStroke;

    if (Object.keys(updates).length > 0) {
      setState(prev => ({ ...prev, ...updates }));
    }
  }, []);

  useEffect(() => {
    loadGoogleFonts().then(data => {
      setState(prev => ({ ...prev, fontList: data }));
    }).catch(err => {
      console.warn('Failed to load Google Fonts catalog:', err);
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
