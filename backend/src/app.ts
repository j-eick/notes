import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import createHttpError, { isHttpError } from "http-errors";
import notesRouter from "./routes/notes";
import userRoutes from "./routes/users";
import morgan from "morgan";
// import errColors from "colors";

const app = express();

app.use(morgan("dev"));

/**
 * Allows express to send AND receive json data, to make use of POST endpoints.
 */
app.use(express.json());

app.use("/api/users", userRoutes);
/**
 * • sets up the baseURL(??), which is /api/notes
 * • Calls notesRouter that sets up express with the enpoint(s):
 *    - getNotes
 */
app.use("/api/notes", notesRouter);

/**
 * Fallback Errorhandler for any endpoint that isn't defined
 */
app.use((req, res, next) => {
  next(createHttpError(404, "Endpoint not found."));
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  console.error(error);
  let errorMsg = "";
  let statusCode = 500; // fallback errorCode

  if (isHttpError(error)) {
    statusCode = error.status;
    errorMsg = error.message;
  }
  res.status(statusCode).json({ error: errorMsg });
});

export default app;
