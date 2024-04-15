/**
 * Bouncing Games
 * Web Path --> /users/
 * 
 * -> @description Root Path
 * -> @author mvvrgan
 * -> @version 4/15/2024
 */

// Imports
import Roblox from "noblox.js";
import { t } from "elysia";
import { ElysiaApp } from "@src/index";

/**
 * @param app ElysiaApp
 * @returns Route 
 */
export default (app: ElysiaApp) => {
    return app
    
    /**
     * GET: Retrieve wether a user is following another user
     * 
     * @param userId string
     * @param targetId string
     * 
     */
    .get("/:userId/following/:targetId", ({ set, params }) => {
        let cursor: string | undefined = "None"

        return new Promise(async (resolve, reject) => {
            while (cursor) {
                if (cursor == "None") cursor = undefined;

                await Roblox.getFollowings(Number(params.userId), "Desc", 100, cursor).then((response) => {
                    cursor = response.nextPageCursor;
                    
                    if (response.data.length == 0) {
                        cursor = undefined;
                        return reject("No more data to fetch");
                    } else {
                        for (let user of response.data) {
                            if (user.id == Number(params.targetId)) {
                                cursor = undefined;
                                return resolve(true);
                            }
                        };
                    };

                    return;
                }).catch((error) => {
                    return console.log(error);
                });
            };
        }).then(() => {
            return () => {
                set.status = 200;
                return {
                    statusCode: set.status,
                    message: "User is Following Target User",
                    following: true
                };
            };
        }).catch(() => {
            return () => {
                set.status = 200;
                return {
                    statusCode: set.status,
                    error: "User is NOT Following Target User",
                    following: false
                };
            };
        });
        
    }, {
        params: t.Object({
            userId: t.String(),
            targetId: t.String()
        })
    });
};