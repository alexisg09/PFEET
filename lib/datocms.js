import tiny from "tiny-json-http";

export async function request({ query, variables, preview }) {
  let endpoint = "https://graphql.datocms.com";

  if (process.env.NEXT_DATOCMS_ENVIRONMENT) {
    endpoint += `/environments/${process.env.NEXT_DATOCMS_ENVIRONMENT}`;
  }

  if (preview) {
    endpoint += `/preview`;
  }

  const { body } = await tiny.post({
    url: endpoint,
    headers: {
      authorization: `Bearer ${process.env.NEXT_DATOCMS_API_TOKEN}`,
    },
    data: {
      query,
      variables,
    },
  });

  if (body.errors) {
    console.error("Ouch! The query has some errors!");
    throw body.errors;
  }

  return body.data;
}




// import { SiteClient } from 'datocms-client';
// import { GraphQLClient } from "graphql-request";

// export function request({ query, variables, includeDrafts, excludeInvalid }) {
//   const headers = {
//     authorization: `Bearer ${process.env.NEXT_DATOCMS_API_TOKEN}`,
//   };
//   if (includeDrafts) {
//     headers['X-Include-Drafts'] = 'true';
//   }
//   if (excludeInvalid) {
//     headers['X-Exclude-Invalid'] = 'true';
//   }
//   const client = new GraphQLClient('https://graphql.datocms.com', { headers });
//   return client.request(query, variables);
// }


// export const client = new SiteClient('e8add1dd525731a3b58c25d39e2e86');
