const circles = document.querySelectorAll("circle");

const startingValues = {
    top: -150,
    left: -100,
    opacity: 0.1,
};

let isOpened = true;

const handleOnClick = () => {
    const defaultValues = {
        top: -150,
        left: -100,
        opacity: 0.1,
    };

    if (isOpened) {
        circles.forEach((circle) => {
            circle.style.top = `${defaultValues.top}px`;
            circle.style.left = `${defaultValues.left}px`;
        
            defaultValues.top += 4;
            defaultValues.left += 4;
            isOpened = false;
        });
    } else {
        circles.forEach((circle) => {
            circle.style.top = `${defaultValues.top}px`;
            circle.style.left = `${defaultValues.left}px`;
        
            defaultValues.top += 30;
            defaultValues.left += 30;
            isOpened = true;
        });
    }
}

circles.forEach((circle) => {
    circle.style.top = `${startingValues.top}px`;
    circle.style.left = `${startingValues.left}px`;
    circle.style.opacity = startingValues.opacity;

    startingValues.top += 30;
    startingValues.left += 30;
    startingValues.opacity += .1;

    circle.addEventListener("click", handleOnClick);
});

