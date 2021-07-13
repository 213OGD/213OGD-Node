const speedRequest = {
  requestDidStart(requestContext: any) {
    const start = Date.now();
    let op: any;

    return {
      didResolveOperation(context: any) {
        op = context.operationName;
      },
      willSendResponse(context: any) {
        const stop = Date.now();
        const elapsed = stop - start;
        const size = JSON.stringify(context.response).length * 2;
        console.log(`Operation ${op} completed in ${elapsed} ms and returned ${size} bytes \n\n`);
      },
    };
  },
};

const logs = {
  requestDidStart: (requestContext: any) => {
    if (requestContext.request.http?.headers.has("x-apollo-tracing")) {
      return;
    }
    const query = requestContext.request.query?.replace(/\s+/g, " ").trim();
    const variables = JSON.stringify(requestContext.request.variables);
    console.log(
      new Date().toISOString(),
      `- { query: ${query} | variables: ${variables} | operationName: ${requestContext.request.operationName} } \n\n`
    );
    return;
  },
};

export { speedRequest, logs };
