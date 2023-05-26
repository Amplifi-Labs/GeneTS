import {
  Interval,
  normalizedIndividual,
  processIndividualResult,
  buildMathParameters,
  createInitialPopulation,
  processNewGeneration,
  testPopulation,
  shuffle,
} from "./src/main";

const init = new Date();

let population = createInitialPopulation({size: 200, numberOfChromosomes: 3, numberOfGenes: 16});

population = processNewGeneration({population});

const formula = 'a + b^2 - c^4';
const interval: Interval = [-10, 10];

let normalizedChampion: number[] = [];

for (let i = 0; i < 50; i += 1) {
  population = processNewGeneration({population});
  population = testPopulation({population, formula, interval});
  const champion = population[0];

  /* Show results for champion */
  normalizedChampion = normalizedIndividual({individual: champion, interval });
  const championParameters = buildMathParameters({individual: normalizedChampion});
  const result = processIndividualResult({formula, parameters: championParameters});
  console.log('generation: ', i, ', result for champion:', result);
  /* ------------------------- */

  population = shuffle(population);
}

console.log('time to process:', new Date().getTime() - init.getTime(), 'ms');
console.log('normalizedChampion:', normalizedChampion);