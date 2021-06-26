export const EVALUATE = 'EVALUATE';
export const RETURN_RESULTS = 'RETURN_RESULTS';

export enum EvaluationErrorTypes {
  evaluation,
  serialize,
  scope,
}

export type EvaluationError = {
  message: string;
  type: EvaluationErrorTypes;
};

export type ValueOrError = { value?: any; error?: EvaluationError };

export type Results = {
  variables: Record<string, ValueOrError>;
  components: Record<string, Record<string, ValueOrError>>;
  event: ValueOrError;
};

export interface Evaluate {
  type: typeof EVALUATE;
  payload: {
    id: string;
  };
}

export interface ReturnResults {
  type: typeof RETURN_RESULTS;
  payload: {
    id: string;
    results: Results;
  };
}

export type CommunicationActionTypes = Evaluate | ReturnResults;
