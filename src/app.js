import { homeView } from "../views/home.js";
import { resultView } from "../views/result.js";
import { page,render } from "./lib.js";

const root = document.querySelector('body');

page(decorateContext);
page('/index.html' , '/');
page('/' , homeView);
page('/result' , resultView);
page.start();

export function decorateContext(ctx, next) {
    ctx.render = (content) => render(content, root);
    next();
}