const speedStyles = [
  "color: green",
  "background: yellow",
  "font-size: 30px",
  "border: 1px solid red",
  "text-shadow: 2px 2px black",
  "padding: 10px",
].join(",");

const speedRequest = {
  requestDidStart(requestContext: any) {
    const start = Date.now();
    let op: any;
    console.log('request', requestContext.logger);

    return {
      didResolveOperation(context: any) {
        op = context.operationName;
      },
      willSendResponse(context: any) {
        const stop = Date.now();
        const elapsed = stop - start;
        const size = JSON.stringify(context.response).length * 2;
        const msg = `Operation ${op} completed in ${elapsed} ms and returned ${size} bytes`;
        console.log(`%c${msg}`, speedStyles);
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
