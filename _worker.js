// _worker.js

const TELEGRAPH_URL = 'https://api.nextweb.fun';

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  // 检查请求的路径
  const url = new URL(request.url);
  if (url.pathname === '/') {
    // 如果请求的是根路径，返回 index.html 文件内容
    const indexHtmlResponse = await fetch('https://nextai.date');
    return indexHtmlResponse;
  }

  // 如果请求的不是根路径，将其代理到指定的 URL
  url.host = TELEGRAPH_URL.replace(/^https?:\/\//, '');

  const modifiedRequest = new Request(url.toString(), {
    headers: request.headers,
    method: request.method,
    body: request.body,
    redirect: 'follow'
  });

  const response = await fetch(modifiedRequest);
  const modifiedResponse = new Response(response.body, response);

  // 添加允许跨域访问的响应头，从请求中获取 Origin
  const origin = request.headers.get('Origin') || '*';
  modifiedResponse.headers.set('Access-Control-Allow-Origin', origin);

  return modifiedResponse;
}
