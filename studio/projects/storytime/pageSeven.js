//Grab all the elements that identify as <circle></circle> from html (pageSeven)
const circles = document.querySelectorAll("circle");

/*
    Define starting values for absolute positioning of the 1st circle.
    The idea here is to decrease the top and left values so that each circle that is placed
    will be going down the page diagonally.
*/
const startingValues = {
    top: -150,
    left: -100,
    opacity: 0.1,
};

//to keep track of whether the circles are expanded or closed.
let isOpened = true;

//Event Listener for clicking the circles.
const handleOnClick = () => {
    /*
        have to reinitialize the default values within the scope of the event handler.
        Because we're basically re-positioning each circle to new top and left values.
    */
    const defaultValues = {
        top: -150,
        left: -100,
    };

    //If the circles are opened (which they are by default) this means the user has clicked on a circle and wants to close them
    if (isOpened === true) {
        circles.forEach((circle) => {
            circle.style.top = `${defaultValues.top}px`;
            circle.style.left = `${defaultValues.left}px`;
        
            //So rather than add top and left by 30, we add by 4 to still have them apart but not by much.
            defaultValues.top += 4;
            defaultValues.left += 4;

            //Lastly we set the isOpened value to false, indicating that they are now closed.
            isOpened = false;
        });
    
    //If the circles are closed, meaning the user now wants them back opened.
    } else {
        circles.forEach((circle) => {
            circle.style.top = `${defaultValues.top}px`;
            circle.style.left = `${defaultValues.left}px`;
        
            //We add 30 again to top and left values
            defaultValues.top += 30;
            defaultValues.left += 30;

            //and set isOpened back to true, indicating they are now opened.
            isOpened = true;
        });
    }
}

//Initially create the expanded circles.
circles.forEach((circle) => {
    circle.style.top = `${startingValues.top}px`; //assign top
    circle.style.left = `${startingValues.left}px`; //assign left
    circle.style.opacity = startingValues.opacity; //assign opacity

    /*
        add 30 to the starting value that way the next values for the next circle will be:
        circles {
            top: -120
            left: -70
            opacity: 0.2
        } 
    */
    startingValues.top += 30;
    startingValues.left += 30;
    startingValues.opacity += .1;

    //Add the event listener to each circle to handle a click event.
    circle.addEventListener("click", handleOnClick);
});

console.log(startingValues);