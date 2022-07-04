import { Calculation, EFailedValidationsMessage, ETypeIMC, IPerson, PersonBuilder } from './pesonal.model';

describe('PersonalModel', () => {

    let calculation: Calculation;

    beforeEach(() => {
        calculation = new Calculation();
    });

    describe('Attribute checking', () => {

        it('Attribute default', () => {
            const personDefault = new PersonBuilder()
                .build();

            expect(personDefault.name).toEqual('');
            expect(personDefault.lastName).toEqual('');
            expect(personDefault.age).toEqual(0);
            expect(personDefault.weigth).toEqual(0);
            expect(personDefault.heigth).toEqual(0);
        });

        it('Attribute injection', () => {
            const name = 'Fabian';
            const lastName = 'Serrano';
            const age = 29;
            const weigth = 80;
            const heigth = 1.80;

            const personBuilder = new PersonBuilder()
                .name(name)
                .lastName(lastName)
                .age(age)
                .heigth(heigth)
                .weigth(weigth)
                .build();

            const personJson: IPerson = {
                name,
                lastName,
                age,
                weigth,
                heigth
            }

            expect(personBuilder.name).toEqual(name);
            expect(personBuilder.lastName).toEqual(lastName);
            expect(personBuilder.age).toEqual(age);
            expect(personBuilder.heigth).toEqual(heigth);
            expect(personBuilder.weigth).toEqual(weigth);
            expect(personBuilder).toEqual(personJson);
        });
    });

    describe('Calculation checking', () => {

        it('Wrong height', () => {

            const heigth1 = 0;
            const heigth2 = -1;
            const heigth3 = -0.5;

            const personDefault1 = new PersonBuilder()
                .heigth(heigth1)
                .build();

            const personDefault2 = new PersonBuilder()
                .heigth(heigth2)
                .build();

            const personDefault3 = new PersonBuilder()
                .heigth(heigth3)
                .build();

            const result1 = calculation.calcIMC(personDefault1);
            const result2 = calculation.calcIMC(personDefault2);
            const result3 = calculation.calcIMC(personDefault3);

            expect(result1).toEqual(EFailedValidationsMessage.INVALID_VALUE);
            expect(result2).toEqual(EFailedValidationsMessage.INVALID_VALUE);
            expect(result3).toEqual(EFailedValidationsMessage.INVALID_VALUE);
        });

        it('Range for DOWN value cases (0 - 18)', () => {

            const heigth1 = 1;
            const weigth1 = 18;
            //------------- 18

            const heigth2 = 1.5;
            const weigth2 = 1.5;
            //------------- 1

            const heigth3 = 1.8;
            const weigth3 = 35;
            //------------- 11

            const personDefault1 = new PersonBuilder()
                .heigth(heigth1)
                .weigth(weigth1)
                .build();

            const personDefault2 = new PersonBuilder()
                .heigth(heigth2)
                .weigth(weigth2)
                .build();

            const personDefault3 = new PersonBuilder()
                .heigth(heigth3)
                .weigth(weigth3)
                .build();

            const result1 = calculation.calcIMC(personDefault1);
            const result2 = calculation.calcIMC(personDefault2);
            const result3 = calculation.calcIMC(personDefault3);

            expect(result1).toEqual(ETypeIMC.DOWN);
            expect(result2).toEqual(ETypeIMC.DOWN);
            expect(result3).toEqual(ETypeIMC.DOWN);
        });

        it('Range for NORMAL value cases (19 - 24)', () => {

            const heigth1 = 1;
            const weigth1 = 19;
            //------------- 19

            const heigth2 = 1.5;
            const weigth2 = 55;
            //------------- 24

            const heigth3 = 1.8;
            const weigth3 = 65;
            //-------------20

            const personDefault1 = new PersonBuilder()
                .heigth(heigth1)
                .weigth(weigth1)
                .build();

            const personDefault2 = new PersonBuilder()
                .heigth(heigth2)
                .weigth(weigth2)
                .build();

            const personDefault3 = new PersonBuilder()
                .heigth(heigth3)
                .weigth(weigth3)
                .build();

            const result1 = calculation.calcIMC(personDefault1);
            const result2 = calculation.calcIMC(personDefault2);
            const result3 = calculation.calcIMC(personDefault3);

            expect(result1).toEqual(ETypeIMC.NORMAL);
            expect(result2).toEqual(ETypeIMC.NORMAL);
            expect(result3).toEqual(ETypeIMC.NORMAL);
        });

        it('Range for OVERWEIGTH value cases (25 - 26)', () => {

            const heigth1 = 1;
            const weigth1 = 25;
            //------------- 25

            const heigth2 = 1.5;
            const weigth2 = 59;
            //------------- 26

            const heigth3 = 1.8;
            const weigth3 = 83;
            //------------- 26

            const personDefault1 = new PersonBuilder()
                .heigth(heigth1)
                .weigth(weigth1)
                .build();

            const personDefault2 = new PersonBuilder()
                .heigth(heigth2)
                .weigth(weigth2)
                .build();

            const personDefault3 = new PersonBuilder()
                .heigth(heigth3)
                .weigth(weigth3)
                .build();

            const result1 = calculation.calcIMC(personDefault1);
            const result2 = calculation.calcIMC(personDefault2);
            const result3 = calculation.calcIMC(personDefault3);

            expect(result1).toEqual(ETypeIMC.OVERWEIGTH);
            expect(result2).toEqual(ETypeIMC.OVERWEIGTH);
            expect(result3).toEqual(ETypeIMC.OVERWEIGTH);
        });

        it('Range for OVERWEIGTH_LEVEL_1 value cases (27 - 29)', () => {

            const heigth1 = 1;
            const weigth1 = 27;
            //------------- 27

            const heigth2 = 1.5;
            const weigth2 = 66;
            //------------- 29

            const heigth3 = 1.8;
            const weigth3 = 90;
            //------------- 28

            const personDefault1 = new PersonBuilder()
                .heigth(heigth1)
                .weigth(weigth1)
                .build();

            const personDefault2 = new PersonBuilder()
                .heigth(heigth2)
                .weigth(weigth2)
                .build();

            const personDefault3 = new PersonBuilder()
                .heigth(heigth3)
                .weigth(weigth3)
                .build();

            const result1 = calculation.calcIMC(personDefault1);
            const result2 = calculation.calcIMC(personDefault2);
            const result3 = calculation.calcIMC(personDefault3);

            expect(result1).toEqual(ETypeIMC.OVERWEIGTH_LEVEL_1);
            expect(result2).toEqual(ETypeIMC.OVERWEIGTH_LEVEL_1);
            expect(result3).toEqual(ETypeIMC.OVERWEIGTH_LEVEL_1);
        });

        it('Range for OVERWEIGTH_LEVEL_2 value cases (30 - 39)', () => {

            const heigth1 = 1;
            const weigth1 = 30;
            //------------- 30

            const heigth2 = 1.5;
            const weigth2 = 80;
            //------------- 36

            const heigth3 = 1.8;
            const weigth3 = 127;
            //------------- 39

            const personDefault1 = new PersonBuilder()
                .heigth(heigth1)
                .weigth(weigth1)
                .build();

            const personDefault2 = new PersonBuilder()
                .heigth(heigth2)
                .weigth(weigth2)
                .build();

            const personDefault3 = new PersonBuilder()
                .heigth(heigth3)
                .weigth(weigth3)
                .build();

            const result1 = calculation.calcIMC(personDefault1);
            const result2 = calculation.calcIMC(personDefault2);
            const result3 = calculation.calcIMC(personDefault3);

            expect(result1).toEqual(ETypeIMC.OVERWEIGTH_LEVEL_2);
            expect(result2).toEqual(ETypeIMC.OVERWEIGTH_LEVEL_2);
            expect(result3).toEqual(ETypeIMC.OVERWEIGTH_LEVEL_2);
        });

        it('Range for OVERWEIGTH_LEVEL_3 value cases ( +40 )', () => {

            const heigth1 = 1;
            const weigth1 = 40;
            //------------- 40

            const heigth2 = 1.5;
            const weigth2 = 130;
            //------------- 58

            const heigth3 = 1.8;
            const weigth3 = 160;
            //------------- 49

            const personDefault1 = new PersonBuilder()
                .heigth(heigth1)
                .weigth(weigth1)
                .build();

            const personDefault2 = new PersonBuilder()
                .heigth(heigth2)
                .weigth(weigth2)
                .build();

            const personDefault3 = new PersonBuilder()
                .heigth(heigth3)
                .weigth(weigth3)
                .build();

            const result1 = calculation.calcIMC(personDefault1);
            const result2 = calculation.calcIMC(personDefault2);
            const result3 = calculation.calcIMC(personDefault3);

            expect(result1).toEqual(ETypeIMC.OVERWEIGTH_LEVEL_3);
            expect(result2).toEqual(ETypeIMC.OVERWEIGTH_LEVEL_3);
            expect(result3).toEqual(ETypeIMC.OVERWEIGTH_LEVEL_3);
        });
    });
});
