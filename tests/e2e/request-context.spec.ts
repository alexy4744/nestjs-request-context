import { HttpStatus, INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";

import { Server } from "http";

import request from "supertest";

import { AppModule } from "../src/app/app.module";

describe("RequestContext", () => {
  let server: Server;
  let app: INestApplication;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    app = module.createNestApplication();
    server = app.getHttpServer();

    await app.init();
  });

  afterEach(() => app.close());

  it("should set the data in request context", async () => {
    const response = await request(server)
      .post("/")
      .query({ data: "test" })
      .expect(HttpStatus.CREATED);

    expect(response.body).toEqual(
      expect.objectContaining({
        data: "test"
      })
    );
  });

  it("should use the overriden request context", async () => {
    const response = await request(server).get("/").expect(HttpStatus.OK);

    expect(response.body).toEqual(
      expect.objectContaining({
        custom: true
      })
    );
  });
});
