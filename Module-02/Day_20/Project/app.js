const form = document.querySelector("#search-form");
const input = document.querySelector("#country-input");
const out = document.querySelector("#facts");

function render(container, label, value) {
    const p = document.createElement("p");
    p.className = "fact-item";
    p.textContent = `${label}: ${value}`;
    container.append(p);
}

async function showCountry(name) {
    out.textContent = "Loading…";
    try {
        const res = await fetch(`https://restcountries.com/v3.1/name/${name}`);
        if (!res.ok) throw new Error("Country not found");
        const [c] = await res.json();
        out.innerHTML = "";

    if (c.flags && c.flags.png) {
        const img = document.createElement("img");
        img.src = c.flags.png;
        img.alt = c.flags.alt || `Flag of ${c.name.common}`;
        img.className = "flag";
        out.append(img);
    }

    render(out, "Capital", c.capital ? c.capital[0] : "N/A");
    render(out, "Population", c.population.toLocaleString());
    render(out, "Region", c.region);

    if (c.currencies) {
        const currencyNames = Object.values(c.currencies)
            .map(curr => curr.name)
            .join(", ");
        render(out, "Currencies", currencyNames);
    }
    } 
    catch (err) {
        out.textContent = err.message;
    }
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const query = input.value.trim();
    if (query) {
        showCountry(query);
    }
});

showCountry("ethiopia");