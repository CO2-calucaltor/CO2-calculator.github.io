import { html, page } from "../src/lib.js";

const homeTemplate = (onSubmit) => html`
    <h1>CO2 Calculator</h1>
    <div id="form">
        <form @submit=${onSubmit} >
            <h3>Distance</h3>
            <input id="distance" name="distance" type="number" placeholder="100km" required />
            <h3>Consumption</h3>
            <input type="number" name="consumption" id="consumption" step="0.1" placeholder="7.5l" required >
            <h3>Gallons in a truck</h3>
            <input id="gallons" name="gallons" type="number" min="1" max="1000" placeholder="min 1 / max 1000" required />
            <img src="/images/fuelType.png" alt="fuelType">
            <select id="fuel" name="fuel">
                <option value="2.8">Gasoline</option>
                <option value="2.9">Diesel</option>
                <option value="1.9">LPG</option>
                <option value="2.9">Gas Oil</option>
                <option value="1.8">Biogasoline</option>
                <option value="1.9">Biodiesel</option>
            </select>
            <button type="submit">Calculate</button>
        </form>
    </div>
`

export function homeView(ctx) {
    ctx.render(homeTemplate(onSubmit))
}

function onSubmit(e){
    e.preventDefault()
    const formData = new FormData(e.target)

    const distance = formData.get('distance');
    const consumption = formData.get('consumption');
    const gallons = formData.get('gallons'); 
    const fuelEm = formData.get('fuel');
    const sel = document.getElementById('fuel')
    const fuel = sel.options[sel.selectedIndex].text;

    const fuelConsumption = ((Number(consumption) * Number(distance)) / 100).toFixed(2);
    const litersFuelPerGallon = fuelConsumption / Number(gallons)
    const carbonFootPrint = litersFuelPerGallon * fuelEm
    const kgCO2PerGallon = (Number(consumption) * Number(distance) * Number(fuelEm)) / (100 * gallons)
    const result = (kgCO2PerGallon * Number(gallons)).toFixed(2)
    const data = {
        gallons,
        result,
        fuel,
        fuelConsumption
    };
    sessionStorage.setItem('userData',JSON.stringify(data))
    page.redirect('/result')
    document.querySelector('form').reset()
}