import express from "express";
import passport from "passport";
import v1 from "./api/client/v1/v1";
import session from "express-session";
import discord from "./api/discord";
import path from "path";
const Strat = require("passport-discord").Strategy;
import checkAuth, { checkAuthGuild } from "../util/checkAuth";
import renderTemplate from "../util/renderTemplate";
import Rice from "../Rice";
import IDiscordUser from "./api/discord/IDiscordUser";
import fetch from "node-fetch";
import IGatewayGuild from "../util/IGatewayGuild";
import { Permissions } from "discord.js";
import GuildSettingController from "../api/controller/GuildSettingController";
const server = express();
const owners = ["201825529333153792"];
passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((obj, done) => {
  done(null, obj);
});
const scopes = ["identify", "email", "guilds", "guilds.join"];
export default () => {
  /**
   * Passport
   */
  passport.use(
    new Strat(
      {
        clientID: process.env.ClientID,
        clientSecret: process.env.ClientSecret,
        scopes: scopes,
        callbackURL: "http://localhost:8081/authenticate",
        prompt: "consent",
      },
      (
        _accessToken: any,
        _refreshToken: any,
        profile: any,
        done: (arg0: null, arg1: any) => any
      ) => {
        process.nextTick(() => {
          return done(null, profile);
        });
      }
    )
  );
  /**
   * Init Server Use / Routers
   */
  server.use(
    session({
      secret: process.env.API_SECRET!,
      resave: false,
      saveUninitialized: false,
    })
  );

  server.set("view engine", "ejs");
  server.set("views", path.join(__dirname, "views"));
  server.use(passport.initialize());
  server.use(passport.session());
  server.use(express.json());
  server.use(
    express.urlencoded({
      extended: true,
    })
  );
  server.use(express.static(path.join(__dirname, "public")));
  server.use("/", discord);
  server.use("/gateway/v1", v1);
  /**
   * Requests
   */
  server.get("/", async (req, res) => {
    // i have to over write because ejs doesn't support async rendering /shrug
    renderTemplate(res, req, "index.ejs", {
      bot: {
        application: await Rice.getInstance().fetchApplication(),
        user: {
          avatarURL: Rice.getInstance().user!.avatarURL(),
          username: Rice.getInstance().user!.username,
        },
        guilds: Rice.getInstance().guilds,
        owners: owners,
      },
    });
    //  res.send(`<code>API - V.${require("../../package.json").version}</code>`);
  });
  server.get("/dashboard", checkAuth, async (req, res) => {
    let cr = <IDiscordUser>req;
    let guilds = await fetch("https://discord.com/api/users/@me/guilds", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + cr.user.accessToken,
        "User-Agent": "DiscordBot " + "githubcom/andyiscool5463/rice-bot 1.0",
      },
    });
    let data = await guilds.json();
    let guildsArray: any[] = [];
    data.map((guild: IGatewayGuild) => {
      if (
        Rice.getInstance()
          .guilds.cache.get(guild.id)
          ?.member(cr.user.id)
          ?.hasPermission("MANAGE_GUILD")
      ) {
        return guildsArray.push({
          id: guild.id,
          icon: guild.icon,
          name: guild.name,
          owner: guild.owner,
          canAdd: 1, // this means yes dashboard
        });
      }
      if (new Permissions(guild.permissions).has("MANAGE_GUILD")) {
        return guildsArray.push({
          id: guild.id,
          icon: guild.icon,
          name: guild.name,
          owner: guild.owner,
          canAdd: 2, // no dashboard u can add tho
        });
      }
      return;
    });
    renderTemplate(res, req, "dashboard.ejs", {
      guilds: guildsArray,
      bot: {
        application: await Rice.getInstance().fetchApplication(),
        user: {
          avatarURL: Rice.getInstance().user!.avatarURL(),
          username: Rice.getInstance().user!.username,
        },
        guilds: Rice.getInstance().guilds,
        owners: owners,
      },
    });
  });
  server.get("/dashboard/:guildID", checkAuthGuild, async (req, res) => {
    renderTemplate(res, req, "guilds/dashboard.ejs", {
      guild: Rice.getInstance().guilds.cache.get(req.params.guildID),
      auditLogs: (
        await Rice.getInstance()
          .guilds.cache.get(req.params.guildID)!
          .fetchAuditLogs()
      ).entries,
      config: await GuildSettingController.getGuild(
        Rice.getInstance().guilds.cache.get(req.params.guildID)!
      ),
      bot: {
        application: await Rice.getInstance().fetchApplication(),
        user: {
          avatarURL: Rice.getInstance().user!.avatarURL(),
          username: Rice.getInstance().user!.username,
        },
        guilds: Rice.getInstance().guilds,
        owners: owners,
      },
    });
  });
  server.get("/info", checkAuth, (req, res) => {
    res.json(req.user);
  });

  server.listen(process.env.API_PORT, () => {
    Rice.getInstance().logger.log(
      `🚀 API | Listening on port: ${process.env.API_PORT}`
    );
  });
};
