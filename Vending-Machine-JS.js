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
    [420, 'dew.png'],
    [696, 'doritos.png'],
    [001, 'ash.png'],
    [760, 'e.png'],
    [360, 'noskope.png'],
    [720, 'faze.png'],
    [785, 'tag.png'],
    [666, 'voucher.png'],
    [000, 'testingitem']
]); // Stores the items' names and image urls for a mapping to display images.
let currentCode = ''; // Currently entered code in machine.
let wallet = 40; // Money in wallet
let currentMachineMoney = 0.0; // Money in machine.
let currentItemsString = "";
let isFirstItem = true; // Is first item out from machine?
let totalMoneyIn = 0;

// Gets user's money in machine.
function getCurrentMoney() {
    return currentMachineMoney;
}// Gets current amount of money in the machine.

// Sets user's money in machine.
function setCurrentMoney(newMoney) {
    currentMachineMoney = newMoney;
} // Sets the amount of money in the machine.

// Gets ref to the item corresponding to code.
function getItemEntryFromList(code) {
    let val = null;
    for (let j = 0; j < items.length; j++) { // Find the item.        
        if (items[j].id == parseInt(code)) { // Check if correct number.
            val = items[j];
        }
    }
    return val;
}

// Buys item with user's money.
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
        alert("Error: Failed to find item #" + code)
        return null;
    }

    if (item.count <= 0) { // Check if there are some left.
        console.log("No items remaining.");
        alert("No items of this type remain!");
        return null;
    }

    if (getCurrentMoney() < item.cost) { // Check if user has enough money.
        console.log("Not enough money. Add more.");
        alert("Not enough money. Add more.");
        return null;
    }

    setCurrentMoney(getCurrentMoney() - item.cost); // Decrement user's money in the machine by the cost of the item.
    item.count--;

    console.log("Selected: " + items_name_map.get(parseInt(code)));
    console.log("User now owns item.");
    alert("You now have " + items_name_map.get(parseInt(code)));

    if (isFirstItem == true) {
        isFirstItem = false;
    } else {
        currentItemsString = currentItemsString + ", ";
    }
    currentItemsString = currentItemsString + items_name_map.get(parseInt(code));

    document.getElementById("inventory-items").innerHTML = currentItemsString; // Change display items names.

    var img = document.createElement("img");
    img.src = items_imagepath_map.get(parseInt(code));
    img.className = "item-display-image";
    document.getElementById("inventory-display").appendChild(img); // Add the image.

    money_update();
    return items_name_map.get(parseInt(code));
}

// Makes an item entry, holds the cost, id and number of the said item.
function generate_item(item_cost, item_id, item_count) {
    let temp = {};
    temp.cost = item_cost;
    temp.id = item_id;
    temp.count = item_count;
    return temp; // Generate an item with the values and retrun it so it can be added to the data.
}

// Setup the machine first-time.
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
}

// Manages the keypad presses.
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
            wallet += currentMachineMoney;
            totalMoneyIn -= currentMachineMoney;
            currentMachineMoney = 0;
            money_update();
            break;

        case '0':
            currentCode += "0";
            break;

        case '*':
            getItemFromCode(currentCode);
            break;
    }

    // Update some on-key-press changes.
    document.getElementById("codeDisplay").innerText = (currentCode.padStart(3, '0')).substring(0,3); // update the code display
    money_update();
}

//Makes it so that if you do not have enough funds it will hide the money you cannot spend else it will show them
function money_update() {
    /* 
     * Changes the visibility of money depending on what 
     * amount of money is left in the wallet.
     */
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

    if (hold != null) { // Check if it contains real value
        /*
         * Once upon a time, there was an issue where  the user
         * could drag one type of money into the machine, then
         * select text or an image, then drag that in instead of
         * money. It would be interpreted as dragging the money 
         * that was previously added again. 
         * 
         * I fixed it by changing hold (contains the currently
         * held value of money) to null as soon as the drag was 
         * finished. When checking for the dragged money amount, 
         * it also is now checked for null because if it is null, 
         * a proper piece of money wasn't dragged.
         */
        moneyin += hold;
        wallet -= hold;
        money_update();
        setCurrentMoney(getCurrentMoney() + parseFloat(hold.toFixed(2))); // Increase money amount.
        totalMoneyIn += hold;
    }
    hold = null;
    money_update();
}

//Toggles the class switch on the wallet to make it change size
function transition() {
    document.getElementById("money-container").classList.toggle("switch");
}

//Requests a password for the admin menu
function unlock() {
    document.getElementById("password-area").hidden = !document.getElementById("password-area").hidden;
    document.getElementById("wrong-password").hidden = true;
}

// Checks if password is valid, handles unlocking the admin section.
function checkPassword() {
    let password = document.getElementById("password-enter").value;
    //If the prompt is empty when submitted or if you cancel it doesn't alert the user anything
    if (password == "" || password == null) { // Check if valid.
        console.log("Invalid password was entered.");
        document.getElementById("wrong-password").hidden = false;
        setTimeout(hidePasswordEnter, 1000);
        return 0;
    }

    // If sucessful changes the admin menu's class to make it visible
    if (Sha256.hash(password) == "b9c506adc8d5313abb3f2ba29e5d471685784ec74b628f5855743c3c2ed9f01e") { // Check if hashes match, better than hiding pwd in plaintext.
        //alert("Welcome");
        console.log("Correct password was enetered.")
        document.getElementById("admin-ui").classList.toggle("admin-display");
        hidePasswordEnter();
        return 1;
    }

    console.log("Wrong password was submitted."); // Fallback for fail.
    document.getElementById("wrong-password").hidden = false;
    setTimeout(hidePasswordEnter, 1000);
    return 0;
}

// Hides password enter stuff.
function hidePasswordEnter() {
    document.getElementById("wrong-password").hidden = true;
    document.getElementById("password-area").hidden = true;
}

//Used to close the admin menu
function lock() {
    document.getElementById("admin-ui").classList.toggle("admin-display");
    document.getElementById("ui-info-container-1").classList.toggle("ui-info-container-close");
    hidePasswordEnter();
}

// Changes the stock item respective to currentCode by amount.
function changeStock(amount) {
    let change_item = getItemEntryFromList(currentCode);

    if ((change_item.count + amount) >= 0) { // Cant have negative items.
        change_item.count += amount;
    }

    console.log("Changed item " + items_name_map.get(parseInt(currentCode)) + " by " + amount);
}

// Updates the restock menu counter and names.
function update_restock() {
    let name = "None";
    document.getElementById("item-counter").innerText = "N/A"; // Defalt fallbacks for when nothing's selected.
    document.getElementById("restock-name").innerText = name;

    if (items_name_map.has(parseInt(currentCode))) { // Is the selected item valid?
        name = items_name_map.get(parseInt(currentCode));
        document.getElementById("restock-name").innerText = name;

        if (getItemEntryFromList(currentCode) != null) { // Null check.
            document.getElementById("item-counter").innerText = '' + getItemEntryFromList(currentCode).count;
        }
    }
}

// Handles returning money from machine to the operator
function money_return() {
    if (totalMoneyIn <= 0) { // Is there money to take?
        alert("There was no money in the machine.");
    } else { // Geive back money.
        alert("You took $" + totalMoneyIn.toFixed(2) + " from the machine.");
        totalMoneyIn = 0;
    }
}

init_machine(); // Setup everything.
setInterval(update_restock, 250);