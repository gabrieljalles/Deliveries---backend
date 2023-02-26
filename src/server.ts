import express from 'express';
import { routes } from './routes';
import { Request, Response, NextFunction } from 'express';
import "express-async-errors"

const app = express();

app.use(express.json());

app.use(routes);

//after all routes, error treatment
app.use((err: Error, request: Request, response: Response, next: NextFunction) => {

    if (err instanceof Error) {
        return response.status(400).json({
            message: err.message,
        })
    }

    return response.status(500).json({
        status: "error",
        message: "Internal server error",
    })
});

app.listen(3000, () => console.log('Server is running at port 3000'));