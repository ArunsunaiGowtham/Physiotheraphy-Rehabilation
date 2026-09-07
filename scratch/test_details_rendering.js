const fs = require('fs');

const blogHtml = fs.readFileSync('blog-details.html', 'utf8');
const blogEngineCode = fs.readFileSync('assets/js/blog-engine.js', 'utf8');

// Basic DOM simulation to test blog-details.html
function testSlug(testSlug) {
  const domElements = {
    articleBodyContainer: { innerHTML: '' },
    articleBreadcrumb: { textContent: '' },
    articleBadgeTag: { textContent: '' },
    articleTitle: { textContent: '' },
    articleAuthorImg: { src: '', alt: '' },
    articleAuthorName: { textContent: '' },
    articleDate: { innerHTML: '' },
    articleReadingTime: { innerHTML: '' },
    articleFeaturedImg: { src: '', alt: '' },
    articleTagsContainer: { innerHTML: '' },
    authorBoxImg: { src: '', alt: '' },
    authorBoxName: { textContent: '' },
    authorBoxBio: { textContent: '' },
    relatedArticlesList: { innerHTML: '' }
  };

  global.window = {
    location: {
      search: `?slug=${testSlug}`,
      href: `http://localhost/blog-details.html?slug=${testSlug}`,
      protocol: 'http:'
    },
    history: { replaceState: () => {} },
    sessionStorage: { getItem: () => null }
  };

  global.document = {
    readyState: 'complete',
    addEventListener: () => {},
    getElementById: (id) => domElements[id] || null,
    querySelector: () => null,
    querySelectorAll: () => []
  };

  eval(blogEngineCode);

  window.PhysioLifeBlog.initDetails();

  return {
    title: domElements.articleTitle.textContent,
    author: domElements.articleAuthorName.textContent,
    readingTime: domElements.articleReadingTime.innerHTML,
    featuredImg: domElements.articleFeaturedImg.src,
    hasContent: domElements.articleBodyContainer.innerHTML.length > 50
  };
}

console.log('Test 1 (Sciatica):', testSlug('5-proven-exercises-for-sciatica'));
console.log('Test 2 (Rotator Cuff):', testSlug('rotator-cuff-tears-surgery-vs-therapy'));
console.log('Test 3 (Desk Ergonomics):', testSlug('complete-ergonomic-workstation-blueprint'));
console.log('Test 4 (Concussion):', testSlug('post-concussion-baseline-voms-protocol'));
