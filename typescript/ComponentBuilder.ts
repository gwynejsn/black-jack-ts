class ComponentBuilder {
  static buttonBuilder(label: string, classToBeAdded: string[]) {
    classToBeAdded.push('btn');
    const btn = document.createElement('button');
    btn.textContent = label;
    classToBeAdded.forEach((c) => btn.classList.add(c));
    return btn;
  }

  static containerBuilder(
    classToBeAdded: string[] = [],
    ...childToBeAppended: HTMLElement[]
  ) {
    const container = document.createElement('div');
    classToBeAdded.forEach((c) => container.classList.add(c));
    childToBeAppended.forEach((child) => container.appendChild(child));
    return container;
  }

  static imageBuilder(src: string) {
    const image = document.createElement('img');
    image.src = src;
    return image;
  }

  static headerBuilder(
    content: string,
    classToBeAdded: string[] = [],
    size: string = 'h1'
  ) {
    const header = document.createElement(size);
    header.textContent = content;
    classToBeAdded.forEach((c) => header.classList.add(c));
    return header;
  }

  static inputBuilder(
    classToBeAdded: string[],
    label: string | null = null,
    inputPlaceholder: string | null = null,
    labelClassName: string | null
  ) {
    classToBeAdded.push('input');
    const input = document.createElement('input');
    classToBeAdded.forEach((c) => input.classList.add(c));
    if (inputPlaceholder) input.placeholder = inputPlaceholder;
    let labelDiv: HTMLDivElement | null;
    if (label) {
      const inputLabel = this.headerBuilder(label, [labelClassName!], 'h6');
      labelDiv = this.containerBuilder(['input-div'], inputLabel, input);
    } else {
      labelDiv = this.containerBuilder(['input-div'], input);
    }

    return labelDiv;
  }
}

export { ComponentBuilder };
