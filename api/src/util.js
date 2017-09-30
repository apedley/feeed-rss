import Request from "request";

export function validateAndSendJSON(req, res, body) {
  if (typeof body !== "string") {
    return res.json(body);
  }
  try {
    var json = JSON.parse(body);
    if (json.errorCode) {
      res.status(json.errorCode).send({
        error: {
          id: json.errorId,
          message: json.errorMessage,
          code: json.errorCode
        }
      });
    } else {
      res.json(json);
    }
  } catch (e) {
    res.json({
      message: "could not parse json response",
      error: e
    });
  }
}

export function sendFeedlyRequest(options, res, req) {
  Request(options, (err, response, body) => {
    if (err) {
      return res.send("ERROR: " + err);
    }
    return validateAndSendJSON(req, res, body);
  });
}
