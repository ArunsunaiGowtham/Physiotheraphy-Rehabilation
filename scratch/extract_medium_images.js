const https = require('https');

const urls = [
  'https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQE5Mti5ncp0d2m2bwE0lzpTE6EIUSZRBupjc2tfXBbLeYA6RbrSoju8THJnD57eo8k9MUwBhsCFtMj3QervyYBtvE8qOmqYwaKrhyELej9yagtIqNqlBan7YWxGzzg_EAPPFs2TcupeoptOSM6LLfe_rNEA5rOXToTmAy7KrzwlCH_-0QMKmpTaVvkAtjJqPz1xzFftiY5XnZWpHHLEvCtVEJU=',
  'https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFO9Dh5wG3nLLj8qTSGQpkQBtURHEOUtHvr0Bt9Lqd0Majt0eDbeeSwgwM8gOxJj60jsTkGRipFLzo92tZtpC0l50RPASKxycWZZ-ouD48zNNkYwzd1q7MBaq8c6_dqsRwWL0o8ZDkrTd2Tu2d5fH9AV9s0cR7CGQ586i_oNqOLsqY-hUdP_2pPiBUUf-7v0Njng5HRCbu_VdwVkQpVfWo5Dctmf6OI4J0FcLJ9_zLlNrhD1QvYuqNEVPDIgyLonEwiRzEG3AM0WSi8nw=='
];

urls.forEach((u, i) => {
  https.get(u, res => {
    if (res.headers.location) {
      https.get(res.headers.location, r2 => {
        let d = '';
        r2.on('data', c => d += c);
        r2.on('end', () => {
          const m = d.match(/https:\/\/images\.unsplash\.com\/photo-[a-zA-Z0-9\-_?=;&]+/g);
          console.log(`Article ${i} Unsplash matches:`, m ? m.slice(0, 3) : 'none');
          const mi = d.match(/https:\/\/miro\.medium\.com\/v2\/resize:[^"'\s>]+/g);
          console.log(`Article ${i} Medium image matches:`, mi ? mi.slice(0, 3) : 'none');
        });
      });
    }
  });
});
