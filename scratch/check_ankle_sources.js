const https = require('https');

const urls = [
  'https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEi2v-NGh-wCWjW4bfqTr3eVUA8ZnP19E65M1RoO3YzpfCYTazfPyDKPuxaTqwjAachA6358GLHNMCtqJADZWgvGKlUUM9yvMMxPt5Clz15z76BlytHon-Ttt7s0svhu1g=',
  'https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQF-ML_CVqltEBtnAHymh0-kXk8l_ixKbL-sMrsYsq2Vn4G9z-FCAoYMKQQOmsTllttrxwNcvlHBjUCiK96nhodgqODETzxCK-vwy9EB3lI7quQffjq2k8IiZw=='
];

urls.forEach((u, i) => {
  https.get(u, res => {
    console.log(`[${i}] Status: ${res.statusCode}, Location: ${res.headers.location}`);
  });
});
