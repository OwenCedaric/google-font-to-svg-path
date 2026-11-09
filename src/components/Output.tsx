import React, { useState } from 'react';
import { getI18n, type Lang } from '../i18n/translations';

interface OutputProps {
  state: any;
  lang?: Lang;
}

export default function Output({ state, lang = 'en' }: OutputProps) {
  const t = getI18n(lang).ui;
  const { svgOutput, dxfOutput, errorMessage, text } = state;
  const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');
  const [copyStatus, setCopyStatus] = useState(t.copySvg);

  const copyToClipboard = () => {
    if (svgOutput) {
      navigator.clipboard.writeText(svgOutput).then(() => {
        setCopyStatus(t.copied);
        setTimeout(() => setCopyStatus(t.copySvg), 2000);
      }).catch(err => {
        console.error('Failed to copy: ', err);
      });
    }
  };

  const downloadSvg = () => {
    const blob = new Blob([svgOutput], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${text || 'font'}.svg`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadDxf = () => {
    const blob = new Blob([dxfOutput], { type: 'application/dxf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${text || 'font'}.dxf`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const createLink = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      const btn = document.getElementById('create-link');
      if (btn) {
        const originalText = btn.innerHTML;
        btn.innerText = t.copiedLink;
        setTimeout(() => {
          btn.innerHTML = originalText;
        }, 2000);
      }
    });
  };

  return (
    <div className="main-content-inner">
      {errorMessage && (
        <div id="error-display" style={{ 
          color: '#e53e3e', 
          background: '#fff5f5', 
          padding: '0.75rem', 
          borderRadius: '4px',
          marginBottom: '1rem',
          fontSize: '0.8125rem',
          textAlign: 'center',
          boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
        }}>
          {errorMessage}
        </div>
      )}

      {state.missingGlyphs && (
        <div style={{
          color: '#b45309',
          background: '#fffbeb',
          border: '1px solid #fef3c7',
          padding: '0.75rem 1rem',
          borderRadius: '6px',
          marginBottom: '1rem',
          fontSize: '0.85rem',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          lineHeight: 1.4,
        }}>
          <i className="ri-alert-line" style={{ fontSize: '18px', flexShrink: 0 }} />
          <span>
            {lang === 'zh'
              ? '当前选择的字体不包含部分输入字符（如中文汉字），缺失字符将显示为方框。请在右侧选择“⭐ 推荐中文字体”或上传本地字体文件。'
              : 'The selected font does not contain glyphs for some characters in your text (shown as empty boxes). Please select a font supporting this character set or upload a custom font file.'}
          </span>
        </div>
      )}

      <div className="tabs-wrapper">
        <div className="tabs-header">
          <button 
            className={`tab-btn ${activeTab === 'preview' ? 'active' : ''}`}
            onClick={() => setActiveTab('preview')}
          >
            {t.preview}
          </button>
          <button 
            className={`tab-btn ${activeTab === 'code' ? 'active' : ''}`}
            onClick={() => setActiveTab('code')}
          >
            {t.code}
          </button>
        </div>

        <div className="tab-content">
          {activeTab === 'preview' ? (
            <div 
              id="svg-render" 
              dangerouslySetInnerHTML={{ __html: svgOutput }}
            />
          ) : (
            <div className="output-textarea-container">
              <textarea 
                id="output-svg" 
                readOnly
                value={svgOutput}
              />
            </div>
          )}
        </div>
      </div>

      <div className="actions-container">
        <button className="btn btn-primary" onClick={copyToClipboard}>
          <i className="ri-file-copy-line" />
          <span>{copyStatus}</span>
        </button>
        <button className="btn btn-outline" onClick={downloadSvg}>
          <i className="ri-download-2-line" />
          <span>SVG</span>
        </button>
        <button className="btn btn-outline" onClick={downloadDxf}>
          <i className="ri-box-3-line" />
          <span>DXF</span>
        </button>
        <button id="create-link" className="btn btn-outline" onClick={createLink}>
          <i className="ri-link" />
          <span>{t.shareLink}</span>
        </button>
      </div>
    </div>
  );
}
