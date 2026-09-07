const https = require('https');

const urls = [
  'https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGXPGgBYZIhA7I8VN4NQRK33mRQB_NtJdnjRhrr1Od3ubxfIIoos7lbRfZ4wd4XDvkzLPL5aaRDmQj09EUUsrK8ECpTeLpm17ERGRlsnXNRpaVUD_4QrWbgMwu2N94ZS6o=',
  'https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFPpv4_mkCxxRVKI_KKCmrR3vJAMNvqRkrKeChjrLiWe3EcdoQ-r-BO3SlSKH0d0qr9JWfsXqn2CimNYIx3v_4Ks6cwGRkgSxD7nlNVM6qJQ4kxrrg__FvQrFZmZTzE=',
  'https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHbpQxeH4ctPjyBVc9Itl4e4_Ea1EO6KDLhAzU8e05bAwTvKud2wryoDKQo-nUeIrTPhHKIR0lznr1M52GVmh8sk-8CfX4aqisL6Z5hUuPzEMbmdwmyoTmSM25BCxH_Dc0='
];

urls.forEach((u, i) => {
  https.get(u, res => {
    console.log(`[${i}] Status: ${res.statusCode}, Location: ${res.headers.location}`);
  });
});
