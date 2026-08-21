export default async function handler(req, res) {
  try {
    const targetUrl = 'http://today.od.ua/';
    const [pageRes, cssRes] = await Promise.all([ 
      fetch(targetUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
        }
      }),
      fetch('http://today.od.ua/images/skin/green/style2.css?v=1.001', {
        headers: { 'User-Agent': 'Mozilla/5.0' }
      }).catch(() => null)
    ]);

    const arrayBuffer = await pageRes.arrayBuffer();
    let html = Buffer.from(arrayBuffer).toString('latin1');
    
    let injectedCss = '';
    if (cssRes && cssRes.ok) {
      const cssBuf = Buffer.from(await cssRes.arrayBuffer());
      let cssText = cssBuf.toString('latin1');
      cssText = cssText.replace(/url\([ \"']?\//gi, 'url(http://today.od.ua/');
      injectedCss = '<style>' + cssText + '</style>';
    }

    if (html.includes('<head>')) {
      html = html.replace('<head>', '<head><base href="http://today.od.ua/" target="_blank">' + injectedCss);
    } else if (html.includes('<HEAD>')) {
      html = html.replace('<HEAD>', '<HEAD><base href="http://today.od.ua/" target="_blank">' + injectedCss);
    }

    res.setHeader('Content-Type', 'text/html; charset=windows-1251');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 'public, s-maxage=1800, stale-while-revalidate=3600');
    return res.status(200).send(Buffer.from(html, 'latin1'));
  } catch (error) {
    console.error('proxy today error', error);
    return res.status(500).send('Error loading today.od.ua');
  }
}
