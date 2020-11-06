module.exports = async (client, member) => {
    const db = require("quick.db");
    
    let codeExist = db.get(`verification.${member.user.id}`);
    if (codeExist) db.delete(`verification.${member.user.id}`);
    // Remove the existing code when the user left the server.
    // And, serve the new one when the user rejoin the server.
  }