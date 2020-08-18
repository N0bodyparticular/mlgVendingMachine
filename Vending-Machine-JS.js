let items = []; // stores the items in the machine, it's populated later.
let items_table_reset_text = ''; // Text to fill the item table with. Generated procedually later on.
let items_name_map = new Map([
    [420, 'Mountain Dew'],
    [696, 'Doritos'],
    [001, 'Ash\'s head hitbox'],
    [760, 'AimBot'],
    [360, 'No Skope'],
    [720, 'FaZe Membership'],
    [785, 'Obnoxious Xbox Gamertag'],
    [666, '24 hour Xbox Live Voucher'],
    [000, 'testingitem']
]); // Stores the items' names and codes for a mapping to text display names.
let items_imagepath_map = new Map([
    [420, 'dew.jpg'],
    [696, 'doritos.png'],
    [001, 'ash.png'],
    [760, 'e.png'],
    [360, 'noskope.webp'],
    [720, 'faze.png'],
    [785, 'tag.png'],
    [666, 'voucher.png'],
    [000, 'testingitem']
]); // Stores the items' names and image urls for a mapping to display images.
let currentCode = ''; // Currently entered code in machine.
let wallet = 12; // Money in wallet
let currentMachineMoney = 1; // Money in machine.
let currentItemsString = "";
let isFirstItem = true; // Is first item out from machine?

function getCurrentMoney() {
    return currentMachineMoney;
}// Gets current amount of money in the machine.

function setCurrentMoney(newMoney) {
    currentMachineMoney = newMoney;
} // Sets the amount of money in the machine.

function getItemEntryFromList(code) {
    let val = null;
    console.log(parseInt(code));
    for (let j = 0; j < items.length; j++) { // Find the item.
        console.log(items[j]);
        if (items[j].id == parseInt(code)) {
            val = items[j];
        }
    }
    return val;
}

function getItemFromCode(code) {
    // Handle getting item from machine with this function.
    if (code.length > 3) { // Check if code is too long
        console.log("Error: item code was too long!");
        return null;
    }
    if (code.length < 3) { // Check if code is too short.
        console.log("Error: item code was too short!");
        return null;
    }
    console.log("Checkout item #" + code);

    let item = getItemEntryFromList(code);

    // Check if item purchace is valid/allowed
    if (item == null) { // Check if item can be found.
        console.log("Error: Failed to find item #" + code);
        return null;
    }

    if (item.count <= 0) { // Check if there are some left.
        console.log("No items remaining.");
        return null;
    }

    if (getCurrentMoney() < item.cost) { // Check if user has enough money.
        console.log("Not enough money. Add more.");
        return null;
    }

    setCurrentMoney(getCurrentMoney() - item.cost); // Decrement user's money in the machine by the cost of the item.
    item.count--;

    console.log("Selected: " + items_name_map.get(parseInt(code)));
    console.log("User now owns item.");

    if (isFirstItem == true) {
        isFirstItem = false;
    } else {
        currentItemsString = currentItemsString + ", ";
    }
    currentItemsString = currentItemsString + items_name_map.get(parseInt(code));

    document.getElementById("inventory-items").innerHTML = currentItemsString; // Change display items names.

    var img = document.createElement("img");
    img.src = items_imagepath_map.get(parseInt(code));
    document.getElementById("inventory-display").appendChild(img); // Add the image.

    money_update();
    return items_name_map.get(parseInt(code));
}

function generate_item(item_cost, item_id, item_count) {
    let temp = {};
    temp.cost = item_cost;
    temp.id = item_id;
    temp.count = item_count;
    return temp; // Generate an item with the values and retrun it so it can be added to the data.
}

function update_items_table() {
    /*
     * let items_table = document.getElementById("items-table");

    items_table.innerHTML = items_table_reset_text;
    for (let item_idx = 0; item_idx < items.length; item_idx = item_idx + 1) {
        let build_string = "<tr><td>" + items_name_map.get(items[item_idx].id) + "</td><td>$" + items[item_idx].cost + "</td><td>" + items[item_idx].count + "</td></tr>";
        items_table.innerHTML = items_table.innerHTML + build_string;
    }

    console.log("Updated items table html:");
    console.log(items_table.innerHTML);
    */
    console.log("update_items_table is deprecated");
}

