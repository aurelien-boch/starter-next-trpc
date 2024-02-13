import { publicProcedure } from "../index";

const controller = publicProcedure.query(async () => "OK");

export default controller;
