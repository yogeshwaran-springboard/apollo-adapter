import { makeVar } from "@apollo/client";

export const darkModeVar = makeVar<boolean>(false);
export interface rc {
  comp1: string;
  comp2: string;
}
const initval = {
  comp1: "A",
  comp2: "B",
};
export const reactiveVar1 = makeVar<any>(initval);

export const domain = "Page 1";
export const config = {
  restConfig: {
    typePatcher: {
      Todo: (data: any) => {
        try {
          if (data.user != null) {
            data.user = { __typename: "User", ...data.user };
          }
          return data;
        } catch (e) {
          console.error("eeeeee", e);
        }
      },
    },
  },
  cacheConfig: {
    typePolicies: {
      Query: {
        fields: {
          // darkMode: {
          //   read() {
          //     return darkModeVar();
          //   },
          // },
          reactiveVar1: {
            read() {
              return reactiveVar1();
            },
          },
          getTodo: {
            read(_: any, { args, toReference }: any) {
              return toReference({
                __typename: "Todo",
                id: args.id,
              });
            },
          },
          getUser: {
            read(_: any, { args, toReference }: any) {
              return toReference({
                __typename: "User",
                id: args.id,
              });
            },
          },
        },
      },
    },
  },
  graphqlConfig: {},
};
