/**
 * Utility functions for exporting and copying educational documents
 */

export function copyToClipboard(text: string): Promise<boolean> {
  return navigator.clipboard
    .writeText(text)
    .then(() => true)
    .catch((err) => {
      console.error('Không thể sao chép:', err);
      // Fallback
      try {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        return true;
      } catch (e) {
        return false;
      }
    });
}

export function exportToWordDoc(title: string, contentHtmlOrText: string, metadata?: { teacher?: string; school?: string; subject?: string; grade?: string }) {
  const headerHtml = `
    <div style="font-family: 'Times New Roman', Times, serif; font-size: 13pt; line-height: 1.35; margin-bottom: 20px;">
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
        <tr>
          <td style="width: 50%; text-align: center; vertical-align: top;">
            <strong>SỞ GIÁO DỤC VÀ ĐÀO TẠO</strong><br/>
            <strong>TRƯỜNG: ${metadata?.school || 'THPT ....................'}</strong><br/>
            <span>Tổ Chuyên môn: ${metadata?.subject || '...............'}</span>
          </td>
          <td style="width: 50%; text-align: center; vertical-align: top;">
            <strong>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</strong><br/>
            <strong>Độc lập - Tự do - Hạnh phúc</strong><br/>
            <span>-------------------</span>
          </td>
        </tr>
      </table>
      <div style="text-align: center; margin-top: 15px; margin-bottom: 20px;">
        <h2 style="font-size: 16pt; margin: 0; text-transform: uppercase;">KẾ HOẠCH BÀI DẠY (GIÁO ÁN)</h2>
        <h3 style="font-size: 14pt; margin: 5px 0 0 0; font-weight: bold;">BÀI: ${title.toUpperCase()}</h3>
        <p style="margin: 5px 0 0 0; font-style: italic;">
          Môn: ${metadata?.subject || '...............'} - Lớp: ${metadata?.grade || '.........'} | Giáo viên: ${metadata?.teacher || '..........................'}
        </p>
      </div>
    </div>
  `;

  // Format markdown-like text to nice HTML if it's raw text
  let bodyContent = contentHtmlOrText;
  if (!contentHtmlOrText.includes('<p>') && !contentHtmlOrText.includes('<div>')) {
    bodyContent = contentHtmlOrText
      .replace(/^### (.*$)/gim, '<h4 style="font-size: 13pt; margin-top: 14px; margin-bottom: 6px; font-weight: bold;">$1</h4>')
      .replace(/^## (.*$)/gim, '<h3 style="font-size: 14pt; margin-top: 18px; margin-bottom: 8px; font-weight: bold; color: #1e3a8a;">$1</h3>')
      .replace(/^# (.*$)/gim, '<h2 style="font-size: 15pt; margin-top: 22px; margin-bottom: 10px; font-weight: bold; text-transform: uppercase;">$1</h2>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\n\n/g, '</p><p style="margin-bottom: 8px; text-indent: 1.25cm; text-align: justify;">')
      .replace(/\n/g, '<br/>');
    bodyContent = `<p style="margin-bottom: 8px; text-indent: 1.25cm; text-align: justify;">${bodyContent}</p>`;
  }

  const fullHtml = `
    <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
    <head>
      <meta charset='utf-8'>
      <title>${title}</title>
      <style>
        @page {
          size: A4;
          margin: 20mm 20mm 20mm 25mm; /* Standard VN administrative margins */
        }
        body {
          font-family: 'Times New Roman', Times, serif;
          font-size: 13pt;
          line-height: 1.35;
          color: #000;
        }
        p {
          margin: 0 0 6pt 0;
          line-height: 1.35;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin: 10pt 0;
        }
        table, th, td {
          border: 1px solid #333;
          padding: 6pt;
          font-size: 12pt;
        }
      </style>
    </head>
    <body>
      ${headerHtml}
      <div>${bodyContent}</div>
    </body>
    </html>
  `;

  const blob = new Blob(['\ufeff', fullHtml], {
    type: 'application/msword',
  });

  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  const safeFilename = title.replace(/[^a-zA-Z0-9_\u00C0-\u024F\u1EA0-\u1EF9]/g, '_');
  a.download = `GiaoAn_5512_${safeFilename}.doc`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function exportExamToWordDoc(topic: string, examData: any, metadata?: { school?: string; grade?: string; subject?: string }) {
  const dateStr = new Date().toLocaleDateString('vi-VN');
  
  let questionsHtml = '';
  if (examData.questions && Array.isArray(examData.questions)) {
    examData.questions.forEach((q: any, idx: number) => {
      let optionsHtml = '';
      if (q.options && q.options.length > 0) {
        optionsHtml = `
          <div style="margin-left: 20px; margin-top: 5px; margin-bottom: 8px;">
            ${q.options.map((opt: any) => `
              <div style="margin-bottom: 3px;"><strong>${opt.key}.</strong> ${opt.text}</div>
            `).join('')}
          </div>
        `;
      }

      questionsHtml += `
        <div style="margin-bottom: 15px; page-break-inside: avoid;">
          <p style="margin: 0; font-weight: normal;">
            <strong>Câu ${idx + 1} (${q.cognitiveLevel || 'Nhận thức'}):</strong> ${q.content}
          </p>
          ${optionsHtml}
          <div style="background-color: #f1f5f9; padding: 6px 10px; border-left: 3px solid #2563eb; margin-top: 6px; font-size: 11pt;">
            <strong>Đáp án:</strong> <span style="color: #dc2626; font-weight: bold;">${q.correctAnswer}</span><br/>
            <strong>Hướng dẫn giải chi tiết:</strong> ${q.explanation || 'Đang cập nhật'}
          </div>
        </div>
      `;
    });
  }

  const htmlContent = `
    <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
    <head>
      <meta charset='utf-8'>
      <title>Đề kiểm tra ${topic}</title>
      <style>
        body { font-family: 'Times New Roman', serif; font-size: 13pt; line-height: 1.3; }
        table { width: 100%; border-collapse: collapse; }
      </style>
    </head>
    <body>
      <table style="width: 100%; margin-bottom: 20px;">
        <tr>
          <td style="width: 50%; text-align: center; border: none;">
            <strong>SỞ GD&ĐT ........................</strong><br/>
            <strong>TRƯỜNG: ${metadata?.school || 'THPT ....................'}</strong>
          </td>
          <td style="width: 50%; text-align: center; border: none;">
            <strong>ĐỀ KIỂM TRA ĐÁNH GIÁ CHẤT LƯỢNG</strong><br/>
            <strong>MÔN: ${(metadata?.subject || 'TIN HỌC').toUpperCase()} - ${metadata?.grade || 'LỚP 12'}</strong><br/>
            <i>Thời gian làm bài: 45 phút</i>
          </td>
        </tr>
      </table>
      <div style="text-align: center; margin-bottom: 15px;">
        <h3 style="margin: 0;">CHỦ ĐỀ: ${topic.toUpperCase()}</h3>
      </div>
      <div>
        ${questionsHtml}
      </div>
    </body>
    </html>
  `;

  const blob = new Blob(['\ufeff', htmlContent], { type: 'application/msword' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `De_Kiem_Tra_${topic.replace(/\s+/g, '_')}.doc`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
