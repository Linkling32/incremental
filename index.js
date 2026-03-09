let main_score = 0;
let click_gain = 1;
if (localStorage.getItem("main_score") !== null) {
    main_score = parseFloat(localStorage.getItem("main_score"));
};

if (localStorage.getItem("click_gain") !== null) {
    click_gain = parseFloat(localStorage.getItem("click_gain"));
};
document.getElementById("main_counter").textContent = approx(main_score);
document.getElementById("increment").textContent = `Increment by ${approx(click_gain)}`;

function approx(num) {
    return Math.round((num + Number.EPSILON) * 100) / 100;
};

let research_score = 0;
let research_gain = 1;
if (localStorage.getItem("research_score") !== null) {
    research_score = parseFloat(localStorage.getItem("research_score"));
};
if (localStorage.getItem("research_gain") !== null) {
    research_gain = parseFloat(localStorage.getItem("research_gain"));
};
document.getElementById("research_counter").textContent = approx(research_score);

function actualize_research() {
    if (main_score >= 10000) {
        document.getElementById("convert_research").textContent = `Convert ${approx(main_score)} points into ${approx(((main_score - 9999) ** 0.3) * research_gain)} research`;
    }
    else {
        document.getElementById("convert_research").textContent = `Convert ${approx(main_score)} points into 0 research`;
    };
};

actualize_research()

let prestige_score = 0;
let prestige_gain = 1;
if (localStorage.getItem("prestige_score") !== null) {
    prestige_score = parseFloat(localStorage.getItem("prestige_score"));
};
if (localStorage.getItem("prestige_gain") !== null) {
    prestige_gain = parseFloat(localStorage.getItem("prestige_gain"));
};
document.getElementById("prestige_counter").textContent = approx(prestige_score);

function actualize_prestige() {
    if (main_score >= 1000000) {
        document.getElementById("convert_prestige").textContent = `Convert ${approx(main_score)} points into ${approx(((main_score - 999999) ** 0.15) * prestige_gain)} prestige`;
    }
    else {
        document.getElementById("convert_prestige").textContent = `Convert ${approx(main_score)} points into 0 prestige`;
    };
};

actualize_prestige()

function increment(){
    main_score += click_gain;
    localStorage.setItem("main_score", main_score);
    document.getElementById("main_counter").textContent = approx(main_score);
    actualize_research();
    actualize_prestige();
};

let current_upgrade_1 = 0;
let upgrade_cost_1 = 15;
if (localStorage.getItem("current_upgrade_1") !== null) {
    current_upgrade_1 = parseFloat(localStorage.getItem("current_upgrade_1"));
};
if (localStorage.getItem("upgrade_cost_1") !== null) {
    upgrade_cost_1 = parseFloat(localStorage.getItem("upgrade_cost_1"));
};
if (current_upgrade_1 == 10) {
    document.getElementById("upgrade_cost_1").textContent = `Upgrade maxed!`
}
else {
    document.getElementById("upgrade_cost_1").textContent = `${current_upgrade_1}/10 Next cost: ${approx(upgrade_cost_1)}`;
}

function upgrade_1(){
    if (main_score >= upgrade_cost_1 && current_upgrade_1 < 10) { 
        click_gain *= 1.5;
        localStorage.setItem("click_gain", click_gain);
        document.getElementById("increment").textContent = `Increment by ${approx(click_gain)}`;
        current_upgrade_1 += 1;
        localStorage.setItem("current_upgrade_1", current_upgrade_1);
        main_score -= upgrade_cost_1;
        localStorage.setItem("main_score", main_score);
        document.getElementById("main_counter").textContent = approx(main_score);
        upgrade_cost_1 = 15 * 1.8 ** current_upgrade_1;
        localStorage.setItem("upgrade_cost_1", upgrade_cost_1);
        if (current_upgrade_1 == 10) {
            document.getElementById("upgrade_cost_1").textContent = `Upgrade maxed!`
        }
        else {
            document.getElementById("upgrade_cost_1").textContent = `${current_upgrade_1}/10 Next cost: ${approx(upgrade_cost_1)}`;
        }
        actualize_research()
    };
};

