const Option1 = Object.freeze({
    A: Symbol('A'),
    B: Symbol('B'),
    C: Symbol('C')
});
const Option2 = Object.freeze({
    D: Symbol('D'),
    E: Symbol('E')
});
const Option3 = Object.freeze({
    F: Symbol('F'),
    G: Symbol('G'),
    H: Symbol('H')
});

class CombinatorialSmeller {
    #x1;
    #x2;
    #x3;
    constructor(x1, x2, x3) {
        this.#x1 = x1;
        this.#x2 = x2;
        this.#x3 = x3;
    }
 
    doSomething() {
        let result = "O-O-O";
        if (this.#x1 === Option1.A) {
            if (this.#x2 === Option2.D) {
                if (this.#x3 === Option3.F) {
                    result = "A-D-F";
                } else if (this.#x3 === Option3.G) {
                    result = "A-D-G";
                } else if (this.#x3 === Option3.H) {
                    result = "A-D-H";
                }
            } else if (this.#x2 === Option2.E) {
                if (this.#x3 === Option3.F) {
                    result = "A-E-F";
                } else if (this.#x3 === Option3.G) {
                    result = "A-E-G";
                } else if (this.#x3 === Option3.H) {
                    result = "A-E-H";
                }
            }
        } else if (this.#x1 === Option1.B) {
            if (this.#x2 === Option2.D) {
                if (this.#x3 === Option3.F) {
                    result = "B-D-F";
                } else if (this.#x3 === Option3.G) {
                    result = "B-D-G";
                } else if (this.#x3 === Option3.H) {
                    result = "B-D-H";
                }
            } else if (this.#x2 === Option2.E) {
                if (this.#x3 === Option3.F) {
                    result = "B-E-F";
                } else if (this.#x3 === Option3.G) {
                    result = "B-E-G";
                } else if (this.#x3 === Option3.H) {
                    result = "B-E-H";
                }
            }
        } else if (this.#x1 === Option1.C) {
            if (this.#x2 === Option2.D) {
                if (this.#x3 === Option3.F) {
                    result = "C-D-F";
                } else if (this.#x3 === Option3.G) {
                    result = "C-D-G";
                } else if (this.#x3 === Option3.H) {
                    result = "C-D-H";
                }
            } else if (this.#x2 === Option2.E) {
                if (this.#x3 === Option3.F) {
                    result = "C-E-F";
                } else if (this.#x3 === Option3.G) {
                    result = "C-E-G";
                } else if (this.#x3 === Option3.H) {
                    result = "C-E-H";
                }
            }
        }
        console.log(result);
        return result;
    }

    shuffle() {
        if (this.#x1 === Option1.A) {
            if (this.#x2 === Option2.D) {
                if (this.#x3 === Option3.F) {
                    this.#x2 = Option2.E;
                } else if (this.#x3 === Option3.G) {
                    this.#x1 = Option1.B;
                } else if (this.#x3 === Option3.H) {
                    this.#x1 = Option1.B;
                }
            } else if (this.#x2 === Option2.E) {
                if (this.#x3 === Option3.F) {
                    this.#x1 = Option1.B;
                } else if (this.#x3 === Option3.G) {
                    this.#x1 = Option1.C;
                } else if (this.#x3 === Option3.H) {
                    this.#x2 = Option2.D;
                }
            }
        } else if (this.#x1 === Option1.B) {
            if (this.#x2 === Option2.D) {
                if (this.#x3 === Option3.F) {
                    this.#x1 = Option1.A;
                } else if (this.#x3 === Option3.G) {
                    this.#x2 = Option2.E;
                } else if (this.#x3 === Option3.H) {
                    this.#x1 = Option1.C;
                }
            } else if (this.#x2 === Option2.E) {
                if (this.#x3 === Option3.F) {
                    this.#x3 = Option3.H;
                } else if (this.#x3 === Option3.G) {
                    this.#x1 = Option1.A;
                } else if (this.#x3 === Option3.H) {
                    this.#x1 = Option1.C;
                }
            }
        } else if (this.#x1 === Option1.C) {
            if (this.#x2 === Option2.D) {
                if (this.#x3 === Option3.F) {
                    this.#x3 = Option3.G;
                } else if (this.#x3 === Option3.G) {
                    this.#x1 = Option1.A;
                } else if (this.#x3 === Option3.H) {
                    this.#x3 = Option3.F;
                }
            } else if (this.#x2 === Option2.E) {
                if (this.#x3 === Option3.F) {
                    this.#x1 = Option1.B;
                } else if (this.#x3 === Option3.G) {
                    this.#x3 = Option3.F;
                } else if (this.#x3 === Option3.H) {
                    this.#x1 = Option1.A;
                }
            }
        }
    }
};

module.exports = { Option1, Option2, Option3, CombinatorialSmeller };
