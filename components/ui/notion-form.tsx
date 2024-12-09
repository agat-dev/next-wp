"use client";

import React from 'react';

function NotionFormIframe() {
  return (
    <>
      <iframe style={{ border: 'none', width: '100%', height: '500px' }} id="prospects-zy8slx" src="https://noteforms.com/forms/prospects-zy8slx"></iframe>
      <script 
        type="text/javascript" 
        async 
        onLoad={() => (window as any).initEmbed && (window as any).initEmbed('prospects-zy8slx')} 
        src="https://noteforms.com/widgets/iframe.min.js">
      </script>
    </>
  );
}

export default NotionFormIframe;
