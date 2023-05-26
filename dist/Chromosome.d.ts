type Chromosome = (0 | 1)[];
type Interval = [number, number];
declare const generateChromosome: ({ numberOfGenes, showLogs }: {
    numberOfGenes: number;
    showLogs?: boolean;
}) => Chromosome;
declare const chromosomeToInt: ({ chromosome, showLogs, }: {
    chromosome: Chromosome;
    showLogs?: boolean;
}) => number;
declare const chromosomeToFloat: ({ chromosome, showLogs }: {
    chromosome: Chromosome;
    showLogs?: boolean;
}) => number;
declare const chromosomeToNormalizedFloat: ({ chromosome, interval, showLogs }: {
    chromosome: Chromosome;
    interval: Interval;
    showLogs?: boolean;
}) => number;
export { Interval, Chromosome, generateChromosome, chromosomeToInt, chromosomeToFloat, chromosomeToNormalizedFloat };
