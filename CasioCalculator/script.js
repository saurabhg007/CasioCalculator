    let koko = "koko"
    let negated = "negated"
    let a, b, c, operator, d, e = 0, f = "", solved;
    a = koko;
    b = koko;
    c = koko;
    operator = koko;
    let backready;

    let inputScrn = document.getElementById("input")
    let answerScrn = document.getElementById("answer")
    let numbers = document.getElementsByClassName("numbers")
    let operators = document.getElementsByClassName("operators")
    let backspace = document.getElementById("backspace")

    function changescrn(state) {
        solved = state;
        if (solved == true) {
            inputScrn.classList.add("inactive")
        } else {
            inputScrn.classList.remove("inactive")
        }
    }

    function display(me) {
        let text = document.createTextNode(me)
        inputScrn.appendChild(text)
    }

    function clrDisplay(me) {
        inputScrn.innerHTML = ""
        let text = document.createTextNode(me)
        inputScrn.appendChild(text)
    }

    function clearAll() {
        changescrn(false)
        a = koko;
        b = koko;
        c = koko;
        operator = koko;
        inputScrn.innerHTML = ""
        answerScrn.innerHTML = "0"
    }

    function calc() {
        changescrn(true)
        c = koko
        backready = true
        if (operator != koko && (b != koko && b != negated)) {
            switch (operator) {
                case "plus":
                    d = (a * 1) + (b * 1);
                    break;
                case "minus":
                    d = (a * 1) - (b * 1);
                    break;
                case "times":
                    d = (a * 1) * (b * 1);
                    break;
                case "divide":
                    d = (a * 1) / (b * 1);
                    break;
                default:
                    break;
            }
        } else {
            d = a * 1
        }
        if (a != koko) {
            let g = d.toString()
            if (g.length > 12) {
                let h = Math.round(d).toString()
                if (h.length > 12) {
                    d = d.toExponential(10)
                    answerScrn.innerHTML = `= ${d}`
                }else{
                    d = Math.round(d * 1000000000000) / 1000000000000
                    answerScrn.innerHTML = `= ${d}`
                }
            } else {
                answerScrn.innerHTML = `= ${d}`
            }
        }
    }

    for (let x = 0; x < numbers.length; x++) {
        const el = numbers[x];
        el.onclick = () => {
            changescrn(false)
            if (operator == koko && (a == koko || a == negated)) {
                if (a == koko) {
                    a = el.id
                    display(a)
                } else if (a == negated) {
                    a = el.id * -1
                    display(a * -1)
                }
            } else if ((a != koko && a != negated) && operator == koko) {
                let g = a.toString()
                if (g.length <= 12) {
                    a = a + el.id
                    clrDisplay(a)
                }

                // console.log(a)
            }
            if ((a != koko && a != negated) && operator != koko) {
                if (b == koko) {
                    b = el.id
                    display(b)
                } else if (b == negated) {
                    b = el.id * -1
                    display(b * -1)
                } else {
                    let g = b.toString()
                    if (g.length <= 12) {
                        b = b + el.id
                        if (c != koko) {
                            clrDisplay(a + c + b)
                        } else {
                            clrDisplay(a + f + b)
                        }
                    }
                }
            }
        }
    }

    for (let x = 0; x < operators.length; x++) {
        const el = operators[x];
        el.onclick = () => {
            changescrn(false)
            switch (el.id) {
                case "plus":
                    if ((a != koko && a != negated)) {
                        c = " + "
                        clrDisplay(a + c)
                    }
                    break;
                case "minus":
                    f = "-"
                    if (a == koko) {
                        clrDisplay(f)
                    } else if ((b == negated || b == koko) && (a != koko && a != negated)) {
                        if (c != koko && b == koko) {
                            clrDisplay(a + c + f)
                        } else if (b == negated) {
                            clrDisplay(a + f)
                            c = koko
                        } else {
                            display(f)
                        }
                    } else {
                        clrDisplay("")
                    }
                    break;
                case "times":
                    if ((a != koko && a != negated)) {
                        c = " * "
                        clrDisplay(a + c)
                    }
                    break;
                case "divide":
                    if ((a != koko && a != negated)) {
                        c = " / "
                        clrDisplay(a + c)
                    }
                    break;
                default:
                    break;
            }

            if ((a != koko && a != negated) && (b != koko && b != negated) && operator != koko) {
                switch (operator) {
                    case "plus":
                        a = (a * 1) + (b * 1);
                        b = koko;
                        break;
                    case "minus":
                        a = (a * 1) - (b * 1);
                        b = koko;
                        break;
                    case "times":
                        a = (a * 1) * (b * 1);
                        b = koko;
                        break;
                    case "divide":
                        a = (a * 1) / (b * 1);
                        b = koko;
                        break;
                    default:
                        break;
                }
                if (el.id == "minus") {
                    clrDisplay(a + f)
                } else {
                    clrDisplay(a + c)
                }
                // operator = koko
            } else if ((a != koko && a != negated) && b == koko && operator != koko) {
                if (el.id == "minus") {
                    b = negated
                }
            } else if ((a != koko && a != negated) && b == negated && operator != koko) {
                if (el.id == "minus") {
                    b = koko
                    if (operator != "minus") {
                        clrDisplay(a + f)
                    }
                }
            }

            if (a == koko && operator == koko) {
                if (el.id == "minus") {
                    a = negated
                }
            } else if (a == negated && operator == koko) {
                a = koko
            }
            if ((a != koko && a != negated) && b == koko) {
                // c = a
                operator = el.id
            }
        }
    }

    backspace.onclick = () => {
        changescrn(false)

        if ((a != koko && a != negated) && (b == koko || b == negated) && operator == koko) {
            a = a.toString()
            a = a.slice(0, -1)
            if (a != "") {
                clrDisplay(a)
            } else {
                clrDisplay("")
                a = koko
            }
        } else if ((a == koko || a == negated) && operator == koko) {
            let g = inputScrn.innerText
            g = g.toString()
            g = g.slice(0, -1)
            clrDisplay(g)
            if (a == negated) {
                a = koko
            }
        } else if ((a != koko && a != negated) && operator != koko && (c != koko || f != "" || backready == true) && (b == koko || b == negated)) {
            let g = inputScrn.innerText
            g = g.toString()
            g = g.slice(0, -1)
            clrDisplay(g)
            if (c != koko && b != negated) {
                c = koko
                operator = koko
            }
            if (b != negated) {
                operator = koko
            }
            if (b == negated) {
                b = koko
            }
            if (backready == true) {
                backready = false
                operator = koko
            }
        } else if (b != koko && b != negated) {
            b = b.toString()
            b = b.slice(0, -1)
            let g = inputScrn.innerText
            g = g.toString()
            g = g.slice(0, -1)
            if (b != "") {
                clrDisplay(g)
            } else {
                clrDisplay(g)
                b = koko
            }
        }
    }