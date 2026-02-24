let main_score = 0;
let click_gain = 1;

function approx(num) {
    return Math.round((num + Number.EPSILON) * 100) / 100
}

function increment(){
    main_score += click_gain;
    document.getElementById("main_counter").textContent = approx(main_score);
};

let current_upgrade_1 = 0;
let upgrade_cost_1 = 15;

function upgrade_1(){
    if (main_score >= upgrade_cost_1 && current_upgrade_1 < 10) { 
        click_gain *= 1.5;
        document.getElementById("increment").textContent = `Increment by ${approx(click_gain)}`;
        current_upgrade_1 += 1;
        main_score -= upgrade_cost_1;
        document.getElementById("main_counter").textContent = approx(main_score);
        upgrade_cost_1 = 15 * 1.8 ** current_upgrade_1;
        if (current_upgrade_1 == 10) {
            document.getElementById("upgrade_cost_1").textContent = `Upgrade maxed!`
        }
        else {
            document.getElementById("upgrade_cost_1").textContent = `${current_upgrade_1}/10 Next cost: ${approx(upgrade_cost_1)}`;
        }
    };
};

let current_upgrade_2 = 0;
let upgrade_cost_2 = 200;
let autoclicker_delay = 6.4;

function upgrade_2(){
    if (main_score >= upgrade_cost_2 && current_upgrade_2 < 6) {
        autoclicker_delay /= 2;
        document.getElementById("autoclicker_delay").textContent = `Delay: ${autoclicker_delay}s`;
        current_upgrade_2 += 1;
        main_score -= upgrade_cost_2;
        document.getElementById("main_counter").textContent = approx(main_score);
        upgrade_cost_2 = 200 * 1.5 * current_upgrade_2;
        document.getElementById("upgrade_2").textContent = "Divide autoclicker delay by 2";
        if (current_upgrade_2 == 6) {
            document.getElementById("upgrade_cost_2").textContent = `Upgrade maxed!`
        }
        else {
            document.getElementById("upgrade_cost_2").textContent = `${current_upgrade_2}/6 Next cost: ${approx(upgrade_cost_2)}`;
        }
    };
};

function autoclick() {
    if (current_upgrade_2 > 0) {
        increment();
    };
    setTimeout(autoclick, 1000 * autoclicker_delay);
};

autoclick();

let research_score = 0;
let research_gain = 1;

function actualize_research() {
    if (main_score >= 10000) {
        document.getElementById("convert_research").textContent = `Convert ${approx(main_score)} points into ${approx(((main_score - 9999) ** 0.3) * research_gain)} research`;
    }
    else {
        document.getElementById("convert_research").textContent = `Convert ${approx(main_score)} points into 0 research`;
    };
};

setInterval(actualize_research,100);

function convert_research() {
    if (main_score >= 10000) {
        research_score = approx(research_score + ((main_score - 9999) ** 0.3) * research_gain);
        document.getElementById("research_counter").textContent = research_score;
        main_score = 0;
        document.getElementById("main_counter").textContent = 0;
        click_gain = 2 ** current_upgrade_1r;
        document.getElementById("increment").textContent = `Increment by ${2 ** current_upgrade_1r}`;
        current_upgrade_1 = 0;
        upgrade_cost_1 = 15;
        document.getElementById("upgrade_cost_1").textContent = `0/10 Next cost: 15`;
        current_upgrade_2 = 0;
        upgrade_cost_2 = 200;
        document.getElementById("upgrade_cost_2").textContent = `0/6 Next cost: 200`;
        autoclicker_delay = 6.4;
        document.getElementById("autoclicker_delay").textContent = `Delay: 3.2s`;
    };
};

let current_upgrade_1r = 0;
let upgrade_cost_1r = 5;

function upgrade_1r(){
    if (research_score >= upgrade_cost_1r && current_upgrade_1r < 5) {
        click_gain *= 2;
        document.getElementById("increment").textContent = `Increment by ${approx(click_gain)}`;
        current_upgrade_1r += 1;
        research_score -= upgrade_cost_1r;
        document.getElementById("research_counter").textContent = approx(research_score);
        upgrade_cost_1r = 10 * (current_upgrade_1r + 1)
        if (current_upgrade_1r == 5) {
            document.getElementById("upgrade_cost_1r").textContent = `Upgrade maxed!`
        }
        else {
            document.getElementById("upgrade_cost_1r").textContent = `${current_upgrade_1r}/5 Next cost: ${approx(upgrade_cost_1r)}`;
        }
    };
};

let current_upgrade_2r = 0;
let upgrade_cost_2r = 10;

function upgrade_2r(){
    if (research_score >= upgrade_cost_2r && current_upgrade_2r < 6) {
        research_gain *= 1.2;
        current_upgrade_2r += 1;
        research_score -= upgrade_cost_2r;
        document.getElementById("research_counter").textContent = approx(research_score);
        upgrade_cost_2r = 10 * (1.5 * (current_upgrade_2r + 1))
        
        if (current_upgrade_1r == 6) {
            document.getElementById("upgrade_cost_2r").textContent = `Upgrade maxed!`
        }
        else {
            document.getElementById("upgrade_cost_2r").textContent = `${current_upgrade_2r}/6 Next cost: ${approx(upgrade_cost_2r)}`;
        }
    };
};

