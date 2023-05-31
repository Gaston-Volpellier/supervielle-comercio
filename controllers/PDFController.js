module.exports = {
  factura(req, res) {
    res.render("pdf/factura", { layouts: "pdf" });
  },
};
