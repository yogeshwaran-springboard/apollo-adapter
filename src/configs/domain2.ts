export const domain = "Page 2";
export const config = {
  rest: {
    typePatcher: {
      Todo: (data: any) => {
        if (data.user != null) {
          data.user = { __typename: "User", ...data.user };
        }
        return data;
      },
    },
  },
  cache: {
    typePolicies: {
      Query: {
        fields: {
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
  graphql: {},
};
