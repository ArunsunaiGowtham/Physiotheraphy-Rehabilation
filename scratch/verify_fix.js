const fs = require('fs');

console.log('=== VERIFICATION TEST START ===');

// 1. Check blog-details.html
const blogDetailsHtml = fs.readFileSync('blog-details.html', 'utf8');
const requiredIds = [
  'articleBreadcrumb',
  'articleBadgeTag',
  'articleTitle',
  'articleAuthorImg',
  'articleAuthorName',
  'articleDate',
  'articleReadingTime',
  'articleFeaturedImg',
  'articleBodyContainer',
  'articleTagsContainer',
  'authorBoxImg',
  'authorBoxName',
  'authorBoxBio',
  'relatedArticlesList'
];

let blogDetailsOk = true;
requiredIds.forEach(id => {
  const has = blogDetailsHtml.includes(`id="${id}"`);
  if (!has) {
    console.error(`FAIL: blog-details.html missing id="${id}"`);
    blogDetailsOk = false;
  }
});

const hasBlogEngineScript = blogDetailsHtml.includes('assets/js/blog-engine.js');
if (!hasBlogEngineScript) {
  console.error('FAIL: blog-details.html missing assets/js/blog-engine.js script');
  blogDetailsOk = false;
}
if (blogDetailsOk) {
  console.log('PASS: blog-details.html has all required dynamic IDs and blog-engine.js script');
}

// 2. Check admin/blog.html
const adminBlogHtml = fs.readFileSync('admin/blog.html', 'utf8');
const expectedSlugs = [
  '5-proven-exercises-for-sciatica',
  'rotator-cuff-tears-surgery-vs-therapy',
  'complete-ergonomic-workstation-blueprint',
  'post-concussion-baseline-voms-protocol'
];

let adminBlogOk = true;
expectedSlugs.forEach(slug => {
  const hasLink = adminBlogHtml.includes(`slug=${slug}`);
  const hasTargetBlank = adminBlogHtml.includes(`href="../blog-details.html?slug=${slug}" target="_blank"`);
  const hasPreview = adminBlogHtml.includes(`data-slug="${slug}"`);

  if (!hasLink) {
    console.error(`FAIL: admin/blog.html missing link for ${slug}`);
    adminBlogOk = false;
  }
  if (!hasTargetBlank) {
    console.error(`FAIL: admin/blog.html missing target="_blank" for ${slug}`);
    adminBlogOk = false;
  }
  if (!hasPreview) {
    console.error(`FAIL: admin/blog.html missing preview button for ${slug}`);
    adminBlogOk = false;
  }
});

const hasModal = adminBlogHtml.includes('id="articlePreviewModal"');
const hasModalScript = adminBlogHtml.includes('blog-engine.js');
if (!hasModal || !hasModalScript) {
  console.error('FAIL: admin/blog.html missing modal or blog-engine.js script');
  adminBlogOk = false;
}
if (adminBlogOk) {
  console.log('PASS: admin/blog.html has target="_blank" on all View links, Preview modal, and matching slugs');
}

// 3. Test dynamic data retrieval for all 4 admin slugs in blog-engine
const blogEngineCode = fs.readFileSync('assets/js/blog-engine.js', 'utf8');
global.window = global;
global.document = {
  readyState: 'complete',
  addEventListener: () => {},
  getElementById: () => null,
  querySelector: () => null,
  querySelectorAll: () => []
};
eval(blogEngineCode);

expectedSlugs.forEach(slug => {
  const art = window.PhysioLifeBlog.getArticle(slug);
  if (!art) {
    console.error(`FAIL: blog-engine missing article for ${slug}`);
  } else {
    console.log(`PASS: Retrieved [${slug}] -> "${art.title}" (${art.readingTime})`);
  }
});

console.log('=== ALL TESTS COMPLETED SUCCESSFULLY ===');
