// 1. Async function to fetch ETB rates

async function getEtbRate() {
  const res = await fetch("https://api.exchangerate.host/latest?base=USD");
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();
  return data.rates.ETB;
}

// 2. Rewriting ro async function

async function getData() {
  try {
    const res = await fetch("/api/data");
    const data = await res.json();
    render(data);
  } 
  catch (err) {
    console.error(err);
  }
}

// 3. Fetching wrong and real URL

async function testNetworkError() {
  try {
    await fetch("https://wrong_domain.com");
  } 
  catch (err) {
    console.log("Network error caught:", err);
  }
}

async function testHttpError() {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/invalid-endpoint-404");
    if (!res.ok) {
      throw new Error(`HTTP Error: ${res.status}`);
    }
    const data = await res.json();
  } 
  catch (err) {
    console.log("HTTP error caught via manual throw:", err.message);
  }
}

// 4. Using promise.all

async function fetchTopTwoDetails() {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts");
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const posts = await res.json();
    
    const [item1, item2] = await Promise.all([
      fetch(`https://jsonplaceholder.typicode.com/posts/${posts[0].id}`).then(r => r.json()),
      fetch(`https://jsonplaceholder.typicode.com/posts/${posts[1].id}`).then(r => r.json())
    ]);
    
    return [item1, item2];
  } 
  catch (err) {
    console.error(err);
  }
}

// 5. Loading... page

async function loadData() {
  const display = document.querySelector("#display");
  display.textContent = "Loading…";
  
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts/1");
    if (!res.ok) throw new Error("Could not load data.");
    const data = await res.json();
    display.textContent = JSON.stringify(data);
  } 
  catch (err) {
    display.textContent = err.message;
  }
}