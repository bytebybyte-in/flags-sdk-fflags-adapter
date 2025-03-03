import type { Adapter } from "flags";
import type { EvaluationContext } from "@openfeature/server-sdk";
import { OFREPApi } from "@openfeature/ofrep-core";

type Flags = {
  [key: string]: boolean | number | string | null;
};

export type FFlagsAdapterOptions = {
  apiKey: string;
  orgId: string;
  groupName: string;
};

export function createFFlagsAdapter<AppFlags extends Flags = Flags>(
  options: FFlagsAdapterOptions,
) {
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
    ValueType,
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
      async decide({ key, entities }) {
        const flag = await ofrepApi.postEvaluateFlag(key, {
          context: entities,
        });

        return {} as ValueType;
      },
    };
  };
}
