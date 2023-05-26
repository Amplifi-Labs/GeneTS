# GeneTS
Typescript Swiss Army Knife for Genetic Algorithms

While searching for up to date libraries that fully supports TypeScript/types and based on a modern approach, nothing was found. This library goal is to fill this gap.

For now this is a very basic implementation and improvements will be implmented. Feal free to help us to make it better!

# Code sample

~~~
import {
  Interval,
  normalizedIndividual,
  processIndividualResult,
  buildMathParameters,
  createInitialPopulation,
  processNewGeneration,
  testPopulation,
  shuffle,
  calculatePopulationAverageResult,
  calculateConvergence,
} from "./src/main";

const init = new Date();

let population = createInitialPopulation({size: 200, numberOfChromosomes: 3, numberOfGenes: 16});

const mutations = {crossoverChances: 0.01, mutationChanges: 0.01};

const formula = 'a + b^2 - c^4';
const interval: Interval = [-10, 10];

let normalizedChampion: number[] = [];

let convergence = 100;
let previousPopulationAverageResult: number | undefined;

for (let i = 0; i < 50 && convergence > 0.000000001; i += 1) {
  population = processNewGeneration({population, ...mutations});
  population = testPopulation({population, formula, interval});
  const champion = population[0];

  /* Show results for champion */
  normalizedChampion = normalizedIndividual({individual: champion, interval });
  const championParameters = buildMathParameters({individual: normalizedChampion});
  const result = processIndividualResult({formula, parameters: championParameters});
  const populationAverageResult = calculatePopulationAverageResult({population, formula, interval});
  if (previousPopulationAverageResult) {
    convergence = calculateConvergence({a: populationAverageResult, b: previousPopulationAverageResult})
  }

  console.log('----------------------------------------------------');
  console.log(
    `generation: ${i},\n`+
    `result for champion: ${result},\n`+
    `convergence: ${convergence},\n`+
    `populationAverageResult: ${populationAverageResult}`
  );
  /* ------------------------- */

  population = shuffle(population);

  previousPopulationAverageResult = populationAverageResult;
}

console.log('time to process:', new Date().getTime() - init.getTime(), 'ms');
console.log('normalizedChampion:', normalizedChampion);
~~~
