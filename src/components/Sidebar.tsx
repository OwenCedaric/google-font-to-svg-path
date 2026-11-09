import React, { useMemo } from 'react';
// @ts-ignore
import makerjs from 'makerjs';
import * as opentype from 'opentype.js';
import { getI18n, type Lang } from '../i18n/translations';

interface SidebarProps {
  state: any;
  setState: (updater: (prev: any) => any) => void;
  lang?: Lang;
}

export default function Sidebar({ state, setState, lang = 'en' }: SidebarProps) {
  const t = getI18n(lang).ui;
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

  const CHINESE_FONTS = useMemo(() => [
    { family: 'Ma Shan Zheng', label: 'Ma Shan Zheng (马善政楷书)' },
    { family: 'ZCOOL KuaiLe', label: 'ZCOOL KuaiLe (站酷快乐体)' },
    { family: 'Long Cang', label: 'Long Cang (龙仓草书)' },
    { family: 'ZCOOL QingKe HuangYou', label: 'ZCOOL 黄油体 (站酷高端黑)' },
    { family: 'ZCOOL XiaoWei', label: 'ZCOOL XiaoWei (站酷小薇体)' },
    { family: 'Zhi Mang Xing', label: 'Zhi Mang Xing (志莽行书)' },
    { family: 'Liu Jian Mao Cao', label: 'Liu Jian Mao Cao (刘建毛草)' },
    { family: 'Noto Serif SC', label: 'Noto Serif SC (思源宋体)' },
  ], []);

  const fontVariants = fontList && fontFamily
    ? fontList.items.find((f: any) => f.family === fontFamily)?.variants || []
    : [];

  const fontOptions = useMemo(() => {
    if (!fontList) return <option>{t.loadingFonts}</option>;
    return (
      <>
        <optgroup label={lang === 'zh' ? '⭐ 推荐中文字体 (支持汉字)' : '⭐ Chinese Compatible Fonts'}>
          {CHINESE_FONTS.map(cf => (
            <option key={cf.family} value={cf.family}>
              {cf.label}
            </option>
          ))}
        </optgroup>
        <optgroup label={lang === 'zh' ? '全部 Google 在线字体 (1,500+)' : 'All Google Fonts (1,500+)'}>
          {fontList.items.map((font: any) => (
            <option key={font.family} value={font.family}>
              {font.family}
            </option>
          ))}
        </optgroup>
      </>
    );
  }, [fontList, t.loadingFonts, lang, CHINESE_FONTS]);

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
      <h2 id="settings-title">{t.settings}</h2>
      
      <details open>
        <summary>{t.font}</summary>
        <div>
          <div className="label-with-link">
            <label>{t.googleFont}</label>
            <a
              href="https://fonts.google.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="link-btn"
            >
              <span>{t.browse}</span>
              <i className="ri-external-link-line" style={{ fontSize: '11px' }} />
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

          <label>{t.variant}</label>
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

          <label>{t.uploadCustomFont}</label>
          <div className="file-input-wrapper">
            <div className="file-input-custom">
              <i className="ri-upload-2-line" style={{ marginRight: '8px', fontSize: '14px' }} />
              {customFont ? t.customFontLoaded : t.chooseFile}
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
                {t.removeCustomFont}
              </button>
            </div>
          )}
        </div>
      </details>

      <details open>
        <summary>{t.text}</summary>
        <div>
          <label>{t.inputText}</label>
          <textarea
            id="input-text"
            rows={3}
            value={text}
            onChange={(e) => setState(prev => ({ ...prev, text: e.target.value }))}
          />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label>{t.size}</label>
              <input
                type="number"
                id="input-size"
                value={size}
                onChange={(e) => setState(prev => ({ ...prev, size: Number(e.target.value) }))}
              />
            </div>
            <div>
              <label>{t.lineHeight}</label>
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
            <span>{t.enableKerning}</span>
          </label>
        </div>
      </details>

      <details>
        <summary>{t.strokeAndFill}</summary>
        <div>
          <label>{t.strokeColor}</label>
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

          <label>{t.strokeWidth}</label>
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
            <span>{t.nonScalingStroke}</span>
          </label>

          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', marginTop: '1.5rem' }}>
            <input
              type="checkbox"
              id="input-filled"
              checked={filled}
              onChange={(e) => setState(prev => ({ ...prev, filled: e.target.checked }))}
              style={{ width: 'auto' }}
            />
            <span>{t.enableFill}</span>
          </label>

          <label>{t.fillColor}</label>
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

          <label>{t.fillRule}</label>
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
        <summary>{t.advancedOptions}</summary>
        <div>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
            <input
              type="checkbox"
              id="input-union"
              checked={union}
              onChange={(e) => setState(prev => ({ ...prev, union: e.target.checked }))}
              style={{ width: 'auto' }}
            />
            <span>{t.unionPaths}</span>
          </label>

          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
            <input
              type="checkbox"
              id="input-separate"
              checked={separate}
              onChange={(e) => setState(prev => ({ ...prev, separate: e.target.checked }))}
              style={{ width: 'auto' }}
            />
            <span>{t.separateCharacters}</span>
          </label>

          <label>{t.bezierAccuracy}</label>
          <input
            type="text"
            id="input-bezier-accuracy"
            placeholder="auto"
            value={bezierAccuracy}
            onChange={(e) => setState(prev => ({ ...prev, bezierAccuracy: e.target.value }))}
          />

          <label>{t.dxfUnits}</label>
          <select
            id="dxf-units"
            value={dxfUnits}
            onChange={(e) => setState(prev => ({ ...prev, dxfUnits: e.target.value }))}
          >
            <option value="">{t.selectUnits}</option>
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
