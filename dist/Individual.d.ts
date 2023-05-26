import { Chromosome, Interval } from "./Chromosome";
type Individual = Chromosome[];
declare const createIndividual: ({ numberOfChromosomes, numberOfGenes, showLogs }: {
    numberOfChromosomes: number;
    numberOfGenes: number;
    showLogs?: boolean;
}) => Individual;
declare const normalizedIndividual: ({ individual, interval, showLogs }: {
    individual: Individual;
    interval: Interval;
    showLogs?: boolean;
}) => number[];
declare const processIndividualResult: ({ formula, parameters, showLogs }: {
    formula: string;
    parameters: {
        [key: string]: number;
    };
    showLogs?: boolean;
}) => any;
export { Individual, createIndividual, normalizedIndividual, processIndividualResult };
