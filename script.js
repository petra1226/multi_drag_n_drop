// 1. nyerjük a DOM-ból az id-t ahol lesznek a dobozok
const container = document.getElementById('drag-and-drop-app');

// 2. a state lecselérése egy új struktúrára
let state = {
    // új objektum a state-ben
    elemek: {
        "elso": {
            id: "elso",
            x: container.offsetLeft,
            y: container.offsetTop,
        },
        "masodik": {
            id: "masodik",
            x: container.offsetLeft + 20,
            y: container.offsetTop + 150,
        },
        "harmadik": {
            id: "harmadik",
            x: container.offsetLeft + 40,
            y: container.offsetTop + 300,
        }
    },
    // az éppen mozgatott elem id-je
    draggedId: ""
}


window.onload = render();

// 3. a render függvény átírása, hogy az elemeken (amit a state-ben határoztunk meg) végigiterálva jelenítse meg őket
function render() {
    // a kirajzoláshoz inicializálunk egy dobozHTML változót üres string-gel
    let dobozHTML = '';
    // az iteráció során ide ollózzuk be az aktuális elem HTML-jét, majd a végén ezt a változót adjuk át a container innerHTML-jének
    for (const elem of Object.values(state.elemek)) {
        dobozHTML += `
            <div class="box ${state.draggedId === elem.id ? "grabbed" : "not-grabbed"}" style="position: absolute; left: ${elem.x}px; top: ${elem.y}px;" onmousedown="dobozDragStart(window.event)" onmouseup="dobozDragEnd(window.event)" onmousemove="dobozMouseMove(window.event)" data-egyedi-azonosito=${elem.id}>
            <!-- a Data attribútumnak beírjuk az adott elem egyedi azonosítóját, hogy későb meg tudjuk állapítani, hogy melyik dobozra történt mousedown esemény -->
                <div class="card-body">
                    <h5 class="card-title display-4">${elem.id}</h5>
                </div>
            </div>
        `;
    }

    // a container innerHTML-jét állítjuk be a dobozHTML-re
    container.innerHTML = dobozHTML;
}

// 4. a dobozDragStart, dobozDragEnd és dobozMouseMove függvények átírása, hogy a state-ben tárolt értékeket módosítsák
function dobozDragStart(event) {
    const box = event.target.closest('.box');
    state.draggedId = box.dataset.egyediAzonosito;
    render();
}

// 5. a dobozDragEnd függvényben a draggedId-t null-ra állítjuk, hogy ne legyen éppen mozgatott elem
function dobozDragEnd() {
    state.draggedId = null;
    render();
}

// 6. a dobozMouseMove függvényben a state-ben tárolt értékeket módosítjuk az egér pozíciója alapján
function dobozMouseMove(event) {
    // ha nincs éppen mozgatott elem, akkor nem csinálunk semmit
    if (!state.draggedId) {
        return;
    }

    // ha nincs éppen mozgatott elem, akkor nem csinálunk semmit
    const box = event.target.closest('.box');
    if (!box) {
        return;  
    }

    // a state-ben tárolt értékeket módosítjuk az egér pozíciója alapján
    state.elemek[state.draggedId].x = document.documentElement.scrollLeft + event.clientX - box.offsetWidth / 2;
    state.elemek[state.draggedId].y = document.documentElement.scrollTop + event.clientY - box.offsetHeight / 2;

    // logoljuk a state-t táblázatos formában
    console.table(state.elemek);
    render();
}