let current_upgrade_2 = 0;
let upgrade_cost_2 = 200;
let autoclicker_delay = 6.4;
if (localStorage.getItem("current_upgrade_2") !== null) {
    current_upgrade_2 = parseFloat(localStorage.getItem("current_upgrade_2"));
};
if (localStorage.getItem("upgrade_cost_2") !== null) {
    upgrade_cost_2 = parseFloat(localStorage.getItem("upgrade_cost_2"));
};
if (localStorage.getItem("autoclicker_delay") !== null) {
    autoclicker_delay = parseFloat(localStorage.getItem("autoclicker_delay"));
    if (autoclicker_delay > 3.2) {
        autoclicker_delay = 3.2
    }
};
if (current_upgrade_2 > 0) {
    document.getElementById("upgrade_2").textContent = "Divide autoclicker delay by 2";
}
if (current_upgrade_2 == 6) {
    document.getElementById("upgrade_cost_2").textContent = `Upgrade maxed!`
}
else {
    document.getElementById("upgrade_cost_2").textContent = `${current_upgrade_2}/6 Next cost: ${approx(upgrade_cost_2)}`;
}
document.getElementById("autoclicker_delay").textContent = `Delay: ${autoclicker_delay}s`;

function upgrade_2(){
    if (main_score >= upgrade_cost_2 && current_upgrade_2 < 6) {
        autoclicker_delay /= 2;
        localStorage.setItem("autoclicker_delay", autoclicker_delay);
        document.getElementById("autoclicker_delay").textContent = `Delay: ${autoclicker_delay}s`;
        current_upgrade_2 += 1;
        localStorage.setItem("current_upgrade_2", current_upgrade_2);
        main_score -= upgrade_cost_2;
        localStorage.setItem("main_score", main_score);
        document.getElementById("main_counter").textContent = approx(main_score);
        upgrade_cost_2 = 1.5 ** current_upgrade_2 * 200;
        localStorage.setItem("upgrade_cost_2", upgrade_cost_2);
        document.getElementById("upgrade_2").textContent = "Divide autoclicker delay by 2";
        if (current_upgrade_2 == 6) {
            document.getElementById("upgrade_cost_2").textContent = `Upgrade maxed!`;
        }
        else {
            document.getElementById("upgrade_cost_2").textContent = `${current_upgrade_2}/6 Next cost: ${approx(upgrade_cost_2)}`;
        }
        actualize_research();
    };
};

function autoclick() {
    if (current_upgrade_2 > 0) {
        increment();
    };
    setTimeout(autoclick, 1000 * autoclicker_delay);
};

autoclick();

function convert_research() {
    if (main_score >= 10000) {
        research_score = approx(research_score + ((main_score - 9999) ** 0.3) * research_gain);
        localStorage.setItem("research_score", research_score);
        document.getElementById("research_counter").textContent = approx(research_score);
        main_score = 0;
        localStorage.setItem("main_score", main_score);
        document.getElementById("main_counter").textContent = 0;
        click_gain = 2 ** current_upgrade_1r;
        if (current_upgrade_1p == 1) {
            click_gain *= research_score**0.15;
        }
        localStorage.setItem("click_gain", click_gain);
        document.getElementById("increment").textContent = `Increment by ${2 ** current_upgrade_1r}`;
        current_upgrade_1 = 0;
        localStorage.setItem("current_upgrade_1", current_upgrade_1);
        upgrade_cost_1 = 15;
        localStorage.setItem("upgrade_cost_1", upgrade_cost_1);
        document.getElementById("upgrade_cost_1").textContent = `0/10 Next cost: 15`;
        current_upgrade_2 = 0;
        localStorage.setItem("current_upgrade_2", current_upgrade_2);
        upgrade_cost_2 = 200;
        localStorage.setItem("upgrade_cost_2", upgrade_cost_2);
        document.getElementById("upgrade_cost_2").textContent = `0/6 Next cost: 200`;
        autoclicker_delay = 6.4;
        localStorage.setItem("autoclicker_delay", autoclicker_delay);
        document.getElementById("autoclicker_delay").textContent = `Delay: 3.2s`;
        actualize_research()
    };
};

