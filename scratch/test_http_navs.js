const http = require('http');

const pages = [
  'insurance.html',
  'contact.html',
  'service-details.html',
  'therapist-details.html',
  'blog-details.html',
  'services.html',
  'index.html'
];

pages.forEach(page => {
  http.get('http://127.0.0.1:8080/' + page, res => {
    let data = '';
    res.on('data', c => data += c);
    res.on('end', () => {
      const hasTopbar = data.includes('class="topbar');
      const hasSiteHeader = data.includes('class="site-header"');
      const navCount = (data.match(/<nav\s+class="navbar/g) || []).length;
      console.log(page.padEnd(25), 'Status: ' + res.statusCode, 'Topbar: ' + hasTopbar, 'SiteHeader: ' + hasSiteHeader, 'NavbarCount: ' + navCount);
    });
  });
});
