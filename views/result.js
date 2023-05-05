import { html, page } from "../src/lib.js";

const loadingTemplate = () => html`
<div class="lds-heart">loading<div></div></div>
`
const resultTemplate = (item,onClick) => html`
<h1>Results</h1>
    <div id="result">
        <h3>Transported gallons</h3>
        <input type="text" value=${item.gallons} disabled >
        <h3>Total Carbon Footprint</h3>
        <input type="text" value="${`${item.result}kg CO2`}" disabled>
        <h3>Vehicle information</h3>
        <dl>Fuel: ${item.fuel}<br>Fuel Consumption: ${item.fuelConsumption}L</dl>
        <button @click=${onClick} >New Calculation</button>
    </div>
`

export function resultView(ctx) {
    const result = JSON.parse(sessionStorage.getItem('userData'))
    sessionStorage.clear()
    ctx.render(loadingTemplate())
    setTimeout(() => {ctx.render(resultTemplate(result,onClick))},3000)
    function onClick() {
        page.redirect('/')
    }
}