let current_upgrade_1r = 0;
let upgrade_cost_1r = 20;
if (localStorage.getItem("current_upgrade_1r") !== null) {
    current_upgrade_1r = parseFloat(localStorage.getItem("current_upgrade_1r"));
};
if (localStorage.getItem("upgrade_cost_1r") !== null) {
    upgrade_cost_1r = parseFloat(localStorage.getItem("upgrade_cost_1r"));
};
if (current_upgrade_1r == 5) {
    document.getElementById("upgrade_cost_1r").textContent = `Upgrade maxed!`
}
else {
    document.getElementById("upgrade_cost_1r").textContent = `${current_upgrade_1r}/5 Next cost: ${approx(upgrade_cost_1r)}`;
}

function upgrade_1r(){
    if (research_score >= upgrade_cost_1r && current_upgrade_1r < 5) {
        click_gain *= 2;
        localStorage.setItem("click_gain", click_gain);
        document.getElementById("increment").textContent = `Increment by ${approx(click_gain)}`;
        current_upgrade_1r += 1;
        localStorage.setItem("current_upgrade_1r", current_upgrade_1r);
        research_score -= upgrade_cost_1r;
        localStorage.setItem("research_score", research_score);
        document.getElementById("research_counter").textContent = approx(research_score);
        upgrade_cost_1r = 20 * (current_upgrade_1r + 1)
        localStorage.setItem("upgrade_cost_1r", upgrade_cost_1r);
        if (current_upgrade_1r == 5) {
            document.getElementById("upgrade_cost_1r").textContent = `Upgrade maxed!`
        }
        else {
            document.getElementById("upgrade_cost_1r").textContent = `${current_upgrade_1r}/5 Next cost: ${approx(upgrade_cost_1r)}`;
        }
        actualize_research()
    };
};

let current_upgrade_2r = 0;
let upgrade_cost_2r = 10;
if (localStorage.getItem("current_upgrade_2r") !== null) {
    current_upgrade_2r = parseFloat(localStorage.getItem("current_upgrade_2r"));
};
if (localStorage.getItem("upgrade_cost_2r") !== null) {
    upgrade_cost_2r = parseFloat(localStorage.getItem("upgrade_cost_2r"));
};
if (current_upgrade_2r == 6) {
    document.getElementById("upgrade_cost_2r").textContent = `Upgrade maxed!`
}
else {
    document.getElementById("upgrade_cost_2r").textContent = `${current_upgrade_2r}/6 Next cost: ${approx(upgrade_cost_2r)}`;
}

function upgrade_2r(){
    if (research_score >= upgrade_cost_2r && current_upgrade_2r < 6) {
        research_gain *= 1.2;
        localStorage.setItem("research_gain", research_gain);
        current_upgrade_2r += 1;
        localStorage.setItem("current_upgrade_2r", current_upgrade_2r);
        research_score -= upgrade_cost_2r;
        localStorage.setItem("research_score", research_score);
        document.getElementById("research_counter").textContent = approx(research_score);
        upgrade_cost_2r = (1.3 ** current_upgrade_2r) * 10;
        localStorage.setItem("upgrade_cost_2r", upgrade_cost_2r);
        if (current_upgrade_2r == 6) {
            document.getElementById("upgrade_cost_2r").textContent = `Upgrade maxed!`;
        }
        else {
            document.getElementById("upgrade_cost_2r").textContent = `${current_upgrade_2r}/6 Next cost: ${approx(upgrade_cost_2r)}`;
        };
        actualize_research();
    };
};

