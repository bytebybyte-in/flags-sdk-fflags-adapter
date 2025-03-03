import type { Adapter } from "flags";
import type { EvaluationContext } from "@openfeature/server-sdk";
import {
  OFREPApi,
  type EvaluationFlagValue,
  isEvaluationSuccessResponse,
  isEvaluationFailureResponse,
} from "@openfeature/ofrep-core";

export type FFlagsAdapterOptions = {
  apiKey: string;
  orgId: string;
  groupName: string;
};

export function createFFlagsAdapter(options: FFlagsAdapterOptions) {
  const { apiKey, orgId, groupName } = options;

  if (typeof apiKey !== "string") {
    throw new Error("FFlags: Please provide a valid API key");
  }

  if (typeof orgId !== "string") {
    throw new Error("FFlags: Please provide a valid organization ID");
  }

  if (typeof groupName !== "string") {
    throw new Error("FFlags: Please provide a valid group name");
  }

  const baseUrl = `https://f.fflags.com/${orgId}`;
  const ofrepApi = new OFREPApi({
    baseUrl: baseUrl,
    headers: [
      ["x-fflags-group", groupName],
      ["x-fflags-api-key", apiKey],
    ],
  });

  return function adapter<
    ValueType extends EvaluationFlagValue = EvaluationFlagValue,
    EntitiesType extends EvaluationContext = EvaluationContext,
  >(): Adapter<ValueType, EntitiesType> {
    return {
      initialize: async () => {
        return Promise.resolve();
      },
      identify: (): EntitiesType => {
        return {
          targetingKey: undefined,
        } as EntitiesType;
      },
      async decide({ key, entities }): Promise<ValueType> {
        const response = await ofrepApi.postEvaluateFlag(key, {
          context: entities,
        });
        if (!response) {
          throw new Error(`FFlags: Flag ${key} could not be found`);
        }
        const value = response.value;
        if (isEvaluationSuccessResponse(value)) {
          return value.value as ValueType; // Cast the response value to ValueType
        }

        if (isEvaluationFailureResponse(value)) {
          throw new Error(`FFlags: Flag ${key} could not be evaluated`);
        }

        throw new Error(`FFlags: Flag ${key} could not be evaluated`);
      },
    };
  };
}