function init_machine() {
    items = []; // generate the items in the inventory 
    items.push(generate_item(2.50, 420, 10));
    items.push(generate_item(1.20, 696, 10));
    items.push(generate_item(50.00, 001, 10));
    items.push(generate_item(15.00, 760, 10));
    items.push(generate_item(36.00, 360, 10));
    items.push(generate_item(10.00, 720, 10));
    items.push(generate_item(18.00, 785, 10));
    items.push(generate_item(3.00, 666, 10));

    //items_table_reset_text = document.getElementById("items-table").innerHTML;
    //update_items_table();
}

function press_button_handle(key) {
    console.log(key + " was pressed.");
    switch (key) {
        case '1':
            currentCode += "1";
            break;

        case '2':
            currentCode += "2";
            break;

        case '3':
            currentCode += "3";
            break;

        case '4':
            currentCode += "4";
            break;

        case '5':
            currentCode += "5";
            break;

        case '6':
            currentCode += "6";
            break;

        case '7':
            currentCode += "7";
            break;

        case '8':
            currentCode += "8";
            break;

        case '9':
            currentCode += "9";
            break;

        case '#':
            currentCode = "";
            break;

        case '0':
            currentCode += "0";
            break;

        case '*':
            getItemFromCode(currentCode);
            break;
    }

    document.getElementById("codeDisplay").innerText = currentCode.padStart(3, '0'); // update the code display
    money_update();
}


init_machine(); // Setup everything.


//Makes it so that if you do not have enough funds it will hide the money you cannot spend else it will show them
function money_update() {
    document.getElementById("money-display").innerText = "$" + getCurrentMoney().toFixed(2);
    //document.getElementById("moneyinside").innerHTML = moneyin;
    if (wallet < 5) {
        document.getElementById("money_5").style.visibility = "hidden";
        if (wallet < 2) {
            document.getElementById("money_2").style.visibility = "hidden";
            if (wallet < 1) {
                document.getElementById("money_1").style.visibility = "hidden";
                if (wallet < 0.5) {
                    document.getElementById("money_50").style.visibility = "hidden";
                    if (wallet < 0.2) {
                        document.getElementById("money_20").style.visibility = "hidden";
                    }
                }
            }

        }
    }
    else {
        document.getElementById("money_5").style.visibility = "visible";
        document.getElementById("money_2").style.visibility = "visible";
        document.getElementById("money_1").style.visibility = "visible";
        document.getElementById("money_50").style.visibility = "visible";
        document.getElementById("money_20").style.visibility = "visible";
    }
}

//Allows for dragging
function allowDrop(ev) {
    ev.preventDefault();
}

//Checks if the element being moved is text and if it is the value is 0
function drag(ev, mon) {
    if (mon != "text") {
        hold = mon;
    }
    else {
        hold = 0;
    }

}

//Adds the value of the money being dropped into the slot
function drop_slot(ev) {
    ev.preventDefault();
    moneyin += hold;
    wallet -= hold;
    money_update();
    setCurrentMoney(getCurrentMoney() + parseFloat(hold.toFixed(2))); // Increase money amount.
    money_update();
}

//Toggles the class switch on the wallet to make it change size
function transition() {
    document.getElementById("money-container").classList.toggle("switch");
}

//Requests a password for the admin menu
function unlock() {
    password = prompt("Insert password: ");
    //If the prompt is empty when submitted or if you cancel it doesn't alert the user anything
    if (password == "" || password == null) {
        return;
    }
    //For failed attempts

    //If sucessful changes the admin menu's class to make it visible
    if (Sha256.hash(password) == "b9c506adc8d5313abb3f2ba29e5d471685784ec74b628f5855743c3c2ed9f01e") {
        //alert("Welcome");
        document.getElementById("admin-ui").classList.toggle("admin-display");
    } else {
        alert("OI! Wrong password!");
    }

}
//Used to close the admin menu
function lock() {
    document.getElementById("admin-ui").classList.toggle("admin-display");
    document.getElementById("ui-info-container-1").classList.toggle("ui-info-container-close");
}