export default async function handler(req, res) {
  try {
    const targetUrl = "http://today.od.ua/";
    const response = await fetch(targetUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "uk-UA,uk;q=0.9,ru;q=0.8,en;q=0.7"
      }
    });

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    let html = buffer.toString("latin1");
    
    if (html.includes("<head>")) {
      html = html.replace("<head>", "<head><base href=\"http://today.od.ua/\" target=\"_blank\">");
    } else if (html.includes("<HEAD>")) {
      html = html.replace("<HEAD>", "<HEAD><base href=\"http://today.od.ua/\" target=\"_blank\">");
    }

    res.setHeader("Content-Type", "text/html; charset=windows-1251");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Cache-Control", "public, s-maxage=1800, stale-while-revalidate=3600");
    return res.status(200).send(Buffer.from(html, "latin1"));
  } catch (error) {
    console.error("proxy today error", error);
    return res.status(500).send("Error loading today.od.ua");
  }
}
