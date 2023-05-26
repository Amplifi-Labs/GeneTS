import { Interval } from "./Chromosome";
import { Individual } from "./Individual";
type Population = Individual[];
declare const createInitialPopulation: ({ size, numberOfChromosomes, numberOfGenes, }: {
    size: number;
    numberOfChromosomes: number;
    numberOfGenes: number;
}) => Population;
declare const normalizePopulation: ({ population, interval, }: {
    population: Population;
    interval: Interval;
}) => number[][];
declare const processNewGeneration: ({ population, }: {
    population: Population;
}) => Population;
declare const buildMathParameters: ({ individual, }: {
    individual: number[];
}) => {
    [key: string]: number;
};
declare const testPopulation: ({ population, formula, interval, operation, }: {
    population: Population;
    formula: string;
    interval: Interval;
    operation?: 'maximize' | 'minimize';
}) => Individual[];
export { Population, createInitialPopulation, normalizePopulation, processNewGeneration, testPopulation, buildMathParameters, };
