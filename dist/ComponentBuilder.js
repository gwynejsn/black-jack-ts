class ComponentBuilder {
    static buttonBuilder(label, classToBeAdded) {
        classToBeAdded.push('btn');
        const btn = document.createElement('button');
        btn.textContent = label;
        classToBeAdded.forEach((c) => btn.classList.add(c));
        return btn;
    }
    static containerBuilder(classToBeAdded = [], ...childToBeAppended) {
        const container = document.createElement('div');
        classToBeAdded.forEach((c) => container.classList.add(c));
        childToBeAppended.forEach((child) => container.appendChild(child));
        return container;
    }
    static imageBuilder(src, classToBeAdded = []) {
        const image = document.createElement('img');
        classToBeAdded.forEach((c) => image.classList.add(c));
        image.src = src;
        return image;
    }
    static headerBuilder(content, classToBeAdded = [], size = 'h1') {
        const header = document.createElement(size);
        header.textContent = content;
        classToBeAdded.forEach((c) => header.classList.add(c));
        return header;
    }
    static inputBuilder(classToBeAdded, label = null, inputPlaceholder = null, labelClassName) {
        classToBeAdded.push('input');
        const input = document.createElement('input');
        classToBeAdded.forEach((c) => input.classList.add(c));
        if (inputPlaceholder)
            input.placeholder = inputPlaceholder;
        let labelDiv;
        if (label) {
            const inputLabel = this.headerBuilder(label, [labelClassName], 'h6');
            labelDiv = this.containerBuilder(['input-div'], inputLabel, input);
        }
        else {
            labelDiv = this.containerBuilder(['input-div'], input);
        }
        return labelDiv;
    }
}
export { ComponentBuilder };
