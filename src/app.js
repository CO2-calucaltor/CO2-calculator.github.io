import { resultView } from "../views/result.js";
import { page,render } from "./lib.js";

const root = document.getElementById('root');
document.querySelector('form').addEventListener('submit', onSubmit);

page(decorateContext);
page('/index.html' , '/');
page('/result' , resultView);
page.start();

export function decorateContext(ctx, next) {
    ctx.render = (content) => render(content, root);
    next();
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

