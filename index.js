window.onload = function () {
    let one = document.getElementById("one");
    let h2 = document.getElementsByTagName("h2");
    let p = document.getElementsByTagName("p");

    //add eventlistener for each h2 element
    let toggler = [];
    for (i = 0; i < (h2.length - 1); i++) {
        toggler.push(true);
        h2[i].addEventListener("click", myFunction.bind(this, i));

        /* console.log("Number H2:" + i);
        console.log(h2[i]); */
    }
    function myFunction(number) {
        if (toggler[number] === true) {
            p[number].style.display = "none";
            p[number].style.visibility = "hidden";
            toggler[number] = false;
            /* console.log("Number: " + number);
            console.log(p[number]); */
        } else {
            p[number].style.display = "block";
            p[number].style.visibility = "visible";
            toggler[number] = true;
            /* console.log("Number: " + number);
            console.log(p[number]); */
        }


    }
}