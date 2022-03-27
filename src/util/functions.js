const fs = require("fs");
const jsonEditor = require("edit-json-file");

module.exports = {
  create: function create(seed, data, options) {
    if (fs.existsSync(`./Database/${seed}.json`)) return;
    let object = "{}";
    if (data && options) object = `{ "${data}": "${options}" }`;
    fs.writeFile(
      `./Database/${seed}.json`,
      object,
      { encoding: "utf8" },
      (err) => {
        if (err) throw err;
      }
    );
  },
  set: function set(seed, name, value) {
    if (!fs.existsSync(`./Database/${seed}.json`)) this.create(seed);
    let file = jsonEditor(`./Database/${seed}.json`);
    file.set(name, value);
    file.save();
  },
  delete: function Delete(seed, name) {
    let file = jsonEditor(`./Database/${seed}.json`);
    file.unset(name);
    file.save();
  },
  get: function get(seed) {
    if (!fs.existsSync(`../../Database/${seed}`)) this.create(seed);
    delete require.cache[require.resolve(`../../Database/${seed}`)];
    let data = require(`../../Database/${seed}`);
    return data;
  },
};
