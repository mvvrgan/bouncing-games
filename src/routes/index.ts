/**
 * Bouncing Games
 * Web Path --> /
 * 
 * -> @description Root Path
 * -> @author mvvrgan
 * -> @version 4/15/2024
 */

// Imports
import { ElysiaApp } from "@src/index";

/**
 * @param app ElysiaApp
 * @returns Route 
 */
export default (app: ElysiaApp) => {

    /**
     * GET: Nothing here!
     * 
     */
    return app.get("/", ({ set }) => {     

        return () => {
            set.status = 200;
            return {
                statusCode: set.status,
                message: "API is Online"
            };
        };
    });
};