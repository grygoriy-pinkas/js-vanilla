class StringBuilder {
    constructor(baseString = '') {
        this.value = baseString;
    }

    append = (str) => {
        this.value = `${this.value}${str}`
        return this;
    }
    prepend = (str) => {
        this.value = `${str}${this.value}`
        return this;
    }
    pad = (str) => {
        this.append(str);
        this.prepend(str)
        return this;
    }
    toString() {
        return `${this.value}`;
    }
}


const builder = new StringBuilder('.');
builder
    .append('^')
    .prepend('^')
    .pad('=');

console.log(builder.value);

// Поведінка яка зазначена в ТЗ можлива при використанні alert(builder)
// Переписування стандартних методів - антипаттерн
// Потрібна поведінка можлива при викристанні проперті класу або геттера
