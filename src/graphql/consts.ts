export type Models =
  | 'Trailer'
  | 'Truck'
  | 'UserAccount'
  | 'Load'
  | 'Broker'
  | 'Driver'
  | 'Trip'
  | 'Payroll'
  | 'UserAccount'

export type ModelRepoRef = {
  model: Models
  repo: `${Lowercase<Models>}Repo` | 'userAccountRepo'
}

/**
 * A refrence to the model name and repo name existed in the modules.
 */
export const MODEL_REPO: ModelRepoRef[] = [
  { model: 'Trailer', repo: 'trailerRepo' },
  { model: 'Truck', repo: 'truckRepo' },
  { model: 'UserAccount', repo: 'userAccountRepo' },
  { model: 'Load', repo: 'loadRepo' },
  { model: 'Broker', repo: 'brokerRepo' },
  { model: 'Driver', repo: 'driverRepo' },
  { model: 'Trip', repo: 'tripRepo' },
  { model: 'Payroll', repo: 'payrollRepo' },
]
