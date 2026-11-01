const assert = require("assert");
const mongoose = require("mongoose");
const catwayService = require("../services/catways");

describe("Catway", () => {
  before(async () => {
    await mongoose.connect(process.env.URL_MONGO);
  });

  after(async () => {
    await mongoose.disconnect();
  });
  it("crée un catway", async () => {
    const catway = await catwayService.create({
      catwayNumber: 999,
      type: "short",
      catwayState: "test",
    });
    assert.strictEqual(catway.catwayNumber, 999);
  });
  it("liste les catways", async () => {
    const catways = await catwayService.getAll();
    assert.ok(catways.length > 0);
  });
  it("récupère les détails d'un catway", async () => {
    const catway = await catwayService.getById(999);
    assert.strictEqual(catway.type, "short");
  });
  it("modifie l'état d'un catway", async () => {
    const catway = await catwayService.update(999, { catwayState: "réparé" });
    assert.strictEqual(catway.catwayState, "réparé");
  });
  it("supprime un catway", async () => {
    await catwayService.remove(999);
    const catway = await catwayService.getById(999);
    assert.strictEqual(catway, null);
  });
});
