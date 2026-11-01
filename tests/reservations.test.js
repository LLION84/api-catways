const assert = require("assert");
const mongoose = require("mongoose");
const reservationService = require("../services/reservations");

describe("Réservations", () => {
  // ← NOUVEAU : une variable partagée entre les tests
  // Le 1er test y range l'_id de la réservation créée,
  // les suivants s'en servent pour la retrouver
  let idReservation;

  before(async () => {
    await mongoose.connect(process.env.URL_MONGO);
  });

  after(async () => {
    await mongoose.disconnect();
  });

  it("prend une réservation", async () => {
    const reservation = await reservationService.create(999, {
      clientName: "Client Test",
      boatName: "Bateau Test",
      checkIn: "2026-11-01",
      checkOut: "2026-11-15",
    });
    // On garde son _id pour les tests suivants
    idReservation = reservation._id;
    assert.strictEqual(reservation.clientName, "Client Test");
  });

  it("liste les réservations", async () => {
    const reservations = await reservationService.list();
    assert.ok(reservations.length > 0);
  });

  it("affiche les détails d'une réservation", async () => {
    const reservation = await reservationService.findById(idReservation);
    assert.strictEqual(reservation.boatName, "Bateau Test");
  });

  it("supprime une réservation", async () => {
    await reservationService.remove(999, idReservation);
    const reservation = await reservationService.findById(idReservation);
    assert.strictEqual(reservation, null);
  });
});
