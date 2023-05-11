var VICTIM_MULTIPLIER = 1.4;
var RESCUE_KIT_MULTIPLIER = 1.6;
var EVAC_LOP_MULTIPLIER = 0.05; // multiplier to be deducted from overall multiplier

// calulates points for whole run
function updatePoints(){
    // update correct multipliers from config area if inputted:
    if (Number(document.getElementById("victim_multiplier").value) != 0) {
        VICTIM_MULTIPLIER = Number(document.getElementById("victim_multiplier").value);
    }
    if (Number(document.getElementById("rescue_kit_multiplier").value) != 0) {
        RESCUE_KIT_MULTIPLIER = Number(document.getElementById("rescue_kit_multiplier").value);
    }
    if (Number(document.getElementById("evac_lop_multiplier").value) != 0) {
        EVAC_LOP_MULTIPLIER = Number(document.getElementById("evac_lop_multiplier").value);
    }

    // calculates points for tiles only
    let sec1_tiles = Number(document.getElementById("sec1_tiles").value);
    let sec2_tiles = Number(document.getElementById("sec2_tiles").value);
    let sec3_tiles = Number(document.getElementById("sec3_tiles").value);
    let sec4_tiles = Number(document.getElementById("sec4_tiles").value);
    let sec5_tiles = Number(document.getElementById("sec5_tiles").value);
    let sec6_tiles = Number(document.getElementById("sec6_tiles").value);
    let sec7_tiles = Number(document.getElementById("sec7_tiles").value);

    let sec1_tries = document.getElementById("sec1_tries").options[document.getElementById("sec1_tries").selectedIndex].value;
    let sec2_tries = document.getElementById("sec2_tries").options[document.getElementById("sec2_tries").selectedIndex].value;
    let sec3_tries = document.getElementById("sec3_tries").options[document.getElementById("sec3_tries").selectedIndex].value;
    let sec4_tries = document.getElementById("sec4_tries").options[document.getElementById("sec4_tries").selectedIndex].value;
    let sec5_tries = document.getElementById("sec5_tries").options[document.getElementById("sec5_tries").selectedIndex].value;
    let sec6_tries = document.getElementById("sec6_tries").options[document.getElementById("sec6_tries").selectedIndex].value;
    let sec7_tries = document.getElementById("sec7_tries").options[document.getElementById("sec7_tries").selectedIndex].value;

    let sec1_points = Math.max((5-(sec1_tries - 1) * 2) * sec1_tiles, 0);
    let sec2_points = Math.max((5-(sec2_tries - 1) * 2) * sec2_tiles, 0);
    let sec3_points = Math.max((5-(sec3_tries - 1) * 2) * sec3_tiles, 0);
    let sec4_points = Math.max((5-(sec4_tries - 1) * 2) * sec4_tiles, 0);
    let sec5_points = Math.max((5-(sec5_tries - 1) * 2) * sec5_tiles, 0);
    let sec6_points = Math.max((5-(sec6_tries - 1) * 2) * sec6_tiles, 0);
    let sec7_points = Math.max((5-(sec7_tries - 1) * 2) * sec7_tiles, 0);


    let points_tiles = sec1_points + sec2_points + sec3_points + sec4_points + sec5_points + sec6_points + sec7_points;
    // calculates points for gaps, speed bumps etc.
    let gaps = Number(document.getElementById("gaps").value);
    let intersections = Number(document.getElementById("intersections").value);
    let speed_bumps = Number(document.getElementById("speed_bumps").value);
    let ramps = Number(document.getElementById("ramps").value);
    let seesaws = Number(document.getElementById("seesaws").value);
    let obstacles = Number(document.getElementById("obstacles").value);
    let victims = Number(document.getElementById("victims").value);
    let rescue_kit = Number(document.getElementById("rescue_kit").value);

    let lops_linefollowing = Number(document.getElementById("lops_linefollowing").value); // Lack of progresses during linefollowing (all LoPs - LoPs_evac)
    let lops_evac = Number(document.getElementById("lops_evac").value); // Lack of progresses right before rescue area (all LoPs - LoPs_linefollowing)

    let points_linefollowing = (gaps*10) + (intersections*10) + (speed_bumps*5) + (ramps*10) + (seesaws*15) + (obstacles*15) // points for gaps, speed bumps, obstacles, intersections etc.

    let multiplier = 1;
    let multiplier_ded_lop_evac = lops_evac * EVAC_LOP_MULTIPLIER;
    if (victims > 0) multiplier = multiplier * Math.pow(VICTIM_MULTIPLIER - multiplier_ded_lop_evac, victims); 
    if (rescue_kit > 0) multiplier = multiplier * (RESCUE_KIT_MULTIPLIER - multiplier_ded_lop_evac);

    let overall_points = points_tiles + points_linefollowing
    if (multiplier > 1) overall_points = overall_points * multiplier;

    // add exit bonus to overall points if 60 - LoPs*5 > 0
    
    if (document.querySelector('#exit_bonus').checked == true) {
        let exit_bonus = 60 - ((lops_linefollowing + lops_evac) * 5);
        if (exit_bonus > 0) overall_points = overall_points + exit_bonus;
    }

    // round float to int
    overall_points = Math.round(overall_points)

    document.getElementById("result").innerHTML = overall_points;

    console.log(multiplier);
}


// update points every 100ms
setInterval(function() {
    updatePoints();
}, 100);

function increment(elem) {
    let field_to_change = elem.slice(0, -10) // cut last 10 chars from elem -> gives id of input field whose content needs do be incremented
    document.getElementById(field_to_change).value = Number(document.getElementById(field_to_change).value) + 1;
}

function decrement(elem) {
    let field_to_change = elem.slice(0, -10) // cut last 10 chars from elem -> gives id of input field whose content needs do be incremented

    // just decrement if value > 0:
    if (Number(document.getElementById(field_to_change).value) == 0) return;
    document.getElementById(field_to_change).value = Number(document.getElementById(field_to_change).value) - 1;
}
