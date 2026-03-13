import React, { useMemo } from 'react';
// @ts-ignore
import makerjs from 'makerjs';
import * as opentype from 'opentype.js';
import { ExternalLink, Upload } from 'lucide-react';

interface SidebarProps {
  state: any;
  setState: (updater: (prev: any) => any) => void;
}

export default function Sidebar({ state, setState }: SidebarProps) {
  const {
    fontList,
    customFont,
    fontFamily,
    fontVariant,
    text,
    size,
    lineHeight,
    union,
    kerning,
    filled,
    separate,
    bezierAccuracy,
    dxfUnits,
    fill,
    stroke,
    strokeWidth,
    strokeNonScaling,
    fillRule,
  } = state;

  const fontVariants = fontList && fontFamily
    ? fontList.items.find((f: any) => f.family === fontFamily)?.variants || []
    : [];

  const fontOptions = useMemo(() => {
    if (!fontList) return <option>Loading fonts...</option>;
    return fontList.items.map((font: any) => (
      <option key={font.family} value={font.family}>
        {font.family}
      </option>
    ));
  }, [fontList]);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) {
      setState(prev => ({ ...prev, customFont: undefined }));
    } else {
      const buffer = await files[0].arrayBuffer();
      const font = opentype.parse(buffer);
      setState(prev => ({ ...prev, customFont: font }));
    }
  };

  const handleRemoveFont = () => {
    const fileInput = document.getElementById('font-upload') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
    setState(prev => ({ ...prev, customFont: undefined }));
  };

  return (
    <div className="sidebar-content">
      <h2 id="settings-title">Settings</h2>
      
      <details open>
        <summary>Font</summary>
        <div>
          <div className="label-with-link">
            <label>Google font</label>
            <a
              href="https://fonts.google.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="link-btn"
            >
              Browse <ExternalLink size={12} />
            </a>
          </div>
          <select
            id="font-select"
            value={fontFamily}
            onChange={(e) => setState(prev => ({ ...prev, fontFamily: e.target.value }))}
            disabled={!!customFont}
          >
            {fontOptions}
          </select>

          <label>Variant</label>
          <select
            id="font-variant"
            value={fontVariant}
            onChange={(e) => setState(prev => ({ ...prev, fontVariant: e.target.value }))}
            disabled={!!customFont}
          >
            {fontVariants.map((variant: string) => (
              <option key={variant} value={variant}>
                {variant}
              </option>
            ))}
          </select>

          <label>Upload custom font</label>
          <div className="file-input-wrapper">
            <div className="file-input-custom">
              <Upload size={14} style={{ marginRight: '8px' }} />
              {customFont ? 'Custom font loaded' : 'Choose .ttf / .otf file'}
            </div>
            <input
              id="font-upload"
              type="file"
              onChange={handleFileUpload}
              accept=".ttf,.otf,.woff,.woff2"
            />
          </div>
          
          {customFont && (
            <div style={{ marginTop: '0.75rem', display: 'flex', justifyContent: 'flex-end' }}>
              <button 
                className="btn btn-outline btn-sm"
                onClick={handleRemoveFont}
                style={{ color: '#e53e3e', borderColor: '#feb2b2' }}
              >
                Remove Custom Font
              </button>
            </div>
          )}
        </div>
      </details>

      <details open>
        <summary>Text</summary>
        <div>
          <label>Input text</label>
          <textarea
            id="input-text"
            rows={3}
            value={text}
            onChange={(e) => setState(prev => ({ ...prev, text: e.target.value }))}
          />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label>Size</label>
              <input
                type="number"
                id="input-size"
                value={size}
                onChange={(e) => setState(prev => ({ ...prev, size: Number(e.target.value) }))}
              />
            </div>
            <div>
              <label>Line height</label>
              <input
                type="number"
                id="input-line-height"
                value={lineHeight}
                onChange={(e) => setState(prev => ({ ...prev, lineHeight: Number(e.target.value) }))}
                step="0.1"
                min="0.1"
              />
            </div>
          </div>

          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
            <input
              type="checkbox"
              id="input-kerning"
              checked={kerning}
              onChange={(e) => setState(prev => ({ ...prev, kerning: e.target.checked }))}
              style={{ width: 'auto' }}
            />
            <span>Enable kerning</span>
          </label>
        </div>
      </details>

      <details>
        <summary>Stroke & Fill</summary>
        <div>
          <label>Stroke color</label>
          <div style={{ display: 'flex', gap: '8px' }}>
            <input
              type="color"
              id="input-stroke"
              value={stroke}
              onChange={(e) => setState(prev => ({ ...prev, stroke: e.target.value }))}
              style={{ width: '40px', padding: '0', height: '40px' }}
            />
            <input
              type="text"
              value={stroke}
              onChange={(e) => setState(prev => ({ ...prev, stroke: e.target.value }))}
              placeholder="#000000"
            />
          </div>

          <label>Stroke width</label>
          <input
            type="text"
            id="input-stroke-width"
            value={strokeWidth}
            onChange={(e) => setState(prev => ({ ...prev, strokeWidth: e.target.value }))}
          />

          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
            <input
              type="checkbox"
              id="input-stroke-non-scaling"
              checked={strokeNonScaling}
              onChange={(e) => setState(prev => ({ ...prev, strokeNonScaling: e.target.checked }))}
              style={{ width: 'auto' }}
            />
            <span>Non-scaling stroke</span>
          </label>

          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', marginTop: '1.5rem' }}>
            <input
              type="checkbox"
              id="input-filled"
              checked={filled}
              onChange={(e) => setState(prev => ({ ...prev, filled: e.target.checked }))}
              style={{ width: 'auto' }}
            />
            <span>Enable fill</span>
          </label>

          <label>Fill color</label>
          <div style={{ display: 'flex', gap: '8px' }}>
            <input
              type="color"
              id="input-fill"
              value={fill}
              onChange={(e) => setState(prev => ({ ...prev, fill: e.target.value }))}
              style={{ width: '40px', padding: '0', height: '40px' }}
            />
            <input
              type="text"
              value={fill}
              onChange={(e) => setState(prev => ({ ...prev, fill: e.target.value }))}
              placeholder="#000000"
            />
          </div>

          <label>Fill rule</label>
          <select
            id="input-fill-rule"
            value={fillRule}
            onChange={(e) => setState(prev => ({ ...prev, fillRule: e.target.value as 'evenodd' | 'nonzero' }))}
          >
            <option value="evenodd">evenodd</option>
            <option value="nonzero">nonzero</option>
          </select>
        </div>
      </details>

      <details>
        <summary>Advanced Options</summary>
        <div>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
            <input
              type="checkbox"
              id="input-union"
              checked={union}
              onChange={(e) => setState(prev => ({ ...prev, union: e.target.checked }))}
              style={{ width: 'auto' }}
            />
            <span>Union paths</span>
          </label>

          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
            <input
              type="checkbox"
              id="input-separate"
              checked={separate}
              onChange={(e) => setState(prev => ({ ...prev, separate: e.target.checked }))}
              style={{ width: 'auto' }}
            />
            <span>Separate characters</span>
          </label>

          <label>Bezier accuracy (auto if empty)</label>
          <input
            type="text"
            id="input-bezier-accuracy"
            placeholder="auto"
            value={bezierAccuracy}
            onChange={(e) => setState(prev => ({ ...prev, bezierAccuracy: e.target.value }))}
          />

          <label>DXF Units</label>
          <select
            id="dxf-units"
            value={dxfUnits}
            onChange={(e) => setState(prev => ({ ...prev, dxfUnits: e.target.value }))}
          >
            <option value="">Select units...</option>
            {Object.values(makerjs.unitType).map((unit: any) => (
              <option key={unit} value={unit}>
                {unit}
              </option>
            ))}
          </select>
        </div>
      </details>
    </div>
  );
}
