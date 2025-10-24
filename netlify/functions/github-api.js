const fetch = require('node-fetch');

exports.handler = async (event) => {
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  const { action, content, sha } = JSON.parse(event.body);
  
  const headers = {
    'Authorization': `token ${GITHUB_TOKEN}`,
    'Accept': 'application/vnd.github.v3+json',
    'Content-Type': 'application/json'
  };

  const url = 'https://api.github.com/repos/ValeryKG/payment-tracker/contents/data.json';

  try {
    if (action === 'read') {
      const response = await fetch(url, { headers });
      const data = await response.json();
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      };
    }
    
    if (action === 'write') {
      const response = await fetch(url, {
        method: 'PUT',
        headers,
        body: JSON.stringify({
          message: 'Update payments',
          content: content,
          sha: sha
        })
      });
      const data = await response.json();
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      };
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
