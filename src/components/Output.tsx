import React, { useState } from 'react';
import { Copy, Download, Link, Box } from 'lucide-react';

interface OutputProps {
  state: any;
}

export default function Output({ state }: OutputProps) {
  const { svgOutput, dxfOutput, errorMessage, text } = state;
  const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');
  const [copyStatus, setCopyStatus] = useState('Copy SVG');

  const copyToClipboard = () => {
    const textarea = document.getElementById('output-svg') as HTMLTextAreaElement;
    if (textarea) {
      textarea.select();
      document.execCommand('copy');
      setCopyStatus('Copied!');
      setTimeout(() => setCopyStatus('Copy SVG'), 2000);
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
        btn.innerText = 'Copied Link!';
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

      <div className="tabs-wrapper">
        <div className="tabs-header">
          <button 
            className={`tab-btn ${activeTab === 'preview' ? 'active' : ''}`}
            onClick={() => setActiveTab('preview')}
          >
            Preview
          </button>
          <button 
            className={`tab-btn ${activeTab === 'code' ? 'active' : ''}`}
            onClick={() => setActiveTab('code')}
          >
            SVG Code
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
          <Copy size={16} />
          {copyStatus}
        </button>
        <button className="btn btn-outline" onClick={downloadSvg}>
          <Download size={16} />
          SVG
        </button>
        <button className="btn btn-outline" onClick={downloadDxf}>
          <Box size={16} />
          DXF
        </button>
        <button id="create-link" className="btn btn-outline" onClick={createLink}>
          <Link size={16} />
          Share Link
        </button>
      </div>
    </div>
  );
}
