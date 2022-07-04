export interface IPerson {
    name: string;
    lastName: string
    age: number
    weigth: number
    heigth: number
}

export enum ETypeIMC {
    DOWN = 'down',
    NORMAL = 'normal',
    OVERWEIGTH = 'overweigth',
    OVERWEIGTH_LEVEL_1 = 'overweigth level 1',
    OVERWEIGTH_LEVEL_2 = 'overweigth level 2',
    OVERWEIGTH_LEVEL_3 = 'overweigth level 3'
}

export enum EFailedValidationsMessage {
    INVALID_VALUE = 'Invalid values',
    NOT_FOUND = 'Not found'
}

export class PersonBuilder {

    private readonly _person: IPerson;

    constructor() {
        this._person = {
            name: '',
            lastName: '',
            age: 0,
            weigth: 0,
            heigth: 0
        }
    }

    name(name: string): PersonBuilder {
        this._person.name = name;
        return this;
    }

    lastName(lastName: string): PersonBuilder {
        this._person.lastName = lastName;
        return this;
    }

    age(age: number): PersonBuilder {
        this._person.age = age;
        return this;
    }

    weigth(weigth: number): PersonBuilder {
        this._person.weigth = weigth;
        return this;
    }

    heigth(heigth: number): PersonBuilder {
        this._person.heigth = heigth;
        return this;
    }

    build(): IPerson {
        return this._person;
    }
}

export class Calculation {

    calcIMC(person: IPerson): string {

        if (person.heigth <= 0 || person.weigth <= 0) return EFailedValidationsMessage.INVALID_VALUE;

        const result = Math.round(person.weigth / (Math.pow(person.heigth, 2)));

        switch (true) {
            case result >= 0 && result <= 18:

                return ETypeIMC.DOWN;
            case result >= 19 && result <= 24:

                return ETypeIMC.NORMAL;
            case result >= 25 && result <= 26:

                return ETypeIMC.OVERWEIGTH;
            case result >= 27 && result <= 29:

                return ETypeIMC.OVERWEIGTH_LEVEL_1;
            case result >= 30 && result <= 39:

                return ETypeIMC.OVERWEIGTH_LEVEL_2;
            default:

                return ETypeIMC.OVERWEIGTH_LEVEL_3;
        }
    }
}