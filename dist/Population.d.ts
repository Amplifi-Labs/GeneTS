import { Chromosome, Interval } from "./Chromosome";
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
declare const applyCrossover: ({ chromosome, chances, }: {
    chromosome: Chromosome;
    chances: number;
}) => Chromosome;
declare const applyMutation: ({ chromosome, chances, }: {
    chromosome: Chromosome;
    chances: number;
}) => Chromosome;
declare const processNewGeneration: ({ population, crossoverChances, mutationChanges, }: {
    population: Population;
    crossoverChances: number;
    mutationChanges: number;
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
declare const calculateConvergence: ({ a, b }: {
    a: number;
    b: number;
}) => number;
declare const calculatePopulationAverageResult: ({ population, interval, formula, }: {
    population: Population;
    interval: Interval;
    formula: string;
}) => number;
export { Population, createInitialPopulation, normalizePopulation, processNewGeneration, testPopulation, buildMathParameters, applyCrossover, applyMutation, calculateConvergence, calculatePopulationAverageResult, };
