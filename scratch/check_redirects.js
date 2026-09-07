const https = require('https');

const urls = [
  'https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFLucPJI01CFiL8RAmZdR4SRLoTROwNgE6WNw1CuK1JIdxtOBIeF8jk_QmVRcqeJJVg4dc6w4bFvdK432zMb97uLru-Ac5bTpGd0GcSvIxpsLBrwVTaZA6Az-1jCSKdhTNElcvFHT7khrh25wyJzH97dBAbd34ftWUPbpibhgugrtFIINIYhceJ_3o=',
  'https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFRWrHBWAMkDvEqKtXEexWoIZkowiTZ_jHKfeSzyTVD8Y58KtMG6ABk32bKvvd3juozAkKxv8pgXDZUrSqkYTJyJoQmIXghdgMrPLM7QCosCHydtydDZoYHHCf7FyBnlf5ARSf9ZvPa35pMN1QGmTTyTa2RaUpeOE60_6mabOiMEdGf-RrLVjY=',
  'https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFoMJJmxioJWZFpLwUKQXamBzvMry9lshJm1JuMNQ5Eg-gbM9rC_eUlLG7dpFy1IKMFm3qnTUP3rI0ZA8zQMI8e6cxM8vt3b785U9lPCvzn2Aa_DADDdqNsig8H7yIvdYEz0cOGXjbWSv2JgQ=='
];

urls.forEach((u, i) => {
  https.get(u, res => {
    console.log(`[${i}] Status: ${res.statusCode}, Location: ${res.headers.location}`);
  });
});