function convert_prestige() {
    if (main_score >= 1000000) {
        prestige_score = approx(prestige_score + ((main_score - 999999) ** 0.15) * prestige_gain);
        localStorage.setItem("prestige_gain", prestige_gain);
        document.getElementById("prestige_counter").textContent = approx(prestige_score);
        main_score = 0;
        localStorage.setItem("main_score", main_score);
        document.getElementById("main_counter").textContent = 0;
        click_gain = 2 ** current_upgrade_1r;
        if (current_upgrade_1p == 1) {
            click_gain *= research_score**0.15;
        }
        localStorage.setItem("click_gain", click_gain);
        document.getElementById("increment").textContent = `Increment by ${2 ** current_upgrade_1r}`;
        current_upgrade_1 = 0;
        localStorage.setItem("current_upgrade_1", current_upgrade_1);
        upgrade_cost_1 = 15;
        localStorage.setItem("upgrade_cost_1", upgrade_cost_1);
        document.getElementById("upgrade_cost_1").textContent = `0/10 Next cost: 15`;
        current_upgrade_2 = 0;
        localStorage.setItem("current_upgrade_2", current_upgrade_2);
        upgrade_cost_2 = 200;
        localStorage.setItem("upgrade_cost_2", upgrade_cost_2);
        document.getElementById("upgrade_cost_2").textContent = `0/6 Next cost: 200`;
        autoclicker_delay = 6.4;
        localStorage.setItem("autoclicker_delay", autoclicker_delay);
        document.getElementById("autoclicker_delay").textContent = `Delay: 3.2s`;
        research_score = 0;
        localStorage.setItem("research_score", research_score);
        actualize_research()
        research_gain = 1;
        localStorage.setItem("research_gain", research_gain);
        current_upgrade_1r = 0;
        localStorage.setItem("current_upgrade_1r", current_upgrade_1r);
        upgrade_cost_1r = 5;
        localStorage.setItem("upgrade_cost_1r", upgrade_cost_1r);
        document.getElementById("upgrade_cost_1r").textContent = `0/5 Next cost: 5`;
        current_upgrade_2r = 0;
        localStorage.setItem("current_upgrade_2r", current_upgrade_2);
        upgrade_cost_2r = 10;
        localStorage.setItem("upgrade_cost_2r", upgrade_cost_2);
        document.getElementById("upgrade_cost_2r").textContent = `0/6 Next cost: 10`;
    };
};

let current_upgrade_1p = 0;
let upgrade_cost_1p = 5;
if (localStorage.getItem("current_upgrade_1p") !== null) {
    current_upgrade_1p = parseFloat(localStorage.getItem("current_upgrade_1p"));
};
if (localStorage.getItem("upgrade_cost_1p") !== null) {
    upgrade_cost_1p = parseFloat(localStorage.getItem("upgrade_cost_1p"));
};
if (current_upgrade_1p == 1) {
    document.getElementById("upgrade_cost_1p").textContent = `Upgrade maxed!`
}
else {
    document.getElementById("upgrade_cost_1p").textContent = `${current_upgrade_1p}/1 Next cost: ${approx(upgrade_cost_1p)}`;
}

function upgrade_1p(){
    if (prestige_score >= upgrade_cost_1p && current_upgrade_1p < 1) {
        click_gain *= research_score**0.15;
        localStorage.setItem("click_gain", click_gain);
        document.getElementById("increment").textContent = `Increment by ${approx(click_gain)}`;
        current_upgrade_1p += 1;
        localStorage.setItem("current_upgrade_1r", current_upgrade_1r);
        prestige_score -= upgrade_cost_1p;
        localStorage.setItem("prestige_score", prestige_score);
        document.getElementById("prestige_counter").textContent = approx(prestige_score);
        if (current_upgrade_1p == 1) {
            document.getElementById("upgrade_cost_1p").textContent = `Upgrade maxed!`
        }
        actualize_prestige()
    };
};

function wipe_all_data() {
    localStorage.clear();
    location.reload();
};


