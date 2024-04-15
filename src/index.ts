/**
 * Bouncing Games
 * File Path: index.ts
 * 
 * -> @description A RESTful API ran under Bun Runtime
 * -> @author mvvrgan
 * -> @version 4/15/2024
 * 
 */

// Imports
import { Elysia } from "elysia";
import Roblox from "noblox.js";
import Config from "@root/config.json";
import { autoroutes } from 'elysia-autoroutes';

// Elysia App
const elysia = new Elysia({
    aot: false,
    serve: {
        //cert: Bun.file(Config.SSL.Cert),
        //key: Bun.file(Config.SSL.Key),
        //hostname: Config.SSL.Hostname,
    },
});

// Autoroutes all endpoints in the routes directory
elysia.use(autoroutes({
    routesDir: __dirname+"/routes", // -> optional, defaults to './routes'
    prefix: "/v1", // -> optional, defaults to ''
    generateTags: false, // -> optional, defaults to true
}));

// Server Initialization, Port is defined in config.json
elysia.listen(Config.Server.Port, () => {
    if (elysia.server?.port == 443) {
        console.log(`🦊 Elysia is running at https://${elysia.server?.hostname}:${elysia.server?.port}`);
    } else {
        console.log(`🦊 Elysia is running at http://${elysia.server?.hostname}:${elysia.server?.port}`);
    }
});

// Exports
export type ElysiaApp = typeof elysia;