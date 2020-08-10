//All the variable are set to their intial values

let items = [];
let cost = 0;
let moneyin = 0;
let change = 0;
let hold = 0;
let wallet = 50;

//Makes it so that if you do not have enough funds it will hide the money you cannot spend else it will show them

function money_update() {
    document.getElementById("moneyinside").innerHTML = moneyin;
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

//When the function is run it changes the div to have the same value of items[]

function cart_update() {
    document.getElementById("itemsinside").innerHTML = items;
}


//WILL BE REMOVED

function clicked(key) {
    if (key == 1) {
        items.push("Ash Head Hitbox");
        cost += 3;
        cart_update()
    }
    if (key == 2) {
        items.push("FaZe Membership");
        cost += 3;
        cart_update()
    }
    if (key == 3) {
        items.push("2 Hour Xbox Live Voucher");
        cost += 3;
        cart_update()
    }
    if (key == 4) {
        items.push("Mountain Dew");
        cost += 3;
        cart_update()
    }
    if (key == 5) {
        items.push("360 nO sKoPe");
        cost += 3;
        cart_update()
    }
    if (key == 6) {
        items.push("Jager ACOG");
        cost += 3;
        cart_update()
    }
    if (key == 7) {
        items.push("Doritos");
        cost += 3;
        cart_update()
    }
    if (key == 8) {
        items.push("Gamer Chair");
        cost += 3;
        cart_update()
    }
    if (key == "clear") {
        items = [];
        cost = 0;
        cart_update()




    }


}

//Checks if there is anything in your chart and if there is it checks if you have enough money to pay to finalise the payment

function money(put) {
    if (put == "pay") {

        if (items.length == 0) {
            alert("No items were selected and you were refunded $" + moneyin);
            wallet += moneyin;
            moneyin = 0;
            money_update()

        }
        else {
            if (moneyin >= cost) {
                if (moneyin - cost == 0) {
                    alert("You recieved " + items + " with zero change");
                    wallet += change;
                    moneyin = 0;
                    items = [];
                    cost = 0;
                    money_update()
                    cart_update()
                }
                if (moneyin - cost != 0) {
                    change = moneyin - cost;
                    wallet += change;
                    change = parseFloat(change.toFixed(2))
                    alert("You recieved " + items + " with " + change + " change");
                    moneyin = 0;
                    items = [];
                    cost = 0;
                    money_update()
                    cart_update()
                }
            }
            if (moneyin < cost) {
                change = cost - moneyin;
                change = parseFloat(change.toFixed(2))
                alert("You need " + change + " more money");
            }
        }
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
    moneyin = parseFloat(moneyin.toFixed(2));
    money_update()


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
    if (password != "password") {
        alert("OI!");
    }
    //If sucessful changes the admin menu's class to make it visible
    if (password == "password") {
        alert("Welcome");
        document.getElementById("admin-ui").classList.toggle("admin-display");
    }

}
//Used to close the admin menu
function lock() {

    document.getElementById("admin-ui").classList.toggle("admin-display");
    document.getElementById("ui-info-container-1").classList.toggle("ui-info-container-close");




}