import { UISTATE } from "@/game_state/ui/state";


function uiHtmlComponents() {
    const place: HTMLElement = document.querySelector("#ui-place");
    const ui = UI(place);
    scoreBoard(ui);
}
function UI(parent: HTMLElement) {
    const ui = document.createElement("div");
    ui.classList.add("html-ui");
    parent.appendChild(ui);
    return ui;
}
function scoreBoard(parent: HTMLElement) {
    const ui = document.createElement("div");
    ui.classList.add("scoreboard");
    ui.classList.add("hide");
    parent.appendChild(ui);

    const points = containerUI(ui);
    const timer = containerUI(ui);

    iconUI(points, "public/icons/score.png");
    iconUI(timer, "public/icons/timer.png");
    UISTATE.Scoreboard.score = numberUI(points, 'score-ui');
    UISTATE.Scoreboard.timer = numberUI(timer, 'timer-ui');
}
function containerUI(parent: HTMLElement) {
    const ui = document.createElement("div");
    ui.classList.add("container-ui");
    parent.appendChild(ui);
    return ui;
}
function iconUI(parent: HTMLElement, pathToIcon: string) {
    const ui = document.createElement("div");
    ui.classList.add("icon-ui");
    parent.appendChild(ui);
    const icon = new Image();
    icon.src = pathToIcon;
    icon.onload = () => {
        icon.classList.add("icon")
        ui.appendChild(icon);
    }
    return ui;
}
function numberUI(parent: HTMLElement, class_name: string) {
    const ui = document.createElement("span");
    ui.classList.add(class_name);
    ui.innerText = "0000";
    parent.appendChild(ui);
    return ui;
}
export function redrawResult(isWin: boolean, score: number) {
    const win: HTMLImageElement = document.querySelector(".result-win");
    const resultScore = document.querySelector(".result-score");
    isWin ?
        win.src = "public/icons/crown.png" :
        win.src = "public/icons/close.png";
    resultScore.textContent = `${score}`.padStart(4, '0');
}
export function showResult(isShow: boolean) {
    const element = document.querySelector(".result-place");
    isShow ? element.classList.remove("hide") : element.classList.add("hide");
}
export function showDescription(isShow: boolean) {
    const element = document.querySelector(".level-description");
    isShow ? element.classList.remove("hide") : element.classList.add("hide");
}
//----------------------------------------------->
uiHtmlComponents();

