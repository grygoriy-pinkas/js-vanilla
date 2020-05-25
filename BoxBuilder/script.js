let counter = 0;

const randomColor = () => Math.floor(Math.random() * 16777215).toString(16);

const createBoxes = () => {
    const input = document.getElementsByClassName('js-input')[0];
    const boxes = document.getElementById('boxes');
    const { value } = input;
    input.value = '';
    const limit = Number(value) + Number(counter);

    for (let index = Number(counter); index < limit; index++) {
        const dimention = 30 + index * 10;
        const child = document.createElement('div');
        const style = {
            width: `${dimention}px`,
            height: `${dimention}px`,
            backgroundColor: `#${randomColor()}`
        }
        Object.assign(child.style, style);
        boxes.append(child)
    }
    counter += Number(value);
}

const destroyBoxes = () => {
    const boxes = document.getElementById('boxes');
    boxes.innerHTML = '';
    counter = 0;
}